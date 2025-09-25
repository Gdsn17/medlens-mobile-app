/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'medlens-purple': '#5A3E85',
        'medlens-cyan': '#2ED4D9',
        'medlens-dark': '#1E1E1E',
      },
    },
  },
  plugins: [],
}
