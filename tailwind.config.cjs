/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        pattern: 'url("/src/assets/pattern.svg")',
      },
    },
  },
  plugins: [],
}