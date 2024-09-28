/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#ff5a5f",
        secondary: "#ccc",
        tertiary: "#555",
        error: "#ff3333"
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}