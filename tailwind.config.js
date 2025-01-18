/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        customFont: ['"Press Start 2P"', "serif"]
      }
    },
  },
  plugins: [],
}

