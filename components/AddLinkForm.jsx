import { useState } from 'react';

export default function AddLinkForm({ onCreated }) {
  const [targetUrl, setTargetUrl] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    if (!/^https?:\/\//.test(targetUrl)) {
      setError('Please include http:// or https://');
      return;
    }
    if (code && !/^[A-Za-z0-9]{6,8}$/.test(code)) {
      setError('Code must be 6-8 alphanumeric chars');
      return;
    }
    setLoading(true);
    try {
      const r = await fetch('/api/links', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ target_url: targetUrl, code: code || undefined }),
      });
      if (r.status === 201) {
        const data = await r.json();
        onCreated(data);
        setTargetUrl('');
        setCode('');
      } else if (r.status === 409) {
        setError('Code already exists');
      } else {
        const j = await r.json();
        setError(j?.error || 'Something went wrong');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-3">
      <div>
        <label className="block text-sm font-medium">Target URL</label>
        <input value={targetUrl} onChange={e=>setTargetUrl(e.target.value)} placeholder="https://example.com" required className="w-full border px-3 py-2 rounded" />
      </div>
      <div>
        <label className="block text-sm font-medium">Custom code (optional)</label>
        <input value={code} onChange={e=>setCode(e.target.value)} placeholder="6-8 letters/numbers" className="w-1/2 border px-3 py-2 rounded" />
      </div>
      {error && <div className="text-red-600 text-sm">{error}</div>}
      <button disabled={loading} className="px-4 py-2 bg-slate-700 text-white rounded">{loading ? 'Creating...' : 'Create'}</button>
    </form>
  );
}
