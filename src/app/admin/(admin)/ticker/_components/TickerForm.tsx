"use client";

import { useActionState, useRef } from "react";
import { createTickerAction } from "../../../actions";

const initState: { error?: string; success?: boolean } = {};

export default function TickerForm() {
  const [state, formAction, pending] = useActionState(
    async (_prev: typeof initState, formData: FormData) => {
      return createTickerAction(formData);
    },
    initState
  );
  const ref = useRef<HTMLFormElement>(null);

  if (state?.success) {
    ref.current?.reset();
  }

  return (
    <form
      ref={ref}
      action={formAction}
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
        {state?.error && (
          <p className="text-xs text-[var(--accent-red)] mt-1">{state.error}</p>
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
