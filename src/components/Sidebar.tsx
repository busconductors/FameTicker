"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { posts } from "@/data";

export default function Sidebar() {
  const popular = posts.filter((p) => p.popular).slice(0, 4);
  const tags = [
    "Beyonce",
    "Taylor Swift",
    "Zendaya",
    "Drake",
    "Met Gala",
    "Red Carpet",
    "Relationships",
    "Reality TV",
  ];

  const [email, setEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleNewsletterSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (newsletterStatus === "submitting") return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setNewsletterStatus("error");
      return;
    }

    setNewsletterStatus("submitting");
    setTimeout(() => {
      setNewsletterStatus("success");
      setEmail("");
    }, 800);
  };

  return (
    <aside className="grid gap-8">
      <section>
        <h3 className="mb-3 text-lg font-black" style={{ fontFamily: "var(--font-bebas)" }}>
          Most Read
        </h3>
        <ul className="space-y-3">
          {popular.map((p) => (
            <li key={p.slug} className="rounded-md border border-border p-3 hover:bg-muted">
              <Link href={`/${p.slug}`} className="font-semibold hover:underline">
                {p.title}
              </Link>
              <div className="text-xs text-foreground/60">{p.category}</div>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-xl border border-border bg-card p-4">
        <h3 className="mb-2 text-lg font-black" style={{ fontFamily: "var(--font-bebas)" }}>
          The Tea
        </h3>
        <p className="mb-3 text-sm text-foreground/80">
          Get the hottest tea delivered to your inbox daily.
        </p>
        {newsletterStatus === "success" ? (
          <p className="text-sm font-semibold text-primary">Subscribed!</p>
        ) : (
          <form onSubmit={handleNewsletterSubmit} className="flex items-center gap-2" noValidate>
            <input
              type="email"
              required
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
            <button
              type="submit"
              disabled={newsletterStatus === "submitting"}
              className="btn-primary rounded-md px-3 py-2 text-sm"
            >
              {newsletterStatus === "submitting" ? "..." : "Subscribe"}
            </button>
          </form>
        )}
        {newsletterStatus === "error" && (
          <p className="mt-2 text-sm text-destructive">Please enter a valid email address.</p>
        )}
      </section>

      <section>
        <h3 className="mb-3 text-lg font-black" style={{ fontFamily: "var(--font-bebas)" }}>
          Trending Topics
        </h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((t) => (
            <Link key={t} href={`/tag/${encodeURIComponent(t)}`} className="badge hover:bg-muted">
              #{t}
            </Link>
          ))}
        </div>
      </section>
    </aside>
  );
}
