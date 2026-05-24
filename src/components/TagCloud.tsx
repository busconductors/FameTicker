import Link from "next/link";

const tags = [
  "Beyonce",
  "Taylor Swift",
  "Zendaya",
  "Drake",
  "Met Gala",
  "Red Carpet",
  "Relationships",
  "Reality TV",
];

export default function TagCloud() {
  return (
    <section>
      <h3
        className="mb-3 text-lg font-black uppercase tracking-wider text-foreground"
        style={{ fontFamily: "var(--font-bebas)" }}
      >
        Trending Topics
      </h3>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Link
            key={tag}
            href={`/tag/${encodeURIComponent(tag)}`}
            className="bg-[#2A2A2A] text-text-secondary text-xs font-medium px-3 py-1.5 rounded-full hover:bg-gold/20 hover:text-gold transition"
          >
            #{tag}
          </Link>
        ))}
      </div>
    </section>
  );
}
