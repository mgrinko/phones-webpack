module.exports = {
  entry: './scripts/app',

  output: {
    path: './',
    filename: 'compiled.js'
  },

  devtool: 'source-map',

  //watch: true,

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.hbs/,
        loader: 'handlebars-loader'
      }
    ]
  }
};
