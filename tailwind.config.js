/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "cip-blue": "#00AEF2",
        "cip-green": "#84C9BD",
        "cip-light-green": "#CBEBE5",
        "cip-deep-green": "#056476",
        "cip-orange": "#FF9C5B",
        "facebook-blue": "#1877F2",
        "cip-grey": "#DADADA",
        "cip-active": "#D1EA2C",
        "cip-inactive": "#F9BC02",
      },
    },
  },
  plugins: [],
};
