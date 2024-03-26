/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        body: ["var(--font-inter)"],
        display: ["var(--font-fraunces)"],
      },
      colors: {
        pastel: {
          green1: "#4c9878",
          green2: "#208259",
          slate1: "#f4f8f7",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
