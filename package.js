

Package.describe({
  'name': 'newspring:apollos-core',
  'version': '0.1.25',
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
  api.use('meteorhacks:flow-router@1.9.0');
  api.use('meteorhacks:flow-layout@1.3.0', 'client');
  api.use('velocityjs:velocityjs@=1.2.1', 'client');
  api.use('raix:handlebar-helpers@0.2.4', 'client');
  api.use('arillo:flow-router-helpers@0.1.6', 'client');


  api.addFiles('lib/lib/lib/_vars.js');
  api.addFiles('lib/lib/lib/debug.js');
  api.addFiles('lib/lib/lib/regex.js');
  api.addFiles('lib/lib/lib/utilities.js');
  api.addFiles('lib/lib/__abstract/campuses.js');
  api.addFiles('lib/lib/__abstract/groups.js');
  api.addFiles('lib/lib/__abstract/locations.js');
  api.addFiles('lib/lib/collections/_helpers.js');
  api.addFiles('lib/lib/collections/geoJSON.js');
  api.addFiles('lib/lib/collections/group.js');
  api.addFiles('lib/lib/collections/groupLocation.js');
  api.addFiles('lib/lib/collections/groupMember.js');
  api.addFiles('lib/lib/collections/location.js');
  api.addFiles('lib/lib/collections/people.js');
  api.addFiles('lib/lib/collections/queuedApiRequest.js');
  api.addFiles('lib/lib/collections/user.js');
  api.addFiles('lib/lib/routes/lib/api.js');
  api.addFiles('lib/lib/routes/lib/states.js');
  api.addFiles('lib/lib/accounts.js');
  api.addFiles('lib/lib/apollos.js');


  api.addFiles('lib/client/lib/components/lib/_lookup.js', 'client');
  api.addFiles('lib/client/lib/components/lib/helpers.js', 'client');
  api.addFiles('lib/client/lib/components/_vars.js', 'client');
  api.addFiles('lib/client/lib/components/base.js', 'client');
  api.addFiles('lib/client/lib/components/component.js', 'client');
  api.addFiles('lib/client/lib/apollos.js', 'client');
  api.addFiles('lib/client/helpers/media-query.js', 'client');
  api.addFiles('lib/client/helpers/pathForState.js', 'client');
  api.addFiles('lib/client/stylesheets/keyboard.css', 'client');
  api.addFiles('lib/client/templates/cards/on-board/components/profile.forgot-password.html', 'client');
  api.addFiles('lib/client/templates/cards/on-board/components/profile.reset-password.html', 'client');
  api.addFiles('lib/client/templates/cards/on-board/components/profile.signin.html', 'client');
  api.addFiles('lib/client/templates/cards/on-board/components/_vars.js', 'client');
  api.addFiles('lib/client/templates/cards/on-board/components/profile.forgot-password.js', 'client');
  api.addFiles('lib/client/templates/cards/on-board/components/profile.reset-password.js', 'client');
  api.addFiles('lib/client/templates/cards/on-board/components/profile.signin.js', 'client');
  api.addFiles('lib/client/templates/cards/on-board/states/profile.forgot-password.html', 'client');
  api.addFiles('lib/client/templates/cards/on-board/states/profile.reset-password.html', 'client');
  api.addFiles('lib/client/templates/cards/on-board/states/profile.signin.html', 'client');
  api.addFiles('lib/client/templates/cards/on-board/apollos.profile.onboard.html', 'client');
  api.addFiles('lib/client/templates/cards/on-board/_vars.js', 'client');
  api.addFiles('lib/client/templates/cards/on-board/apollos.profile.onBoard.js', 'client');
  api.addFiles('lib/client/templates/components/controls/number-keyboard.html', 'client');
  api.addFiles('lib/client/templates/components/controls/progress.html', 'client');
  api.addFiles('lib/client/templates/components/controls/toggle.html', 'client');
  api.addFiles('lib/client/templates/components/controls/_vars.js', 'client');
  api.addFiles('lib/client/templates/components/controls/number-keyboard.js', 'client');
  api.addFiles('lib/client/templates/components/controls/progress.js', 'client');
  api.addFiles('lib/client/templates/components/controls/toggle.js', 'client');
  api.addFiles('lib/client/templates/components/forms/checkbox.html', 'client');
  api.addFiles('lib/client/templates/components/forms/inputs.html', 'client');
  api.addFiles('lib/client/templates/components/forms/_vars.js', 'client');
  api.addFiles('lib/client/templates/components/forms/checkbox.js', 'client');
  api.addFiles('lib/client/templates/components/forms/input.js', 'client');
  api.addFiles('lib/client/templates/objects/nav/nav.html', 'client');
  api.addFiles('lib/client/templates/objects/nav/_vars.js', 'client');
  api.addFiles('lib/client/templates/objects/nav/nav.js', 'client');


  api.addFiles('lib/lib/routes/server/_vars.js', 'server');
  api.addFiles('lib/lib/routes/server/api.js', 'server');
  api.addFiles('lib/server/lib/_entityHelpers.js', 'server');
  api.addFiles('lib/server/lib/group.js', 'server');
  api.addFiles('lib/server/lib/groupLocation.js', 'server');
  api.addFiles('lib/server/lib/groupMember.js', 'server');
  api.addFiles('lib/server/lib/location.js', 'server');
  api.addFiles('lib/server/lib/observe.js', 'server');
  api.addFiles('lib/server/lib/person.js', 'server');
  api.addFiles('lib/server/lib/translate.js', 'server');
  api.addFiles('lib/server/lib/user.js', 'server');


  api.export('Apollos');
});

