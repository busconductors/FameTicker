"use client";

import { useEffect } from "react";

export default function ClientBody({
  children,
}: {
  children: React.ReactNode;
}) {
  // Ensure antialiasing without clobbering existing classes (e.g., dark mode)
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.body.classList.add("antialiased");
    }
  }, []);

  return <div className="antialiased">{children}</div>;
}
