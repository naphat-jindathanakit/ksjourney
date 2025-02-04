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
        sunsetOrange: "#FF9A8B",
        sunsetPink: "#FFB6C1",
        sunsetPeach: "#FFCC99",
        sunsetYellow: "#FFD699",
        sunsetPurple: "#D1A7E2",
      },
    },
  },
  plugins: [],
} satisfies Config;
