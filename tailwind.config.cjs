/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        "slide-rti": "slide-rti .4s ease-in-out"
      },
      keyframes: {
        "slide-rti": {
          form: { "margin-right": "-100%" },
          to: { "margin-right": "0%" }
        }
      }
    },
  },
  plugins: [],
}