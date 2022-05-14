const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /src\/.+\.html/,
        loader: 'html-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: true,
      favicon: './src/favicon.ico',
    }),
    new MiniCssExtractPlugin(),
  ],
  devServer: {
    port: 8020,
  },
};
