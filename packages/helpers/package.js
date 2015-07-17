

Package.describe({
  'name': 'newspring:apollos-helpers',
  'version': '0.1.0',
  'summary': ''

});


Package.onUse(function(api) {


  api.versionsFrom('1.1.0.2');
  api.use('templating');
  api.use('newspring:apollos-namespace');
  api.use('newspring:apollos-components', 'client');
  api.use('raix:handlebar-helpers@0.2.4', 'client');
  api.use('arillo:flow-router-helpers@0.1.6', 'client');


  api.imply('newspring:apollos-router', 'client');


  api.addFiles('lib/lib/helper.js');


  api.addFiles('lib/client/isMobile.js', 'client');
  api.addFiles('lib/client/media-query.js', 'client');
  api.addFiles('lib/client/pathForState.js', 'client');
});
