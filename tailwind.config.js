const colors = require("tailwindcss/colors");

module.exports = {
  purge: {
    enabled: true,
    content: [
      "./_includes/**/*.html",
      "./_layouts/**/*.html",
      "./_posts/**/*.md",
      "./pages/**/*.md",
      "*.html",
    ],
  },
  darkMode: false,
  theme: {
    container: {
      padding: "2rem",
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      gray: colors.trueGray,
      indigo: colors.indigo,
      red: {
        100: "#f5dade",
        200: "#eab2ba",
        300: "#df8a97",
        400: "#d46273",
        500: "#c93a4f",
        600: "#a32d3e",
        700: "#7B222F", // primary color
        800: "#5b1923",
        900: "#3b1017",
      },
      yellow: {
        100: "#f5d5af",
        200: "#f3c998",
        300: "#f0bd81",
        400: "#edb26a",
        500: "#eaa654",
        600: "#e89a3d",
        700: "#E58E26", // primary color
        800: "#c17417",
        900: "#935812",
      },
      purple: {
        100: "#eddaf3",
        200: "#dbb4e6",
        300: "#c88ed9",
        400: "#b668cc",
        500: "#a442bf",
        600: "#84349a",
        700: "#632774", // primary color
        800: "#491d55",
        900: "#2f1237",
      },
      mavidurak: {
        100: "#a7deff",
        200: "#74caff",
        300: "#41b7ff",
        400: "#0ea4ff",
        500: "#0087da",
        600: "#0068a7",
        700: "#004874", // primary color
        800: "#00385a",
        900: "#001927",
      },
    },
    fontFamily: {
      sans: ["ui-sans-serif", "system-ui"],
      serif: ["ui-serif", "Georgia"],
      mono: ["ui-monospace", "SFMono-Regular"],
      rubik: ["Rubik"],
      poppins: ["Poppins", "sans-serif"],
      cormorant: ["Cormorant Unicase"],
      ubuntu: ["Ubuntu"],
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
