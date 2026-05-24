import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#1A0A0A",
        foreground: "#E8C4C4",
        card: { DEFAULT: "#2D1418", foreground: "#E8C4C4" },
        primary: { DEFAULT: "#E8C4C4", foreground: "#1A0A0A" },
        secondary: { DEFAULT: "#2D1418", foreground: "#E8C4C4" },
        muted: { DEFAULT: "#2D1418", foreground: "#B89A9A" },
        accent: { DEFAULT: "#8B0000", foreground: "#FFFFFF" },
        border: "#3D2424",
        input: "#3D2424",
        ring: "#8B0000",
        cream: "#FFF5F5",
        "cream-warm": "#FFEDED",
        gold: "#E8C4C4",
        "gold-dim": "rgba(232, 196, 196, 0.2)",
        "text-dark": "#1A0A0A",
        "text-muted-dark": "#5C3D3D",
        "text-secondary": "#B89A9A",
        destructive: { DEFAULT: "#CC0000", foreground: "#FFFFFF" },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "4rem",
          xl: "5rem",
          "2xl": "6rem",
        },
        screens: {
          sm: "640px",
          md: "768px",
          lg: "1024px",
          xl: "1280px",
          "2xl": "1536px",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
