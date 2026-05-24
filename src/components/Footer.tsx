import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-16 border-t border-border bg-card/40">
      <div className="container mx-auto grid grid-cols-1 gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4 sm:px-6 lg:px-8">
        <div className="space-y-3">
          <h3 className="text-xl font-black tracking-tight" style={{ fontFamily: "var(--font-bebas)" }}>
            THE TEA
          </h3>
          <p className="text-sm text-foreground/80">
            Your premier destination for celebrity news, exclusive gossip, and entertainment updates. Always first. Always exclusive.
          </p>
        </div>
        <div>
          <h4 className="mb-3 font-semibold">Categories</h4>
          <ul className="space-y-2 text-sm">
            {[
              ["/category/Music", "Music"],
              ["/category/Movies", "Movies"],
              ["/category/Relationships", "Relationships"],
              ["/category/Fashion", "Fashion"],
              ["/category/Reality%20TV", "Reality TV"],
            ].map(([href, label]) => (
              <li key={href}>
                <Link className="hover:underline" href={href as string}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="mb-3 font-semibold">Navigate</h4>
          <ul className="space-y-2 text-sm">
            {[
              ["/", "Home"],
              ["/about", "About"],
              ["/contact", "Contact"],
              ["/privacy", "Privacy"],
              ["/terms", "Terms"],
            ].map(([href, label]) => (
              <li key={href}>
                <Link className="hover:underline" href={href as string}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="mb-3 font-semibold">Follow</h4>
          <div className="flex gap-3 text-sm">
            <Link href="#" aria-label="Instagram" className="rounded-md bg-secondary px-3 py-1 font-semibold text-secondary-foreground hover:opacity-90">
              Instagram
            </Link>
            <Link href="#" aria-label="Twitter" className="rounded-md bg-secondary px-3 py-1 font-semibold text-secondary-foreground hover:opacity-90">
              X
            </Link>
            <Link href="#" aria-label="TikTok" className="rounded-md bg-secondary px-3 py-1 font-semibold text-secondary-foreground hover:opacity-90">
              TikTok
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-border py-6 text-center text-xs text-foreground/70">
        © {year} The Tea. All rights reserved.
      </div>
    </footer>
  );
}
