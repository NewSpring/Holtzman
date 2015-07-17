

Package.describe({
  'name': 'newspring:apollos-layout',
  'version': '0.1.0',
  'summary': ''

});


Package.onUse(function(api) {


  api.versionsFrom('1.1.0.2');
  api.use('newspring:apollos-namespace');
  api.use('meteorhacks:flow-layout@1.4.2', 'client');


  api.addFiles('lib/client/_var.js', 'client');
});

