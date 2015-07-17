

Package.describe({
  'name': 'newspring:apollos-models',
  'version': '0.1.0',
  'summary': ''

});


Package.onUse(function(api) {


  api.versionsFrom('1.1.0.2');
  api.use('newspring:apollos-namespace');
  api.use('newspring:apollos-collection-helpers');
  api.use('newspring:apollos-api', 'server');


  api.addFiles('lib/lib/campuses.js');
  api.addFiles('lib/lib/geoJSON.js');
  api.addFiles('lib/lib/group.js');
  api.addFiles('lib/lib/groupLocation.js');
  api.addFiles('lib/lib/groupMember.js');
  api.addFiles('lib/lib/location.js');
  api.addFiles('lib/lib/queuedApiRequest.js');
  api.addFiles('lib/lib/status.js');


  api.addFiles('lib/server/campus.js', 'server');
  api.addFiles('lib/server/group.js', 'server');
  api.addFiles('lib/server/groupLocation.js', 'server');
  api.addFiles('lib/server/groupMember.js', 'server');
  api.addFiles('lib/server/location.js', 'server');
});

