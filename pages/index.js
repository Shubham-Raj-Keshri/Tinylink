import Link from "next/link";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>TinyLinks – Modern URL Shortener</title>
        <meta
          name="description"
          content="A full-stack URL shortener built with Next.js, Prisma and PostgreSQL."
        />
      </Head>

      <div
        style={{
          textAlign: "center",
          marginTop: "100px",
          padding: "20px",
        }}
      >
        <h1>TinyLinks URL Shortener</h1>

        <p style={{ marginTop: "10px" }}>
          Modern URL shortener built with Next.js.
        </p>

        <Link href="/dashboard">
          <button
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              backgroundColor: "#ef4444",
              color: "white",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Go to Dashboard
          </button>
        </Link>

        <p
          style={{
            marginTop: "40px",
            fontSize: "14px",
            color: "gray",
          }}
        >
          Built with Next.js, Prisma & deployed on Vercel.
        </p>
      </div>
    </>
  );
}
