export default function ArticleLoading() {
  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl animate-pulse">
        <div className="h-64 w-full rounded-2xl bg-muted sm:h-96" />
        <div className="mt-6 flex gap-2">
          <div className="h-6 w-20 rounded-full bg-muted" />
          <div className="h-6 w-16 rounded-full bg-muted" />
        </div>
        <div className="mt-4 h-10 w-3/4 rounded bg-muted" />
        <div className="mt-2 h-6 w-1/2 rounded bg-muted" />
        <div className="mt-6 space-y-3">
          <div className="h-4 w-full rounded bg-muted" />
          <div className="h-4 w-5/6 rounded bg-muted" />
          <div className="h-4 w-4/6 rounded bg-muted" />
        </div>
      </div>
    </div>
  );
}
