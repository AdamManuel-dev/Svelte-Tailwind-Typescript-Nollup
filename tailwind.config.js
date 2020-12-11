module.exports = {
  darkMode: "media",
  purge: [
    "./src/**/*.html",
    "./src/**/*.svelte",
    "./src/**/*.postcss",
    "./public/**/*.html",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        svelte: "#ff3e00",
      },
    },
  },
  variants: {},
  plugins: [],
};
