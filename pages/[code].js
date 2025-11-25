import pool from '../lib/db';

export async function getServerSideProps({ params, res }) {
  const { code } = params;

  if (!/^[A-Za-z0-9]{6,8}$/.test(code)) {
    res.statusCode = 404;
    return { notFound: true };
  }

  try {
    const { rows } = await pool.query(
      `UPDATE links SET total_clicks = total_clicks + 1, last_clicked = now() WHERE code = $1 RETURNING target_url`,
      [code]
    );
    if (rows.length === 0) {
      res.statusCode = 404;
      return { notFound: true };
    }
    res.setHeader('Location', rows[0].target_url);
    res.statusCode = 302;
    res.end();
    return { props: {} };
  } catch (err) {
    console.error(err);
    res.statusCode = 500;
    return { props: {} };
  }
}

export default function RedirectPage() { return null; }
