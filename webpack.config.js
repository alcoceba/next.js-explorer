const path = require("path");
const HTMLPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const Browser = process.env.DIST_BROWSER ?? "chrome";
const Environment = process.env.NODE_ENV ?? "development";

module.exports = {
  entry: {
    background: "./src/background/index.js",
    popup: "./src/popup/index.js",
    app: "./src/app/index.js",
  },
  mode: Environment,
  devtool: "cheap-module-source-map",
  module: {
    rules: [
      {
        test: /\.?jsx?$/,
        exclude: /node_modules|\.test\.js|\.spec\.js/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              ["@babel/preset-react", { runtime: "automatic" }],
            ],
          },
        },
      },
      {
        exclude: /node_modules/,
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: `manifest.${Browser}.json`, to: "manifest.json" },
        { from: "public/**/*" },
      ],
    }),
    new HTMLPlugin({
      title: "Next.js Explorer",
      favicon: "./public/icons/favicon.ico",
      filename: "index.html",
      chunks: ["app"],
      inject: "body",
    }),
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    path: path.join(__dirname, `dist/${Browser}`),
    filename: "[name].js",
  },
};
