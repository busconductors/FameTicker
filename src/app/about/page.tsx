export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-10 sm:px-6 lg:px-8">
      <section className="bg-cream rounded-md p-6 sm:p-8">
        <h1
          className="text-3xl sm:text-4xl font-bold text-text-dark"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          About Spill It Now
        </h1>
        <p
          className="mt-3 max-w-2xl text-text-dark/80"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          Spill It Now is your go-to destination for celebrity news, exclusive gossip, and
          entertainment updates across music, movies, fashion, relationships, and reality TV.
          We deliver bold headlines, fast updates, and the hottest tea&mdash;always first,
          always exclusive.
        </p>
      </section>
    </div>
  );
}
