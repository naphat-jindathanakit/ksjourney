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
        background: "var(--background)",
        foreground: "var(--foreground)",
        pastelPink: "#FFB3BA",
        pastelYellow: "#FFF5BA",
        pastelGreen: "#C8E6C9",
        pastelBlue: "#A7C7E7",
        pastelPurple: "#D1C4E9",
        lightPeach: "#FFEBB7",
        softLavender: "#E6C9D7",
      },
    },
  },
  plugins: [],
} satisfies Config;
