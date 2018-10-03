const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ImageminPlugin = require('imagemin-webpack-plugin').default
const imageminMozjpeg = require('imagemin-mozjpeg')
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

const dev = process.env.NODE_ENV !== 'production'
const extractCss = new ExtractTextPlugin({
  filename: '[name].[hash:8].css',
  allChunks: true,
  disable: dev
})

let config = {
  entry: './src/main.tsx',
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/'
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx']
  },
  mode: dev ? 'development' : 'production',
  module: {
    rules: [
      {
        test: /\.tsx?/,
        loaders: ['babel-loader', 'ts-loader'],
        exclude: [/node_modules/]
      },
      {
        test: /\.scss$/,
        use: extractCss.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
            options: {
              minimize: !dev,
              sourceMap: dev
            }
          },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: dev
              }
            },
            {
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
              minimize: !dev,
              sourceMap: dev
            }
          },
            {
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
            name: `${dev ? '[name].[hash:4]' : '[hash]'}.[ext]`
          }
        }]
      }
    ]
  },
  devServer: {
    quiet: true,
    historyApiFallback: {
      index: 'dist/index.html'
    },
    proxy: {
      '/api': 'http://localhost:3010' // I run Union API on this port
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: 'body',
      filename: 'index.html',
      alwaysWriteToDisk: true
    }),
    new HtmlWebpackHarddiskPlugin(),
    extractCss,
    new ImageminPlugin({
      disable: !dev,
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
    })
  ]
}

if (!dev) {
  config.output.filename = '[name].[hash:8].js'
  config.output.chunkFilename = '[name].[hash:8].js'
  config.plugins.push(new CleanWebpackPlugin([path.resolve(__dirname, 'dist')]))
  config.plugins.push(new webpack.optimize.OccurrenceOrderPlugin())
} else {
  config.plugins.push(new FriendlyErrorsWebpackPlugin())
}

module.exports = config
