
const Acorn = Npm.require('acorn');
const Walk = Npm.require("acorn/dist/walk");

const acornOpts = {ecmaVersion: 6, ranges: true, allowHashBang: true}
const processEnvPattern = /\bprocess\.env\b/;

Plugin.registerMinifier({
  extensions: ["js"]
}, function () {
  var minifier = new UglifyJSMinifier();
  return minifier;
});

function UglifyJSMinifier () {};

function replaceEnv(source, envs, purge) {
  let ast = Acorn.parse(source, acornOpts);
  let buffer = '';
  let position = 0;

  Walk.ancestor(ast, {
    MemberExpression: function(node, state) {
      var parent = state[state.length - 2]

      if (!(
        node.type === 'MemberExpression'
        && !(parent.type === 'AssignmentExpression' && parent.left === node)
        && node.property.type === (node.computed ? 'Literal' : 'Identifier')
        && node.object.computed === false
        && node.object.type === 'MemberExpression'
        && node.object.object.type === 'Identifier'
        && node.object.object.name === 'process'
        && node.object.property.type === 'Identifier'
        && node.object.property.name === 'env'
      )) return

      var key = node.property.name || node.property.value

      for (var i = 0; i < envs.length; i++) {
        var value = envs[i][key]
        if (value !== undefined) {
          replaceEnv(node, value)
          return
        }
      }

      if (purge) {
        replaceEnv(node, undefined)
      }
    }
  });

  function replaceEnv(node, value) {
    if (position > node.start) {
      throw new Error('envify replacer tried to go backwards')
    }
    buffer += source.substring(position, node.start)
    buffer += JSON.stringify(value)
    position = node.end
  }

  if (position === 0) {
    buffer = source
  } else {
    buffer += source.substring(position)
  }

  return buffer;
}

UglifyJSMinifier.prototype.processFilesForBundle = function (files, options) {
  var mode = options.minifyMode;

  // don't minify anything for development
  if (mode === 'development') {
    files.forEach(function (file) {

      // strip env vars
      let data = file.getContentsAsString();
      if (!/\.min\.js$/.test(file.getPathInBundle())) {

        if (processEnvPattern.test(data)) {
          let envs = [process.env];
          let purge = envs.some(function(env) {
            return env._ && env._.indexOf('purge') !== -1
          });

          data = replaceEnv(data, envs, purge)
        }
      }

      file.addJavaScript({
        data,
        sourceMap: file.getSourceMap(),
        path: file.getPathInBundle()
      });
    });
    return;
  }

  // XXX figure out why I can't compress this ARGH
  var minifyOptions = {
    fromString: true,
    // spidermonkey: false,
    warnings: true,
    // mangle: true,
    compress: {
      // warnings: true,
      // dead_code: false,
      // unused: false,
      // drop_console: false,
      // conditionals: false,
      // booleans: false,
      // if_return: false,
      // join_vars: false,
    },
  };

  var allJs = '';
  files.forEach(function (file) {
    // Don't reminify *.min.js.
    if (/\.min\.js$/.test(file.getPathInBundle())) {
      allJs += file.getContentsAsString();
    } else {
      let fileContent = file.getContentsAsString();

      if (processEnvPattern.test(fileContent)) {
        let envs = [process.env];
        let purge = envs.some(function(env) {
          return env._ && env._.indexOf('purge') !== -1
        });

        fileContent = replaceEnv(fileContent, envs, purge)
      }

      allJs += UglifyJSMinify(fileContent, minifyOptions).code;
    }
    allJs += '\n\n';
    Plugin.nudge();
  });

  if (files.length) {
    files[0].addJavaScript({ data: allJs });
  }
};
