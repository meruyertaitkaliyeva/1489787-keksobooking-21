const path = require("path");

module.exports = {
  entry: [
    "./js/server.js",
    "./js/reset.js",
    "./js/filter.js",
    "./js/debounce.js",
    "./js/pin.js",
    "./js/card.js",
    "./js/form.js",
    "./js/move.js",
    "./js/page.js"
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
};
