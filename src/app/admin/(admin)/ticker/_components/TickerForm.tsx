"use client";

import { useState, useTransition, useRef } from "react";
import { createTickerAction } from "../../../actions";
import { Plus } from "lucide-react";

export default function TickerForm() {
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState(false);
  const [pending, startTransition] = useTransition();
  const ref = useRef<HTMLFormElement>(null);

  if (success) {
    ref.current?.reset();
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
    <form ref={ref} action={handleSubmit} className="flex items-start gap-3">
      <div className="flex-1">
        <input
          name="message"
          type="text"
          required
          placeholder="Breaking news message..."
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 transition-colors focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:outline-none"
        />
        {error && (
          <p className="text-xs text-red-600 mt-1">{error}</p>
        )}
      </div>

      <input
        name="priority"
        type="number"
        defaultValue={0}
        className="w-20 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 transition-colors focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:outline-none"
        title="Priority (higher = shown first)"
      />

      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50 transition-colors inline-flex items-center gap-2 shrink-0"
      >
        <Plus size={16} />
        {pending ? "Adding..." : "Add"}
      </button>
    </form>
  );
}
