export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-10 sm:px-6 lg:px-8">
      <section className="bg-cream rounded-md p-6 sm:p-8">
        <h1
          className="text-3xl sm:text-4xl font-bold text-text-dark"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          About Fame Ticker
        </h1>

        <p
          className="mt-3 max-w-2xl text-text-dark/80"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          Fame Ticker is your real-time pulse on celebrity culture — tracking the stories,
          scandals, and style moments that define entertainment.
        </p>

        <p
          className="mt-3 max-w-2xl text-text-dark/80"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          We deliver breaking news before it trends and sharp analysis after the dust settles.
          Founded in 2026, we believe celebrity journalism should be fast, verified, and
          unapologetically entertaining.
        </p>

        <h2
          className="mt-8 text-xl font-bold text-text-dark"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          What We Cover
        </h2>

        <ul className="mt-3 space-y-2 text-text-dark/80" style={{ fontFamily: "var(--font-dm-sans)" }}>
          <li><strong>Music</strong> — Industry drama, surprise drops, tour chaos, contract battles</li>
          <li><strong>Fashion</strong> — Red carpet verdicts, trend forecasting, designer deep-dives</li>
          <li><strong>Movies & TV</strong> — Casting bombshells, box office drama, streaming wars</li>
          <li><strong>Relationships</strong> — Who&rsquo;s together, who&rsquo;s done, who&rsquo;s complicated</li>
          <li><strong>Reality TV</strong> — The villains, the heroes, the producers pulling the strings</li>
        </ul>

        <h2
          className="mt-8 text-xl font-bold text-text-dark"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Our Standards
        </h2>

        <p
          className="mt-3 max-w-2xl text-text-dark/80"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          Every story is verified through multiple sources. We correct errors publicly
          and promptly. We don&rsquo;t pay for stories. We respect privacy — but we also believe
          public figures invite public scrutiny.
        </p>

        <h2
          className="mt-8 text-xl font-bold text-text-dark"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Contact
        </h2>

        <div className="mt-3 space-y-1 text-text-dark/80" style={{ fontFamily: "var(--font-dm-sans)" }}>
          <p>Tips: <span className="text-gold">tips@fameticker.news</span></p>
          <p>Press: <span className="text-gold">press@fameticker.news</span></p>
          <p>General: <span className="text-gold">hello@fameticker.news</span></p>
        </div>
      </section>
    </div>
  );
}
