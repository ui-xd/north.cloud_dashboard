import { fontFamily } from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: ["class"],
  content: ["./src/**/*.{html,js,svelte,ts}"],
  safelist: ["dark"],
  theme: {
    container: {
      center: true,
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Satoshi", ...fontFamily.sans],
        mono: ["Red Hat Mono", ...fontFamily.mono],
      },
      colors: {
        nebula: {
          DEFAULT: "#D591FE",
          100: "#F8DAFE",
        },
        light: "#F8FCFD",
        bruma: {
          800: "#2B2F34",
        },
        zenix: "#1E2125",
        aurora: "#00FFD1",
      },
      gradientColorStops: {
        "aurora-start": "#00FFD1",
        "aurora-end": "#0747FF",
      },
    },
  },
};

export default config;
