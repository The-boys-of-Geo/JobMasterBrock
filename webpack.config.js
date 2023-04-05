const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
module.exports = {
  entry: './src/client/index.tsx',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js',
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './src/client/index.html',
    }),
    new CopyPlugin({
      patterns: [{ from: './src/client/App.css' }],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        //add rule to test ts/tsx files & compile
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ['ts-loader'],
      },
    ],
  },
  //resolve extensions
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        router: () => 'http://localhost:3000',
      },
    },
    historyApiFallback: true,
  },
};
