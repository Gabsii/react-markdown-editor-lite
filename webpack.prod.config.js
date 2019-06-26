const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack');
const version = require("./package.json").version;
const banner =
  "/**\n" +
  " * react-markdown-editor-lite v" + version + "\n" +
  " * https://github.com/HarryChen0506/react-markdown-editor-lite\n" +
  " * MIT License\n" +
  " */\n";
const config = {
  entry: {
    app: './src/index.ts',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'lib'),
    libraryTarget: "umd"
  },
  externals: [{
      react: 'react',
    },
    {
      ['react-dom']: 'react-dom',
    }
  ],
  mode: 'production',
  module: {
    rules: [{
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [{
          loader: "ts-loader"
        }]
      },
      {
        test: /\.(js|jsx)$/,
        loader: "babel-loader",
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          'postcss-loader',
          'less-loader'
        ]
      },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      },
      {
        test: /\.(png|svg|jpg|gif|eot|woff|ttf)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 20000,
          }
        }]
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  plugins: [
    new CleanWebpackPlugin(['lib']),
    new webpack.BannerPlugin({
      banner,
      raw: false
    })
  ],
};

module.exports = config;