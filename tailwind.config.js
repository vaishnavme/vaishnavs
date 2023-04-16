/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        gray: {
          "gray-1": "#161616",
          "gray-2": "#1c1c1c",
          "gray-12": "#ededed",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
