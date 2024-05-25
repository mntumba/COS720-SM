/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}",
    "./node_modules/preline/preline.js",
    "./node_modules/tw-elements/js/**/*.js",
    // "./node_modules/preline/preline.js",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    require("tw-elements/plugin.cjs"),
    require("preline/plugin"),
  ],
}

