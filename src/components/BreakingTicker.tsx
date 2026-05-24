import { getActiveTickerMessages } from "@/db";

export default async function BreakingTicker() {
  const messages = await getActiveTickerMessages();

  if (messages.length === 0) return null;

  const tickerText = messages.map((m) => m.message).join("  •  ");

  return (
    <div className="ticker-bar">
      <span
        className="ticker-label"
        style={{ fontFamily: "var(--font-oswald)" }}
      >
        BREAKING NEWS
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
