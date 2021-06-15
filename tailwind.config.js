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
      red: colors.rose,
      yellow: colors.amber,
      purple: colors.purple,
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
