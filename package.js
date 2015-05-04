

Package.describe({
  'name': 'newspring:apollos-core',
  'version': '0.1.12',
  'summary': 'The main Apollos namespace and utilities for all apollos packages.',
  'git': 'https://github.com/NewSpring/newspring-core.git'
});


Package.onUse(function(api) {


  api.versionsFrom('1.0.3.1');
  api.use('meteor-platform@=1.2.2');
  api.use('http@=1.1.0');
  api.use('reactive-var@=1.0.5');
  api.use('accounts-password@=1.1.1');
  api.use('cfs:http-methods@=0.0.28');
  api.use('bjwiley2:server-watch@=0.0.6');
  api.use('aldeed:collection2@=2.3.3');
  api.use('newspring:components@=0.1.12', 'client');


  api.addFiles('lib/lib/lib/_vars.js');
  api.addFiles('lib/lib/lib/debug.js');
  api.addFiles('lib/lib/lib/regex.js');
  api.addFiles('lib/lib/__abstract/campuses.js');
  api.addFiles('lib/lib/__abstract/definedValues.js');
  api.addFiles('lib/lib/__abstract/groups.js');
  api.addFiles('lib/lib/__abstract/locations.js');
  api.addFiles('lib/lib/__abstract/queuedApiRequest.js');
  api.addFiles('lib/lib/collections/_helpers.js');
  api.addFiles('lib/lib/collections/geoJSON.js');
  api.addFiles('lib/lib/collections/people.js');
  api.addFiles('lib/lib/collections/queuedApiRequest.js');
  api.addFiles('lib/lib/collections/user.js');
  api.addFiles('lib/lib/routes/lib/api.js');
  api.addFiles('lib/lib/utlities/utilities.js');
  api.addFiles('lib/lib/utlities/validationHelpers.js');
  api.addFiles('lib/lib/accounts.js');
  api.addFiles('lib/lib/apollos.js');


  api.addFiles('lib/client/lib/apollos.js', 'client');
  api.addFiles('lib/client/templates/components/controls/toggle.html', 'client');
  api.addFiles('lib/client/templates/components/controls/_vars.js', 'client');
  api.addFiles('lib/client/templates/components/controls/toggle.js', 'client');
  api.addFiles('lib/client/templates/components/forms/checkbox.html', 'client');
  api.addFiles('lib/client/templates/components/forms/inputs.html', 'client');
  api.addFiles('lib/client/templates/components/forms/_vars.js', 'client');
  api.addFiles('lib/client/templates/components/forms/checkbox.js', 'client');
  api.addFiles('lib/client/templates/components/forms/input.js', 'client');
  api.addFiles('lib/client/templates/objects/nav/nav.html', 'client');
  api.addFiles('lib/client/templates/objects/nav/nav.js', 'client');
  api.addFiles('lib/client/templates/objects/signup/forgot-password.html', 'client');
  api.addFiles('lib/client/templates/objects/signup/onboard.html', 'client');
  api.addFiles('lib/client/templates/objects/signup/reset-password.html', 'client');
  api.addFiles('lib/client/templates/objects/signup/signin.html', 'client');
  api.addFiles('lib/client/templates/objects/signup/test.html', 'client');
  api.addFiles('lib/client/templates/objects/signup/forgot-password.js', 'client');
  api.addFiles('lib/client/templates/objects/signup/onboard.js', 'client');
  api.addFiles('lib/client/templates/objects/signup/reset-password.js', 'client');
  api.addFiles('lib/client/templates/objects/signup/signin.js', 'client');
  api.addFiles('lib/client/templates/objects/signup/test.js', 'client');


  api.addFiles('lib/lib/routes/server/_vars.js', 'server');
  api.addFiles('lib/lib/routes/server/api.js', 'server');
  api.addFiles('lib/server/lib/_entityHelpers.js', 'server');
  api.addFiles('lib/server/lib/observe.js', 'server');
  api.addFiles('lib/server/lib/person.js', 'server');
  api.addFiles('lib/server/lib/translate.js', 'server');
  api.addFiles('lib/server/lib/user.js', 'server');
  api.addFiles('lib/server/lib/worker.js', 'server');


  api.export('Rock');
  api.export('Apollos');
  api.export('HTTP', 'server');
});

