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
        primary: {
          DEFAULT: "var(--primary)",
          light: "var(--primary-light)",
        },
        secondary: "var(--secondary)",
        highlight: "var(--highlight)",
        danger: "var(--danger)",
        border: "var(--border)",
      },
    }
  },
  plugins: [],
} satisfies Config;
