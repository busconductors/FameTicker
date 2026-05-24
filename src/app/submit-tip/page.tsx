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
      <h1 className="text-3xl font-black" style={{ fontFamily: "var(--font-bebas)" }}>
        Submit a Tip
      </h1>
      <p className="mt-2 text-sm text-foreground/80 max-w-2xl">
        Got exclusive tea? Share it with us. Your identity will be kept confidential.
      </p>

      {status === "success" ? (
        <div className="mt-6 rounded-md border border-border bg-card p-6 max-w-xl text-center">
          <p className="text-sm font-semibold text-primary">
            Tip received &mdash; thank you for the tea!
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-6 max-w-xl space-y-4" noValidate>
          <input
            type="text"
            placeholder="Your name (optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
          <input
            type="email"
            placeholder="Contact email (optional)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
          <textarea
            placeholder="Your tip (be as detailed as possible)"
            value={tip}
            onChange={(e) => setTip(e.target.value)}
            className="min-h-[160px] w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            required
          />
          {status === "error" && (
            <p className="text-sm text-destructive">Please provide your tip before sending.</p>
          )}
          <button
            type="submit"
            disabled={status === "submitting"}
            className="btn-primary rounded-md px-4 py-2 text-sm font-semibold"
          >
            {status === "submitting" ? "Sending..." : "Send Tip"}
          </button>
        </form>
      )}
    </div>
  );
}
