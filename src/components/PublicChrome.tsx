"use client";

import { usePathname } from "next/navigation";

export default function PublicChrome({
  children,
  header,
  footer,
  ticker,
}: {
  children: React.ReactNode;
  header: React.ReactNode;
  footer: React.ReactNode;
  ticker?: React.ReactNode;
}) {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen flex-col">
      {header}
      {ticker}
      <main className="flex-1">{children}</main>
      {footer}
    </div>
  );
}
