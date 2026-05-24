import { posts } from "@/data";

export default function BreakingTicker() {
  const breakingPosts = posts
    .filter((p) => p.isBreaking || p.trending)
    .slice(0, 4);

  const tickerText = breakingPosts.map((p) => p.title).join("  •  ");

  if (!tickerText) return null;

  return (
    <div className="ticker-bar">
      <span
        className="ticker-label"
        style={{ fontFamily: "var(--font-oswald)" }}
      >
        BREAKING
      </span>
      <div className="ticker-track">
        <span
          className="ticker-content"
          style={{ fontFamily: "var(--font-cormorant-garamond)" }}
        >
          {tickerText}  •  {tickerText}
        </span>
      </div>
    </div>
  );
}
