"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container mx-auto flex flex-col items-center justify-center px-4 py-20 text-center sm:px-6 lg:px-8">
      <h1 className="text-6xl font-bold text-foreground" style={{ fontFamily: "var(--font-playfair)" }}>
        Oops!
      </h1>
      <p className="mt-4 max-w-md text-foreground/80">
        Something went wrong loading this page. Don't worry — the tea is still brewing.
      </p>
      <div className="mt-6 flex gap-3">
        <button
          onClick={reset}
          className="btn-primary rounded-md px-4 py-2 text-sm font-semibold"
        >
          Try Again
        </button>
        <Link href="/" className="btn-secondary rounded-md px-4 py-2 text-sm font-semibold">
          Go Home
        </Link>
      </div>
    </div>
  );
}
