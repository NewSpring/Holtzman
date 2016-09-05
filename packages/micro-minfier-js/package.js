Package.describe({
  name: 'micro-minifier-js',
  version: '1.0.0',
  summary: 'A micro javascript minifier used with Meteor apps for the smallest bundle',
  documentation: 'README.md'
});

Package.registerBuildPlugin({
  name: "microMinify",
  use: [
    'minifier-js', 'ecmascript'
  ],
  sources: [
    'plugin/minify-js.js'
  ],
  npmDependencies: {
    'acorn': '3.1.0'
  }
});

Package.onUse(function(api) {
  api.use('isobuild:minifier-plugin@1.0.0');
});

Package.onTest(function(api) {
});
