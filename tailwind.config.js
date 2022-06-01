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
    borderWidth: {
      DEFAULT: "0.5px",
    },
    extend: {},
    colors: {
      grn: "#1BC47D",
      drk: "#011B27",
      mdrk: "#01141D",
      segrn: "#18A167",
      gry: "#616161",
      blck: "#130301",
      rd: "#9E2146",
      serd: "#6B142E",
      wht: "#F3E8EE",
      gryf: "#1A0404",
      ...defaultColors,
    },
  },
};
