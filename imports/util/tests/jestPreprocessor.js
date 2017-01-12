const babelJest = require("babel-jest"); // eslint-disable-line
const babelOptions = require("../../../package").babel;

const babelTransform = babelJest.createTransformer(babelOptions);

module.exports = {
  process(src, path) {
    return babelTransform.process(src, path);
  },
};
