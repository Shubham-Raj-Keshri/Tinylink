export function NeonForm({children, onSubmit}) {
  return (
    <form onSubmit={onSubmit} className="neon-card space-y-4">
      {children}
    </form>
  );
}
