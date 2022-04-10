const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const prodConfig = {
  mode: 'production',
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /src\/.+\.html/,
        loader: 'html-loader',
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.css', '.scss'],
  },
  plugins: [new MiniCssExtractPlugin()],
  devtool: 'source-map',
  output: {
    libraryTarget: 'commonjs',
    filename: 'index.js',
  },
};

const devConfig = {
  mode: 'development',
  entry: './public/index.ts',
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      inject: true,
    }),
  ],
  devServer: {
    port: 8010,
  },
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
