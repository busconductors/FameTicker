"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon, Search } from "lucide-react";
import { cn } from "../lib/utils";
import { LS_THEME } from "../lib/constants";

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
  const [dark, setDark] = useState(() => {
    if (typeof document !== "undefined") {
      return document.documentElement.classList.contains("dark");
    }
    return false;
  });
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [dark]);

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
          <Link href="/" className="flex items-end gap-2">
            <span className="font-black tracking-tight text-3xl leading-none" style={{ fontFamily: "var(--font-bebas)" }}>
              SPILL IT NOW
            </span>
            <span className="rounded-sm bg-primary px-1.5 py-0.5 text-[10px] font-bold text-primary-foreground">
              THE TEA
            </span>
          </Link>
        </div>

        <nav className="hidden items-center gap-5 md:flex">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="text-sm font-semibold tracking-wide text-foreground/80 hover:text-foreground"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <form action="/search" className="hidden items-center gap-2 sm:flex">
            <div className="relative">
              <Search className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-foreground/50" size={16} />
              <input
                type="text"
                name="q"
                placeholder="Search gossip..."
                className="w-48 rounded-md border border-border bg-card py-1.5 pl-8 pr-2 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </form>
          <button
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border hover:bg-muted"
            aria-label="Toggle dark mode"
            onClick={() =>
              setDark((d) => {
                const next = !d;
                try { localStorage.setItem(LS_THEME, next ? "dark" : "light"); } catch {}
                return next;
              })
            }
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {open && (
        <div className="md:hidden border-t border-border bg-background/95">
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
