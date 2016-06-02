var webpack = require("webpack");

var localIdentName = process.env.NODE_ENV === 'production' ? '[hash:base64:5]' : '[name]__[local]__[hash:base64:5]';

module.exports = {
  entry: "./entry",
  module: {
    loaders: [
      { test: /\.jsx?$/, loader: "babel", exclude: /node_modules/, query: { stage: 0 } },
      { test: /\.css$/,  loader: 'css/locals?module&localIdentName=' + localIdentName },
      { test: /\.(png|jpe?g)(\?.*)?$/, loader: "url?limit=8182" },
      { test: /\.(svg|ttf|woff|eot)(\?.*)?$/, loader: "file" },
      { test: /\.gql?$/, loader: "raw" }
    ]
  }
};
