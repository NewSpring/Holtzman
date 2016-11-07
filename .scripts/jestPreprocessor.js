const babelJest = require("babel-jest");
const babelOptions = require("../.babelrc");
const babelTransform = babelJest.createTransformer(babelOptions);

module.exports = {
  process(src, path) {
    return babelTransform.process(src, path);
  },
};
