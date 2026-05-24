export default function CategoryPill({
  category,
  variant = "dark",
}: {
  category: string;
  variant?: "dark" | "light";
}) {
  const isDark = variant === "dark";

  return (
    <span
      className={`inline-block rounded-sm px-2 py-0.5 text-[10px] md:text-[11px] font-semibold tracking-widest uppercase ${
        isDark
          ? "border border-white/30 text-white bg-transparent"
          : "bg-[var(--accent-rose)] text-[var(--bg-cream)] border-transparent"
      }`}
      style={{ fontFamily: "var(--font-oswald)" }}
    >
      {category}
    </span>
  );
}
