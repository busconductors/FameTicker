"use client";

import { useState, type FormEvent } from "react";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

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
    }, 800);
  };

  return (
    <section className="bg-card border border-border rounded-xl p-4">
      <h3
        className="text-xl font-bold tracking-wide text-gold"
        style={{ fontFamily: "var(--font-cormorant-garamond)" }}
      >
        Fame Ticker
      </h3>
      <p className="mt-1 text-sm text-text-secondary">
        Get the biggest scoops before anyone else.
      </p>

      {status === "success" ? (
        <p className="mt-3 text-sm font-semibold text-green-500">
          Subscribed!
        </p>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="mt-3 flex gap-2"
          noValidate
        >
          <input
            type="email"
            required
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 bg-background border border-border rounded-md px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-[var(--accent-red)]/50"
          />
          <button
            type="submit"
            disabled={status === "submitting"}
            className="bg-[var(--accent-red)] text-white px-4 py-2 text-sm font-semibold rounded-md hover:opacity-90 disabled:opacity-60"
          >
            {status === "submitting" ? "..." : "Subscribe"}
          </button>
        </form>
      )}

      {status === "error" && (
        <p className="mt-2 text-sm text-red-500">
          Please enter a valid email address.
        </p>
      )}
    </section>
  );
}
