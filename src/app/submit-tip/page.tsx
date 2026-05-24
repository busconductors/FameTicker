"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export default function SubmitTipPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [tip, setTip] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (status === "submitting") return;

    if (!tip.trim()) {
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setTimeout(() => {
      setStatus("success");
      setName("");
      setEmail("");
      setTip("");
    }, 800);
  };

  return (
    <div className="container mx-auto px-4 py-10 sm:px-6 lg:px-8">
      <section className="bg-cream rounded-md p-6 sm:p-8">
        <h1
          className="text-3xl sm:text-4xl font-bold text-text-dark"
          style={{ fontFamily: "var(--font-cormorant-garamond)" }}
        >
          Tip the Ticker.
        </h1>
        <p
          className="mt-2 text-text-muted-dark max-w-2xl"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          Know something? Drop it here. Anonymous tips welcome.
        </p>

        {status === "success" ? (
          <div className="mt-6 rounded-md border border-gold-dim bg-white p-6 max-w-xl text-center">
            <p
              className="text-sm font-semibold text-text-dark"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Tip received &mdash; we&rsquo;ll look into it.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 max-w-xl space-y-4" noValidate>
            <input
              type="text"
              placeholder="Your name (optional)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-md border border-border bg-white px-3 py-2 text-sm text-text-dark outline-none focus:ring-2 focus:ring-[var(--accent-red)]"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            />
            <input
              type="email"
              placeholder="Contact email (optional)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-border bg-white px-3 py-2 text-sm text-text-dark outline-none focus:ring-2 focus:ring-[var(--accent-red)]"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            />
            <textarea
              placeholder="Your tip (be as detailed as possible)"
              value={tip}
              onChange={(e) => setTip(e.target.value)}
              className="min-h-[160px] w-full rounded-md border border-border bg-white px-3 py-2 text-sm text-text-dark outline-none focus:ring-2 focus:ring-[var(--accent-red)]"
              style={{ fontFamily: "var(--font-dm-sans)" }}
              required
            />
            {status === "error" && (
              <p
                className="text-sm text-destructive"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                Please provide your tip before sending.
              </p>
            )}
            <button
              type="submit"
              disabled={status === "submitting"}
              className="bg-[var(--accent-red)] text-white px-6 py-2 font-semibold rounded-md hover:opacity-90 disabled:opacity-50"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              {status === "submitting" ? "Sending..." : "Send Tip"}
            </button>
          </form>
        )}
      </section>
    </div>
  );
}
