const path = require('path');
const marked = require('marked');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const imageminMozjpeg = require('imagemin-mozjpeg');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const dev = process.env.NODE_ENV !== 'production';

// Extract text
const extractCss = new ExtractTextPlugin({
  filename: '[hash].css',
  allChunks: true,
  disable: dev
});

// Marked
const renderer = new marked.Renderer();
renderer.blockquote = (text) => {
  const splitted = text.replace(/^ *> ?/gm, '').replace(/<\/?p>/g, '').split('\n');
  return `<blockquote class='${splitted.shift()}'>${splitted.join('\n')}</blockquote>`;
};

// Env vars
const commitHash = require('child_process').execSync('git rev-parse HEAD').toString().trim();

const config = {
  entry: './src/main.jsx',
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  mode: dev
    ? 'development'
    : 'production',
  module: {
    rules: [
      {
        test: /\.jsx?/,
        loaders: ['babel-loader'],
        exclude: [/node_modules/]
      },
      {
        test: /\.scss$/,
        use: extractCss.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
            options: {
              sourceMap: dev,
              modules: true,
              camelCase: true,
              localIdentName: '[local]-[hash:7]'
            }
          }, {
            loader: 'postcss-loader',
            options: {
              sourceMap: dev
            }
          }, {
            loader: 'sass-loader',
            options: {
              sourceMap: dev
            }
          }]
        })
      },
      {
        test: /\.css$/,
        use: extractCss.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
            options: {
              sourceMap: dev,
              modules: true,
              camelCase: true,
              localIdentName: '[local]-[hash:7]'
            }
          }, {
            loader: 'postcss-loader',
            options: {
              sourceMap: dev
            }
          }]
        })
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf|wav)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[hash:8].[ext]'
          }
        }]
      }
    ]
  },
  devServer: {
    quiet: true,
    historyApiFallback: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: 'body',
      filename: '../index.html',
      alwaysWriteToDisk: true
    }),
    new HtmlWebpackHarddiskPlugin(),
    extractCss,
    new ImageminPlugin({
      disable: dev,
      pngquant: {
        quality: '95-100'
      },
      jpegtran: false,
      plugins: [
        imageminMozjpeg({
          quality: 90,
          progressive: true
        })
      ]
    }),
    new webpack.DefinePlugin({
      WEBPACK: {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        GIT_REVISION: JSON.stringify(commitHash)
      },
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV === 'staging' ? 'production' : process.env.NODE_ENV)
    })
  ]
};

if (!dev) {
  config.output.filename = '[hash].js';
  config.output.chunkFilename = '[name].[hash].js';
  config.plugins.push(new CleanWebpackPlugin());
  config.plugins.push(new webpack.optimize.OccurrenceOrderPlugin());
  config.plugins.push(new OptimizeCssAssetsPlugin());
} else {
  config.plugins.push(new FriendlyErrorsWebpackPlugin());
}

module.exports = config;
