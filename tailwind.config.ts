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
        background: "#0D0D0D",
        foreground: "#FFFFFF",
        card: {
          DEFAULT: "#1A1A1A",
          foreground: "#FFFFFF",
        },
        popover: {
          DEFAULT: "#1A1A1A",
          foreground: "#FFFFFF",
        },
        primary: {
          DEFAULT: "#C8A96E",
          foreground: "#0D0D0D",
        },
        secondary: {
          DEFAULT: "#2A2A2A",
          foreground: "#FFFFFF",
        },
        muted: {
          DEFAULT: "#1A1A1A",
          foreground: "#B8B8B8",
        },
        accent: {
          DEFAULT: "#D4382C",
          foreground: "#FFFFFF",
        },
        destructive: {
          DEFAULT: "#D4382C",
          foreground: "#FFFFFF",
        },
        border: "#333333",
        input: "#333333",
        ring: "#C8A96E",
        cream: "#FDF5E6",
        "cream-warm": "#F5EDE0",
        gold: "#C8A96E",
        "gold-dim": "rgba(200, 169, 110, 0.2)",
        "text-dark": "#1A1A1A",
        "text-muted-dark": "#6B6B6B",
        "text-secondary": "#B8B8B8",
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
