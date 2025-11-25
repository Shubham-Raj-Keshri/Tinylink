import { useState } from 'react'

export default function Dashboard(){
  const [rows, setRows] = useState([{code:'demo', target_url:'https://example.com', clicks:0, last_clicked:'—'}])

  const handleCreate = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const target_url = fd.get('target_url');
    const code = fd.get('code') || Math.random().toString(36).slice(2,8);
    if(!target_url) return;
    const item = { code, target_url, clicks:0, last_clicked:'—' }
    setRows([item, ...rows]);
    e.target.reset();
  }

  const handleDelete = (code) => {
    setRows(rows.filter(r=>r.code!==code));
  }

  return (
    <div className="space-y-6">
      <h2 className="page-title">TinyLink Dashboard</h2>

      <form onSubmit={handleCreate} className="neon-card">
        <label className="label">Target URL</label>
        <input name="target_url" className="input-neon" placeholder="https://example.com" />

        <label className="label">Custom code <span style={{color:'rgba(184,143,143,0.9)', fontSize:'.9rem'}}>(optional)</span></label>
        <input name="code" className="input-neon" placeholder="6-8 letters/numbers" />

        <div style={{display:'flex', alignItems:'center', gap:12, marginTop:12}}>
          <button className="btn-neon" type="submit">Create</button>
          <div style={{color:'var(--muted)'}}>Create a short link with optional custom code</div>
        </div>
      </form>

      <div style={{marginTop:8}}>
        <input className="input-neon" placeholder="Search by code or URL" style={{maxWidth:420}} />
      </div>

      <div style={{marginTop:6}}>
        <div className="neon-card" style={{padding:'12px'}}>
          <table className="table-neon">
            <thead>
              <tr>
                <th>Code</th><th>Target</th><th>Clicks</th><th>Last clicked</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i)=>(
                <tr key={i}>
                  <td><code style={{color:'#ffbdbd'}}>{r.code}</code></td>
                  <td><a href={r.target_url} target="_blank" rel="noreferrer">{r.target_url}</a></td>
                  <td>{r.clicks}</td>
                  <td>{r.last_clicked}</td>
                  <td style={{display:'flex', gap:8}}>
                    <button className="btn-outline" onClick={()=>navigator.clipboard?.writeText(window.location.origin + '/' + r.code)}>Copy</button>
                    <a className="btn-outline" href={r.target_url} target="_blank" rel="noreferrer">Open</a>
                    <button className="btn-outline" onClick={()=>alert('Stats not implemented')}>Stats</button>
                    <button className="btn-outline" onClick={()=>handleDelete(r.code)} style={{borderColor:'rgba(255,7,58,0.2'}}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
