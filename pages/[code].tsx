// pages/[code].tsx
import { GetServerSideProps } from "next";
import { prisma } from "../src/lib/prisma"; // adjust path if your prisma file is elsewhere

export const getServerSideProps: GetServerSideProps = async (context) => {
  const code = context.params?.code as string;
  if (!code) return { notFound: true };

  const link = await prisma.link.findUnique({ where: { code } });

  if (!link) {
    return { notFound: true };
  }

  // increment clicks
  await prisma.link.update({
    where: { code },
    data: { clicks: { increment: 1 } },
  });

  return {
    redirect: {
      destination: link.target_url,
      permanent: false,
    },
  };
};

export default function RedirectPage() {
  return null; // redirect happens on the server
}
