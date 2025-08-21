export default function Loading() {
  return (
    <div className="space-y-3">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="card p-5 animate-pulse">
          <div className="h-4 w-1/3 bg-slate-200 rounded mb-2" />
          <div className="h-3 w-1/5 bg-slate-200 rounded" />
        </div>
      ))}
    </div>
  );
}
