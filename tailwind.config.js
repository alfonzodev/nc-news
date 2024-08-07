/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        primary: "#003366",
        secondary: "#F0F0F0",
        accent: "#A9A9A9",
        highlight: "#FF6600",
      },
    },
  },
  plugins: [],
};
