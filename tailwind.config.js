const defaultTheme = require("tailwindcss/defaultTheme");
const defaultColors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      xs: { min: "0px", max: "639px" },
      ...defaultTheme.screens,
    },
    extend: {},
    colors: {
      grn: "#1BC47D",
      gry: "#616161",
      blck: "#130301",
      rd: "#BF0000",
      wht: "#F3E8EE",
      ...defaultColors,
    },
  },
  plugins: [],
};
