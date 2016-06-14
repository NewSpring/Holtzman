var webpack = require("webpack");
var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var babelSettings = { stage: 0 };

if (process.env.NODE_ENV !== "production") {
  babelSettings.plugins = ["react-transform"];
  babelSettings.extra = {
    "react-transform": {
      transforms: [
        {
          transform: "react-transform-hmr",
          imports: ["react"],
          locals: ["module"]
        },
        {
          transform: "react-transform-catch-errors",
          imports: ["react", "redbox-react"]
        }
      ]
    }
  };
}

var cssLoader;
var plugins = [];

if (process.env.NODE_ENV === 'production') {
  plugins.push(new ExtractTextPlugin('style.css', { allChunks: true }));
  cssLoader = ExtractTextPlugin.extract('style', 'css?module&localIdentName=[hash:base64:5]');

  // XXX this doesn't work anymore
  // i'm not sure we need it at all?
  //
  // if (!Meteor.isCordova) {
  //   plugins.push(new webpack.optimize.CommonsChunkPlugin('common', 'common.web.js'));
  // }
} else {
  cssLoader = 'style!css?module&localIdentName=[name]__[local]__[hash:base64:5]';
}

module.exports = {
  entry: "./entry",
  plugins: plugins,
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: "babel",
        query: babelSettings,
        include: [
          path.join(__dirname, "..", "..", "..", "..", "apollos", "core"),
          path.join(__dirname, "..", "..", "..", "..", "apollos", "profile"),
          path.join(__dirname, "..", "..", "..", "..", "apollos", "community"),
          path.join(__dirname, "..", "..", "..", "..", "apollos", "give"),
          path.join(__dirname, "..", "..", "entry"),
          path.join(__dirname, "..", "..", "modules")
        ]
      },
      { test: /\.css$/, loader: cssLoader },
      { test: /\.(png|jpe?g)(\?.*)?$/, loader: "url?limit=8182" },
      { test: /\.(svg|ttf|woff|eot)(\?.*)?$/, loader: "file" },
      { test: /\.gql?$/, loader: "raw" }

    ]
  }
};
