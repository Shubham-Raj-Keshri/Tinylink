import Layout from '../../components/Layout';
import { useEffect, useState } from 'react';

export async function getServerSideProps({ params }) {
  const { code } = params;
  return { props: { code } };
}

export default function CodeStats({ code }) {
  const [data, setData] = useState(null);
  useEffect(()=>{
    fetch(`/api/links/${code}`).then(r=>r.json()).then(setData).catch(()=>setData(null));
  }, [code]);

  return (
    <Layout>
      <h1 className="text-2xl font-bold">Stats for {code}</h1>
      {!data && <p>Loading...</p>}
      {data && (
        <div className="mt-4 space-y-2">
          <div><strong>Target URL:</strong> {data.target_url}</div>
          <div><strong>Total clicks:</strong> {data.total_clicks}</div>
          <div><strong>Last clicked:</strong> {data.last_clicked || '—'}</div>
          <div><strong>Created:</strong> {data.created_at}</div>
        </div>
      )}
    </Layout>
  );
}
