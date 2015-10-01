

Package.describe({
  "name": "newspring:apollos-core",
  "version": "0.1.25",
  "summary": "The main Apollos namespace and utilities for all apollos packages.",
  "git": "https://github.com/NewSpring/newspring-core.git"
});


Package.onUse(function(api) {


  api.versionsFrom("1.2.0.2");
  api.use('fourseven:scss@3.2.0');
  api.use('coffeescript@1.0.9');
  api.use("jquery", "client");
  api.use("standard-minifiers@1.0.0");
  api.use("meteor-base@1.0.1");
  api.use("mobile-experience@1.0.1");
  api.use("blaze-html-templates@1.0.1");
  api.use("session@1.1.1");
  api.use("tracker@1.0.8");
  api.use("reload@1.1.4");
  api.use("mongo@1.1.1");
  api.use("http@1.1.0");
  api.use("reactive-var@1.0.5");
  api.use("accounts-password@1.1.1");
  api.use("cfs:http-methods@0.0.28");
  api.use("bjwiley2:server-watch@0.0.7");
  api.use("aldeed:collection2@2.5.0");
  api.use("meteorhacks:flow-router@1.19.0");
  api.use("meteorhacks:flow-layout@1.4.2", "client");
  api.use("velocityjs:velocityjs@1.2.1", "client");
  api.use("raix:handlebar-helpers@0.2.4", "client");
  api.use("arillo:flow-router-helpers@0.4.5", "client");
  api.use("bjwiley2:request-data@0.0.3", "server");
  api.use("momentjs:moment@2.10.6");
  api.use("gilbertwat:moment-recur@1.0.4");

  api.addFiles("lib/lib/_vars.js");
  api.addFiles("lib/lib/debug.coffee");
  api.addFiles("lib/lib/regex.coffee");
  api.addFiles("lib/lib/utilities.coffee");
  api.addFiles("lib/collections/_helpers.coffee");
  api.addFiles("lib/collections/campuses.coffee");
  api.addFiles("lib/collections/geoJSON.coffee");
  api.addFiles("lib/collections/group.coffee");
  api.addFiles("lib/collections/groupLocation.coffee");
  api.addFiles("lib/collections/groupMember.coffee");
  api.addFiles("lib/collections/groupTypes.coffee");
  api.addFiles("lib/collections/location.coffee");
  api.addFiles("lib/collections/people.coffee");
  api.addFiles("lib/collections/queuedApiRequest.coffee");
  api.addFiles("lib/collections/status.coffee");
  api.addFiles("lib/collections/user.coffee");
  api.addFiles("lib/routes/lib/api.coffee");
  api.addFiles("lib/routes/lib/states.coffee");
  api.addFiles("lib/accounts.coffee");
  api.addFiles("lib/apollos.coffee");
  api.addFiles("lib/formatters.coffee");


  api.addFiles("client/lib/components/lib/_lookup.js", "client");
  api.addFiles("client/lib/components/lib/helpers.coffee", "client");
  api.addFiles("client/lib/components/_vars.js", "client");
  api.addFiles("client/lib/components/base.coffee", "client");
  api.addFiles("client/lib/components/component.coffee", "client");
  api.addFiles("client/lib/apollos.coffee", "client");
  api.addFiles("client/helpers/dependency-fix.coffee", "client");
  api.addFiles("client/helpers/isMobile.coffee", "client");
  api.addFiles("client/helpers/media-query.coffee", "client");
  api.addFiles("client/helpers/pathForState.coffee", "client");
  api.addFiles("client/helpers/scroll-fix.coffee", "client");
  api.addFiles("client/stylesheets/master.scss", "client");
  api.addFiles("client/svg/account-circle.html", "client");
  api.addFiles("client/svg/bank-icon.html", "client");
  api.addFiles("client/svg/drive-fusiontable.html", "client");
  api.addFiles("client/svg/event.html", "client");
  api.addFiles("client/svg/give-icon.html", "client");
  api.addFiles("client/templates/cards/navigation/apollos.nav.fixed.html", "client");
  api.addFiles("client/templates/cards/navigation/_vars.coffee", "client");
  api.addFiles("client/templates/cards/navigation/apollos.nav.fixed.coffee", "client");
  api.addFiles("client/templates/cards/on-board/components/profile.forgot-password.html", "client");
  api.addFiles("client/templates/cards/on-board/components/profile.reset-password.html", "client");
  api.addFiles("client/templates/cards/on-board/components/profile.signin.html", "client");
  api.addFiles("client/templates/cards/on-board/components/_vars.js", "client");
  api.addFiles("client/templates/cards/on-board/components/profile.forgot-password.coffee", "client");
  api.addFiles("client/templates/cards/on-board/components/profile.reset-password.coffee", "client");
  api.addFiles("client/templates/cards/on-board/components/profile.signin.coffee", "client");
  api.addFiles("client/templates/cards/on-board/apollos.profile.onboard.html", "client");
  api.addFiles("client/templates/cards/on-board/_vars.coffee", "client");
  api.addFiles("client/templates/cards/on-board/apollos.profile.onBoard.coffee", "client");
  api.addFiles("client/templates/components/controls/calendar.html", "client");
  api.addFiles("client/templates/components/controls/loading.html", "client");
  api.addFiles("client/templates/components/controls/number-keyboard.html", "client");
  api.addFiles("client/templates/components/controls/progress.html", "client");
  api.addFiles("client/templates/components/controls/spinner.html", "client");
  api.addFiles("client/templates/components/controls/toggle.html", "client");
  api.addFiles("client/templates/components/controls/_vars.coffee", "client");
  api.addFiles("client/templates/components/controls/calendar.coffee", "client");
  api.addFiles("client/templates/components/controls/number-keyboard.coffee", "client");
  api.addFiles("client/templates/components/controls/progress.coffee", "client");
  api.addFiles("client/templates/components/controls/toggle.coffee", "client");
  api.addFiles("client/templates/components/forms/input/credit-card.html", "client");
  api.addFiles("client/templates/components/forms/input/expiry.html", "client");
  api.addFiles("client/templates/components/forms/input/input.html", "client");
  api.addFiles("client/templates/components/forms/input/_core.coffee", "client");
  api.addFiles("client/templates/components/forms/input/_number.coffee", "client");
  api.addFiles("client/templates/components/forms/input/credit-card.coffee", "client");
  api.addFiles("client/templates/components/forms/input/currency.coffee", "client");
  api.addFiles("client/templates/components/forms/input/date.coffee", "client");
  api.addFiles("client/templates/components/forms/input/expiry.coffee", "client");
  api.addFiles("client/templates/components/forms/checkbox.html", "client");
  api.addFiles("client/templates/components/forms/form.html", "client");
  api.addFiles("client/templates/components/forms/select.html", "client");
  api.addFiles("client/templates/components/forms/_vars.coffee", "client");
  api.addFiles("client/templates/components/forms/checkbox.coffee", "client");
  api.addFiles("client/templates/components/forms/form.coffee", "client");
  api.addFiles("client/templates/components/forms/select.coffee", "client");
  api.addFiles("client/templates/components/_menu.html", "client");
  api.addFiles("client/templates/components/menu-item.html", "client");
  api.addFiles("client/templates/components/modal.html", "client");
  api.addFiles("client/templates/components/storyAd.html", "client");
  api.addFiles("client/templates/components/waitForSubscriptions.html", "client");
  api.addFiles("client/templates/components/_menu.coffee", "client");
  api.addFiles("client/templates/components/menu-item.coffee", "client");
  api.addFiles("client/templates/components/modal.coffee", "client");
  api.addFiles("client/templates/components/storyAd.coffee", "client");
  api.addFiles("client/templates/components/waitForSubscriptions.coffee", "client");
  api.addFiles("client/templates/layouts/fixed-nav.html", "client");
  api.addFiles("client/identitySubscriptions.coffee", "client");


  api.addFiles("lib/routes/server/_vars.coffee", "server");
  api.addFiles("lib/routes/server/api.coffee", "server");
  api.addFiles("lib/routes/server/main.coffee", "server");
  api.addFiles("server/lib/_entityHelpers.coffee", "server");
  api.addFiles("server/lib/campus.coffee", "server");
  api.addFiles("server/lib/group.coffee", "server");
  api.addFiles("server/lib/groupLocation.coffee", "server");
  api.addFiles("server/lib/groupMember.coffee", "server");
  api.addFiles("server/lib/groupType.coffee", "server");
  api.addFiles("server/lib/location.coffee", "server");
  api.addFiles("server/lib/observe.coffee", "server");
  api.addFiles("server/lib/person.coffee", "server");
  api.addFiles("server/lib/translate.coffee", "server");
  api.addFiles("server/lib/user.coffee", "server");
  api.addFiles("server/publications/definedValues.coffee", "server");


  api.addFiles("shared/dateHelpers.coffee");
  api.addFiles("shared/peopleHelpers.coffee");


  api.export("Apollos");
  api.export("HTTP", "server");
  api.export("FlowRouter");
});
