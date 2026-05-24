export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-10 sm:px-6 lg:px-8">
      <section className="bg-cream rounded-md p-6 sm:p-8">
        <h1
          className="text-3xl sm:text-4xl font-bold text-text-dark"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Privacy Policy
        </h1>
        <p
          className="mt-2 text-text-muted-dark max-w-2xl"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          This is a placeholder privacy policy for demo purposes. Replace with your own legal
          copy.
        </p>
      </section>
    </div>
  );
}
