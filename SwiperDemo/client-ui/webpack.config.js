// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");
const buildDir = path.resolve("../wwwroot/dist");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const isProduction = process.env.NODE_ENV == "production";

const stylesHandler = MiniCssExtractPlugin.loader;

const config = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    open: true,
    host: "localhost",
  },
  plugins: [
    new MiniCssExtractPlugin(),

    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        loader: "babel-loader",
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [stylesHandler, "css-loader", "sass-loader"],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          chunks: "all",
          name: "vendor",
          test: /[\\/]node_modules[\\/]/,
        },
      },
    },
    // These plugins are only run in production mode
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          compress: {
            comparisons: true,
            conditionals: true,
            dead_code: true,
            drop_console: true,
            if_return: true,
            join_vars: true,
            unused: true,
            warnings: false,
          },
          output: {
            comments: false,
          },
        },
      }),
    ],
  },
  output: {
    filename: "[name].min.js",
    chunkFilename: "[name].min.js",
    globalObject: "this",
    path: `${buildDir}`,
    publicPath: "/Content/dist/",
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";
  } else {
    config.mode = "development";
  }
  return config;
};
