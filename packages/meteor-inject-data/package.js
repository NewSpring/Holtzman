var fs = Npm.require('fs');
var path = Npm.require('path');

Package.describe({
  "summary": "A way to inject data to the client with initial HTML",
  "version": "2.0.5",
  "git": "https://github.com/abecks/meteor-inject-data",
  "name": "staringatlights:inject-data-local"
});

Package.onUse(function (api) {
  configure(api);
  api.use('webapp');
  api.use('meteorhacks:inject-data', ['client', 'server'], { weak: true });
  api.export('InjectData', ['client', 'server']);
});

Package.onTest(function (api) {
  configure(api);
  api.use('webapp', 'server');
  api.use('tinytest', ['client', 'server']);
  api.use('http', 'server');
  api.use('random', 'server');
  api.use('meteorhacks:picker@1.0.1', 'server');

  api.addFiles([
    'tests/utils.js'
  ], ['client', 'server']);

  api.addFiles([
    'tests/client.js'
  ], 'client');

  api.addFiles([
    'tests/integration.js',
    'tests/init.js'
  ], 'server');
});

function configure(api) {
  api.versionsFrom('METEOR@0.9.3');

  api.use(['ejson', 'underscore'], ['server', 'client']);
  api.use('jquery', 'client');

  api.addFiles([
    'lib/inject.html',
  ], 'server', { isAsset: true });

  api.addFiles([
    'lib/namespace.js',
    'lib/utils.js',
  ], ['client', 'server']);

  api.addFiles([
    'lib/server.js'
  ], 'server');

  api.addFiles([
    'lib/client.js'
  ], 'client');
}
