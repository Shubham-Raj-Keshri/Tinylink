export default function Layout({children}) {
  return (
    <div className="page-shell" data-theme="neon">
      <div className="neon-central">
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:18}}>
          <div className="brand">TinyLink</div>
          <div><a className="top-link" href="/dashboard">Dashboard</a></div>
        </div>
        <div>{children}</div>
        <div className="small-muted" style={{marginTop:18}}>Built for the take-home — TinyLink</div>
      </div>
    </div>
  );
}
