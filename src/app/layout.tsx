import type { Metadata } from "next";
import "./globals.css";
import { Playfair_Display, Bebas_Neue, DM_Sans } from "next/font/google";
import Header from "../components/Header";
import Footer from "../components/Footer";
import NewsletterPopup from "../components/NewsletterPopup";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

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

export const metadata: Metadata = {
  title: {
    default: "The Tea — Celebrity News & Gossip",
    template: "%s — The Tea",
  },
  description:
    "Your premier destination for celebrity news, exclusive gossip, and entertainment updates. Music, Movies, Fashion, Relationships, Reality TV.",
  metadataBase: new URL("https://fameticker.netlify.app"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${bebas.variable} ${dmSans.variable}`}>
      <body className="min-h-screen antialiased" style={{ fontFamily: "var(--font-dm-sans)" }}>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <NewsletterPopup />
      </body>
    </html>
  );
}
