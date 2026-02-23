import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#C17B5C",
        dark: "#3D2B1F",
        accent: "#C17B5C",
        "neutral-100": "#FDFAF5",
        "neutral-200": "#F5EFE6",
        "neutral-300": "#E8DDD3",
      },
      fontFamily: {
        serif: ["Noto Serif JP", "serif"],
        sans: ["Noto Sans JP", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
