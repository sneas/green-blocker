const { merge } = require('webpack-merge');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

const prodConfig = {
  mode: 'production',
  entry: {
    'content-script': './src/content-script.ts',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.html?$/,
        loader: 'html-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.mjs'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
    new CopyPlugin({
      patterns: [
        {
          from: '../content-script/dist/main.css',
          to: 'content-script.css',
        },
        {
          from: '../popup/dist',
          to: 'popup',
        },
        { from: '.', to: '.', context: 'assets' },
      ],
    }),
  ],
  performance: {
    hints: false,
  },
};

const devConfig = {
  devtool: 'inline-source-map',
};

module.exports = (env) => {
  switch (true) {
    case env.development:
      return merge(prodConfig, devConfig);
    case env.production:
      return prodConfig;
    default:
      throw new Error('No matching configuration was found!');
  }
};
