var path = require('path');
var webpack = require('webpack');

module.exports = {
  context: __dirname,
  entry: [
    './demo/index.js'
  ],
  output: {
    path: path.resolve('./demo/'),
    filename: 'demo.js',
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: true,
        dead_code: true,
        unused: true,
        booleans: true,
        join_vars: true,
        negate_iife: true,
        sequences: true,
        properties: true,
        evaluate: true,
        loops: true,
        if_return: true,
        cascade: true,
        unsafe: true
      },
      output: {
        comments: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(true)
  ],
  module: {
    loaders: [
      // we pass the output from babel loader to react-hot loader
      { 
        test: /\.(js|jsx)$/, 
        exclude: /node_modules/, 
        loaders: [
          'babel-loader?presets[]=es2015&presets[]=stage-0'
        ],
      },
      { 
        test: /\.(json)$/,
        loaders: [
          'json'
        ],
      },
    ],
  },

  resolve: {
    root:  path.resolve(__dirname, '.'),
    modulesDirectories: ['node_modules', 'bower_components'],
    extensions: ['', '.js', '.jsx'],
  },
};