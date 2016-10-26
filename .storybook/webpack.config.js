const path = require("path");

module.exports = {
  module: {
    loaders: [
      {
        test: /\.md$/,
        loader: "raw"
      },
      {
        test: /\.json$/,
        loader: "json"
      },
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"],
        include: path.resolve(__dirname, "../")
      },
      {
        test: /\.css$/,
        loader: 'style!css'
      },
    ],
  },
  sassLoader: {
    importer: function(url, prev, done) {
      // XXX quick hack to get root slash working
      if (url[0] === "/") {
        url = path.resolve(process.cwd(), url.slice(1, url.length))
      }
      done({ file: url });
    }
  }
}
