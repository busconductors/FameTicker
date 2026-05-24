import type { Metadata } from "next";
import "./globals.css";
import { Playfair_Display, Bebas_Neue, Manrope } from "next/font/google";
import ClientBody from "./ClientBody";
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

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Spill It Now — Celebrity News & Gossip",
    template: "%s — Spill It Now",
  },
  description:
    "Your premier destination for celebrity news, exclusive gossip, and entertainment updates. Music, Movies, Fashion, Relationships, Reality TV.",
  metadataBase: new URL("https://spillitnow.space"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${bebas.variable} ${manrope.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen antialiased">
        <ClientBody>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <NewsletterPopup />
        </ClientBody>
      </body>
    </html>
  );
}
