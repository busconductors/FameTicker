export default function CommentsPlaceholder() {
  return (
    <section className="mt-12 rounded-xl border border-border bg-card p-6 text-sm text-foreground/80">
      <h3 className="mb-2 text-lg font-bold text-text-dark" style={{ fontFamily: "var(--font-cormorant-garamond)" }}>
        Comments
      </h3>
      <p>
        Comments are powered by your preferred provider (e.g., Disqus). This is a placeholder.
      </p>
    </section>
  );
}
