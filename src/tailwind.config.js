const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");
delete colors["lightBlue"];

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      ...colors,
      transparent: "transparent",
      black: {
        ...colors.black,
        DEFAULT: "#22292F",
        light: "#4F4F4F",
        dark: "#23232D",
      },
      white: "#FFF",
      yellow: {
        ...colors.yellow,
        dark: "#FF8F03",
        light: "rgba(32,17,0,0.6)",
        border: "#EEDDD7",
      },
      gray: {
        ...colors.gray,
        light: "#898A8D",
        DEFAULT: "#81818E",
      },
    },
    letterSpacing: {
      tightest: "-.0075em",
      "extra-tighter": "-.01em",
      tighter: "-.05em",
      tight: "-.025em",
      "extra-tight": "-.009em",
      normal: "0",
      wide: ".025em",
      wider: ".05em",
      widest: ".1em",
    },
    backgroundColor: (theme) => ({
      ...theme("colors"),
      primary: "#E5E5E5",
      secondary: "#FFE6BA",
    }),
    divideColor: (theme) => ({
      ...theme("borderColors"),
      primary: "#81818E",
      secondary: "#FFE6BA",
      normal: "#BFBFC6",
      danger: "#E3342F",
      light: "#F0F0F5",
    }),
    extend: {
      lineHeight: {
        "extra-tight": "1.364",
        "extra-relaxed": "1.667",
      },
      fontFamily: {
        sans: ["Nunito", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        po: {
          primary: "#FFE6BA",
          primaryhover: "#FFC680",
          primarydark: "#FFAA13",
          yellowextralight: "#FFDAAB",
          yellowlight: "#FFBB66",
          yellowmedium: "#FF8F03",
          yellowdark: "#E27F03",
          black: "#23232D",
          graymain: "#4F4F4F",
          graylight: "#F0F0F5",
          graymedium: "#BFBFC6",
          graydark: "#81818E",
          white: "#FFFFFF",
          red: "#F36262",
          reddark: "#FB1818",
          green: "#34C759",
          greenlight: "rgba(52,199,89,0.8)",
          blue: "#1B7AE9",
          sky: "#d1f4ff",
          divideColor: "#EEDDD7",
          darkerwhite: "#FFFEFC",
        },
      },
    },
  },

  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
