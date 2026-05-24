import Link from "next/link";

const categories = [
  { href: "/category/Music", label: "Music" },
  { href: "/category/Movies", label: "Movies" },
  { href: "/category/Relationships", label: "Relationships" },
  { href: "/category/Fashion", label: "Fashion" },
  { href: "/category/Reality%20TV", label: "Reality TV" },
];

const navigateLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-border bg-card">
      <div className="container mx-auto grid grid-cols-1 gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-3 sm:px-6 lg:px-8">
        <div className="space-y-3">
          <span
            className="text-lg font-bold uppercase tracking-[0.3em]"
            style={{ fontFamily: "var(--font-cormorant-garamond)", color: "var(--accent-gold)" }}
          >
            FAME TICKER
          </span>
          <p className="text-sm text-foreground/70">
            Real-time celebrity intel. Breaking stories, red carpet coverage, and entertainment drama — delivered before it trends. Always ticking.
          </p>
        </div>
        <div>
          <h4
            className="tracking-widest uppercase text-sm font-bold mb-3"
            style={{ color: "var(--accent-gold)" }}
          >
            Categories
          </h4>
          <ul className="space-y-3 text-sm">
            {categories.map(({ href, label }) => (
              <li key={href}>
                <Link className="text-foreground/70 hover:text-foreground" href={href}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4
            className="tracking-widest uppercase text-sm font-bold mb-3"
            style={{ color: "var(--accent-gold)" }}
          >
            Navigate
          </h4>
          <ul className="space-y-3 text-sm">
            {navigateLinks.map(({ href, label }) => (
              <li key={href}>
                <Link className="text-foreground/70 hover:text-foreground" href={href}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-6 text-center text-xs text-foreground/50">
        &copy; 2026 Fame Ticker. All rights reserved.
      </div>
    </footer>
  );
}
