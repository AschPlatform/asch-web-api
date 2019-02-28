const path = require('path')
const { CheckerPlugin } = require('awesome-typescript-loader')
module.exports = {
  mode: 'development',
  // mode: 'production',
  entry: './src/index.ts',
  target: 'node',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'commonjs',

  },

  devtool: "source-map",
  resolve: {
    // mainFields: ['browser', 'module', 'main'],
    // modules: ['node_modules'],
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },

  // module: {
  //   rules: [
  //     {
  //       test: /\.tsx?$/,
  //       use: 'ts-loader',
  //       exclude: /node_modules/
  //     }
  //   ],
  // }

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader'
      }
    ]
  },
  plugins: [
      new CheckerPlugin()
  ]

}
