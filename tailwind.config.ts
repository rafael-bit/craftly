import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#d1d5db",
        hover: "#f3f4f6",
        secondary: "#9ca3af",
      },

      borderColor: {
        primary: "#374151",
        hover: "#f3f4f6",
        secondary: "#f3f4f6",
      },

      backgroundColor: {
        primary: "#0d0d0d",
        hover: "#111012",
        light: "#161417",
        lightHover: "#1a181c"
      },

      screens: {
        xs: "450px",
      },
    },
  },
  plugins: [],
} satisfies Config;