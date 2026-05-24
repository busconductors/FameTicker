import { getActiveTickerMessages, getBreakingPosts } from "@/db";

export default async function BreakingTicker() {
  const messages = await getActiveTickerMessages();

  let tickerText: string;

  if (messages.length > 0) {
    tickerText = messages.map((m) => m.message).join("  •  ");
  } else {
    const breakingPosts = await getBreakingPosts(4);
    tickerText = breakingPosts.map((p) => p.title).join("  •  ");
  }

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
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          {tickerText}  •  {tickerText}
        </span>
      </div>
    </div>
  );
}
