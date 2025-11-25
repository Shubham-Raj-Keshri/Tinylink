export function NeonTable({columns, rows}) {
  return (
    <div className="neon-card">
      <table className="table-neon">
        <thead>
          <tr>{columns.map((c, i)=>(<th key={i}>{c}</th>))}</tr>
        </thead>
        <tbody>
          {rows.map((r, i)=>(<tr key={i}>{columns.map((c, j)=>(<td key={j}>{r[c]}</td>))}</tr>))}
        </tbody>
      </table>
    </div>
  );
}
