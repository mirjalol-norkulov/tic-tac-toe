module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === "production",
    content: ["./src/**/*.vue"],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#50206c",
        },
        black: {
          DEFAULT: "#333333",
        },
        gray: {
          primary: "#f9fbfc",
        },
      },
    },
  },
  variants: {
    extend: {
      ringColor: ["active"],
    },
  },
  plugins: [],
};
