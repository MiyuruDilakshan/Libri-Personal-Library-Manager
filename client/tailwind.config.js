/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#3e7879",
        "primary-dark": "#2c5758",
        "background-light": "#fbfaf8",
        "background-dark": "#1b1f22",
        "surface-light": "#ffffff",
        "surface-dark": "#25292c",
        "border-light": "#e5e7eb",
        "border-dark": "#374151",
      },
      fontFamily: {
        "display": ["Manrope", "sans-serif"]
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
    },
  },
  plugins: [],
}
