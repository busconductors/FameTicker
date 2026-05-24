import { posts } from "@/data";

export default function BreakingTicker() {
  const breakingPosts = posts
    .filter((p) => p.isBreaking || p.trending)
    .slice(0, 3);

  const headline = breakingPosts.map((p) => p.title).join(" • ");

  if (!headline) return null;

  return (
    <div className="flex h-9 md:h-10 items-center bg-accent overflow-hidden">
      <div className="flex items-center gap-2 pl-4 pr-3 shrink-0">
        <span
          className="text-xs font-bold uppercase tracking-[0.15em] text-white whitespace-nowrap flex items-center gap-1.5"
          style={{ fontFamily: "var(--font-bebas)" }}
        >
          <span style={{ color: "var(--breaking-green)" }}>&#9679;</span>
          BREAKING
        </span>
      </div>

      <div className="flex-1 overflow-hidden">
        <div className="ticker-track text-[13px] text-white whitespace-nowrap">
          {headline} &bull; {headline}
        </div>
      </div>
    </div>
  );
}
