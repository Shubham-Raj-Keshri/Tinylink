import { useState } from 'react';

function truncate(s, n = 60) {
  if (!s) return '';
  return s.length > n ? s.slice(0, n - 1) + '…' : s;
}

export default function LinksTable({ links, loading, onDeleted }) {
  const [filter, setFilter] = useState('');

  // Fix: ensure links is always an array
  const safeLinks = Array.isArray(links) ? links : [];

  const filtered = safeLinks.filter((l) =>
    (l.code + ' ' + l.target_url).toLowerCase().includes(filter.toLowerCase())
  );

  const deleteLink = async (code) => {
    if (!confirm('Delete this link?')) return;
    const r = await fetch(`/api/links/${code}`, { method: 'DELETE' });
    if (r.ok) onDeleted(code);
    else alert('Delete failed');
  };

  const copy = async (code) => {
    const base =
      process.env.NEXT_PUBLIC_BASE_URL ||
      (typeof window !== 'undefined' && window.location.origin);
    try {
      await navigator.clipboard.writeText(`${base}/${code}`);
      alert('Copied!');
    } catch (e) {
      alert('Copy failed');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (safeLinks.length === 0) return <div>No links yet. Create one above.</div>;

  return (
    <div className="space-y-3">
      <div>
        <input
          placeholder="Search by code or URL"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border px-3 py-2 rounded w-full"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="text-left">
              <th>Code</th>
              <th>Target</th>
              <th>Clicks</th>
              <th>Last clicked</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((l) => (
              <tr key={l.code} className="border-t">
                <td className="py-2">{l.code}</td>
                <td className="py-2 max-w-xl" title={l.target_url}>
                  {truncate(l.target_url)}
                </td>
                <td className="py-2">{l.total_clicks}</td>
                <td className="py-2">{l.last_clicked || '—'}</td>
                <td className="py-2 space-x-2">
                  <button
                    onClick={() => copy(l.code)}
                    className="px-2 py-1 border rounded"
                  >
                    Copy
                  </button>
                  <a
                    href={`/${l.code}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-2 py-1 border rounded"
                  >
                    Open
                  </a>
                  <a
                    href={`/code/${l.code}`}
                    className="px-2 py-1 border rounded"
                  >
                    Stats
                  </a>
                  <button
                    onClick={() => deleteLink(l.code)}
                    className="px-2 py-1 border rounded text-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td colSpan="5" className="py-4 text-center text-gray-500">
                  No matching records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
