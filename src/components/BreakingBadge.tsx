export default function BreakingBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.15em] text-white"
      style={{ fontFamily: "var(--font-bebas)" }}>
      <span style={{ color: "var(--breaking-green)" }}>&#9679;</span>
      BREAKING
    </span>
  );
}
