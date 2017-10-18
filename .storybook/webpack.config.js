const path = require("path");

// Export a function. Accept the base config as the only param.
module.exports = (base, configType) => {
  const config = base;

  config.module.rules = [
    ...config.module.rules,
    {
      test: /\.md$/,
      use: "raw-loader",
    },
    {
      test: /\.s?css$/,
      use: [
        { loader: "style-loader" },
        { loader: "css-loader" },
        {
          loader: "sass-loader",
          options: {
            includePaths: [ path.resolve(__dirname, "../") ],
            importer: function (url, prev, done) {
              // XXX quick hack to get root slash working
              if (url[0] === '/') {
                url = path.resolve(process.cwd(), url.slice(1, url.length));
              }
              done({ file: url });
            },
          },
        },
      ],
    },
  ];

  config.resolve.alias = {
    "meteor/meteor": path.join(__dirname, "../.meteor/mocks/meteor"),
    "meteor/accounts-base": path.join(__dirname, "../.meteor/mocks/accounts-base"),
    "meteor/ddp": path.join(__dirname, "../.meteor/mocks/ddp"),
  };

  // Return the altered config
  return config;
};