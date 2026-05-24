"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (status === "submitting") return;

    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setTimeout(() => {
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    }, 800);
  };

  return (
    <div className="container mx-auto px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-black" style={{ fontFamily: "var(--font-bebas)" }}>
        Contact
      </h1>
      <p className="mt-2 text-sm text-foreground/80 max-w-2xl">
        Have a tip, question, or partnership inquiry? Send us a message below.
      </p>

      {status === "success" ? (
        <div className="mt-6 rounded-md border border-border bg-card p-6 max-w-xl text-center">
          <p className="text-sm font-semibold text-primary">
            Message sent! We&rsquo;ll get back to you soon.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-6 max-w-xl space-y-4" noValidate>
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            required
          />
          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            required
          />
          <textarea
            placeholder="Your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="min-h-[140px] w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            required
          />
          {status === "error" && (
            <p className="text-sm text-destructive">Please fill in all required fields.</p>
          )}
          <button
            type="submit"
            disabled={status === "submitting"}
            className="btn-primary rounded-md px-4 py-2 text-sm font-semibold"
          >
            {status === "submitting" ? "Sending..." : "Send Message"}
          </button>
        </form>
      )}
    </div>
  );
}
