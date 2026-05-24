export default function TagLoading() {
  return (
    <div className="container mx-auto px-4 py-10 sm:px-6 lg:px-8 animate-pulse">
      <div className="mb-4 h-8 w-32 rounded bg-muted" />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="overflow-hidden rounded-xl border border-border">
            <div className="h-48 w-full bg-muted" />
            <div className="space-y-2 p-4">
              <div className="h-5 w-3/4 rounded bg-muted" />
              <div className="h-4 w-full rounded bg-muted" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
