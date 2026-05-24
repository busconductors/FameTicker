"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "../lib/utils";

const nav = [
  { href: "/", label: "Home" },
  { href: "/category/News", label: "News" },
  { href: "/category/Gossip", label: "Gossip" },
  { href: "/category/Music", label: "Music" },
  { href: "/category/Movies", label: "Movies" },
  { href: "/category/Fashion", label: "Fashion" },
  { href: "/category/Reality%20TV", label: "Reality TV" },
  { href: "/submit-tip", label: "Submit Tip" },
  { href: "/search", label: "Search" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-border/60 backdrop-blur supports-[backdrop-filter]:bg-background/80",
        scrolled ? "shadow-elevated" : ""
      )}
    >
      <div className="container mx-auto flex items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <button
            className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-md border border-border hover:bg-muted"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
          <Link href="/" className="flex flex-col leading-none">
            <span
              className="text-xl font-bold uppercase tracking-[0.3em]"
              style={{ fontFamily: "var(--font-playfair)", color: "var(--accent-gold)" }}
            >
              FAME TICKER
            </span>
            <span
              className="text-[10px] uppercase tracking-[0.4em]"
              style={{ color: "var(--accent-gold)" }}
            >
              CELEBRITY NEWS
            </span>
          </Link>
        </div>

        <nav className="hidden items-center gap-5 md:flex">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="text-xs font-semibold uppercase tracking-wider text-foreground/80 hover:text-foreground"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="md:hidden w-9" />
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur">
          <nav className="container mx-auto grid gap-2 px-4 py-3 sm:px-6 lg:px-8">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="rounded-md px-2 py-2 text-sm font-semibold hover:bg-muted"
                onClick={() => setOpen(false)}
              >
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
