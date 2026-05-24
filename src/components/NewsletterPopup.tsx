"use client";

import { useEffect, useState, type FormEvent } from "react";
import { LS_NEWSLETTER_DISMISSED } from "../lib/constants";

export default function NewsletterPopup() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  useEffect(() => {
    const dismissed = localStorage.getItem(LS_NEWSLETTER_DISMISSED);
    if (!dismissed) {
      const t = setTimeout(() => setOpen(true), 1200);
      return () => clearTimeout(t);
    }
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (status === "submitting") return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setTimeout(() => {
      setStatus("success");
      setEmail("");
      localStorage.setItem(LS_NEWSLETTER_DISMISSED, "1");
      setTimeout(() => setOpen(false), 1000);
    }, 800);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] mx-auto w-full max-w-3xl translate-y-0 px-4 pb-6 sm:px-6 lg:px-8">
      <div className="rounded-xl border border-border bg-card p-4 shadow-elevated">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-bold tracking-tight text-gold" style={{ fontFamily: "var(--font-playfair)" }}>
              Stay in the Loop
            </h3>
            <p className="text-sm text-foreground/80">Get the biggest scoops before anyone else.</p>
          </div>
          {status === "success" ? (
            <p className="text-sm font-semibold text-primary px-4">You&rsquo;re in!</p>
          ) : (
            <form onSubmit={handleSubmit} className="flex w-full max-w-md items-center gap-2">
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                aria-label="Email"
              />
              <button
                type="submit"
                disabled={status === "submitting"}
                className="btn-primary rounded-md px-4 py-2 text-sm font-semibold"
                aria-label="Subscribe"
              >
                {status === "submitting" ? "..." : "Subscribe"}
              </button>
            </form>
          )}
          {status === "error" && (
            <p className="text-sm text-destructive">Please enter a valid email.</p>
          )}
        </div>
        <button
          onClick={() => {
            localStorage.setItem(LS_NEWSLETTER_DISMISSED, "1");
            setOpen(false);
          }}
          aria-label="Dismiss"
          className="absolute right-3 top-3 text-foreground/60 hover:text-foreground"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
