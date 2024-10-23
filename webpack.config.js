const path = require("path");

module.exports = {
  entry: "./background.js", // Entry point for your JS files
  output: { 
    filename: "bundle.js", // Output file
    path: path.resolve(__dirname, "dist"),
  },
  mode: "development", // Or 'production' for final builds
};
