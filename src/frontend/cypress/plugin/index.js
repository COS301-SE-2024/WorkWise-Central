const webpack = require('@cypress/webpack-preprocessor')

module.exports = (on) => {
  const options = {
    webpackOptions: {
      module: {
        rules: [
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
          },
          {
            test: /\.s[ac]ss$/i,
            use: ['style-loader', 'css-loader', 'sass-loader']
          },
          {
            test: /\.vue$/,
            loader: 'vue-loader'
          },
          {
            test: /\.(png|jpe?g|gif|svg)$/,
            loader: 'file-loader',
            options: {
              name: '[name].[hash].[ext]',
              outputPath: 'assets/images'
            }
          }
        ]
      },
      resolve: {
        extensions: ['.js', '.vue', '.json']
      }
    }
  }

  on('file:preprocessor', webpack(options))
}
