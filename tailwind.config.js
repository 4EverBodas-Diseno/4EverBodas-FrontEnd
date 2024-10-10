/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#FF477E",
          200: "#FF93B4",
        },
        secondary: {
          100: "#6C6C6C",
          200: "#909090",
        },
      },
      fontFamily: {
        manrope: ["Manrope", "sans-serif"],
        playfair: ["Playfair Display", "serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/container-queries")],
};
