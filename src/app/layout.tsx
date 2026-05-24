import type { Metadata } from "next";
import "./globals.css";
import { Bebas_Neue, DM_Sans, Cormorant_Garamond, Oswald } from "next/font/google";
import PublicChrome from "../components/PublicChrome";
import NewsletterPopup from "../components/NewsletterPopup";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant-garamond",
  display: "swap",
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Fame Ticker — Celebrity News & Entertainment",
    template: "%s — Fame Ticker",
  },
  description:
    "Real-time celebrity intel. Breaking stories, red carpet coverage, and entertainment drama — delivered before it trends.",
  keywords: "celebrity news, gossip, entertainment, music news, Hollywood, fashion, reality TV, celebrity relationships, fame ticker",
  metadataBase: new URL("https://fameticker.news"),
  openGraph: {
    title: "Fame Ticker — Celebrity News & Entertainment",
    description: "Real-time celebrity intel. Breaking stories, red carpet coverage, and entertainment drama.",
    url: "https://fameticker.news",
    siteName: "Fame Ticker",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fame Ticker — Celebrity News & Entertainment",
    description: "Real-time celebrity intel. Breaking stories, red carpet coverage, and entertainment drama.",
    images: ["/og-image.jpg"],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://fameticker.news" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bebas.variable} ${dmSans.variable} ${cormorantGaramond.variable} ${oswald.variable}`}>
      <body className="min-h-screen antialiased" style={{ fontFamily: "var(--font-dm-sans)" }}>
        <PublicChrome>{children}</PublicChrome>
        <NewsletterPopup />
      </body>
    </html>
  );
}
