/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.ts",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    flex: {
      1: 1,
    },
    extend: {
      colors: {
        design: {
          primary: "#6C68A8",
          secondary: "#373743",
          text: "#373743",
          gray: "#9C9C9C",
          "gray-2": "#c3c3c3",
          "gray-3": "#E3E3E3",
          "gray-4": "#9E9DA3",
          "gray-5": "#EDEEF0",
          "gray-6": "#9A9A9A",
          "gray-7-50": "#F7F8F980",
          "gray-7": "#F7F8F9",
          "gray-8": "#656565",
          dark: "#1E1E26",
        },
      },
      fontFamily: {
        "satoshi-light": ["Satoshi-Light", "sans-serif"],
        "satoshi-regular": ["Satoshi-Regular", "sans-serif"],
        "satoshi-medium": ["Satoshi-Medium", "sans-serif"],
        "satoshi-bold": ["Satoshi-Bold", "sans-serif"],
      },
      fontSize: {
        xxs: 10,
      },
    },
  },
  plugins: [],
};
