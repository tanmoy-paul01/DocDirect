/** @type {import('tailwindcss').Config} */
// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        color1: "#00BFBA",
        color2: "#05E0D5",
        color3: "#97DFFF",
        color4: "#E2E0E0",
        color5: "#F2F2F2"
      },
      gridTemplateColumns: {
        auto: 'repeat(auto-fill, minmax(200px, 1fr))'
      }
    },
  },
  plugins: [],
};