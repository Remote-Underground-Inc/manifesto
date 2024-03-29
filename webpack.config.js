const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');

const isDev = process.env.APP_ENV === 'development';

const baseFilename = isDev ? 'main' : 'main.[contenthash]';

module.exports = {
  entry: [
    path.resolve(__dirname, 'theme', 'js', 'main.js'),
    path.resolve(__dirname, 'theme', 'css', 'main.scss'),
  ],
  output: {
    path: path.resolve(__dirname, 'public', 'assets'),
    filename: `${baseFilename}.js`,
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        ],
      },
      {
        test: /\.(s(a|c)ss)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },

  plugins: [
    new WebpackManifestPlugin({ publicPath: '/assets/' }),
    new MiniCssExtractPlugin({ filename: `${baseFilename}.css` }),
  ],
};
