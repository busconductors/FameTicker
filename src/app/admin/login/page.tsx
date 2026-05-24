"use client";

import { useActionState } from "react";
import { login } from "../actions";

const initialState: { error?: string } = {};

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(
    async (_prev: typeof initialState, formData: FormData) => {
      return login(formData);
    },
    initialState
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1
            className="text-3xl font-bold text-[var(--accent-gold)] mb-1"
            style={{ fontFamily: "var(--font-cormorant-garamond)" }}
          >
            FAME TICKER
          </h1>
          <p className="text-sm text-text-muted">Admin Login</p>
        </div>

        <form action={formAction} className="bg-white border border-border rounded-lg p-6 space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-text-dark mb-1">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoFocus
              className="w-full rounded-md border border-border bg-white px-3 py-2 text-sm text-text-dark outline-none focus:ring-2 focus:ring-[var(--accent-gold)] focus:border-transparent"
            />
          </div>

          {state?.error && (
            <p className="text-sm text-[var(--accent-red)]">{state.error}</p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-md bg-[var(--accent-gold)] text-white font-medium py-2 text-sm hover:opacity-90 disabled:opacity-50 transition"
          >
            {pending ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
