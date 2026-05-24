"use client";

import { useState, useTransition, useRef } from "react";
import { createTickerAction } from "../../../actions";

export default function TickerForm() {
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState(false);
  const [pending, startTransition] = useTransition();
  const ref = useRef<HTMLFormElement>(null);

  if (success) {
    ref.current?.reset();
    // Reset success so the form can be used again
    setTimeout(() => setSuccess(false), 0);
  }

  function handleSubmit(formData: FormData) {
    setError(undefined);
    setSuccess(false);
    startTransition(async () => {
      const result = await createTickerAction(formData);
      if (result?.error) {
        setError(result.error);
      } else if (result?.success) {
        setSuccess(true);
      }
    });
  }

  return (
    <form
      ref={ref}
      action={handleSubmit}
      className="flex items-start gap-3"
    >
      <div className="flex-1">
        <input
          name="message"
          type="text"
          required
          placeholder="Breaking news message..."
          className="w-full rounded-md border border-border bg-white px-3 py-2 text-sm text-text-dark outline-none focus:ring-2 focus:ring-[var(--accent-gold)] focus:border-transparent"
        />
        {error && (
          <p className="text-xs text-[var(--accent-red)] mt-1">{error}</p>
        )}
      </div>

      <input
        name="priority"
        type="number"
        defaultValue={0}
        className="w-20 rounded-md border border-border bg-white px-3 py-2 text-sm text-text-dark outline-none focus:ring-2 focus:ring-[var(--accent-gold)] focus:border-transparent"
        title="Priority (higher = shown first)"
      />

      <button
        type="submit"
        disabled={pending}
        className="rounded-md bg-[var(--accent-gold)] text-white font-medium px-4 py-2 text-sm hover:opacity-90 disabled:opacity-50 transition shrink-0"
      >
        {pending ? "..." : "Add"}
      </button>
    </form>
  );
}
