/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        primary: "#3E3E3E",
        tbodycolor: "#f9ffff",
      },
    },
  },
  plugins: [],
};
