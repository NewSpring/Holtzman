"use strict";

exports.__esModule = true;
exports.Routes = undefined;

var _global = require("../blocks/global");

var _global2 = _interopRequireDefault(_global);

var _util = require("./util");

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/*

  In order to coexist with newspring.cc while we migrate to
  Apollos driven sites, we take all unknown traffic and send
  it to newspring.cc as a just in case. This lets us share navigation,
  click links that are relative, and 404.

*/
var NotFound = [{
  path: "*",
  onEnter: function onEnter(nextState, replaceState) {
    var link = "" + nextState.location.pathname + nextState.location.search + nextState.location.hash;

    if (Meteor.isCordova) {
      window.open("//newspring.cc" + link);
      return;
    }

    if (Meteor.isClient) {
      // stay at current route while we wait on the browser
      var current = [].concat(nextState.location.previous).pop();
      if (current) {
        replaceState(null, current, nextState.location.search);
      }

      // leave when the browser will let you
      window.location = "https://newspring.cc" + link;
      return;
    }

    // replaceState(null, `//newspring.cc${link}`)
  }
}];

var Routes = {
  childRoutes: [].concat(_util2["default"].Routes, NotFound)
};

exports.

// combined export of app routes
Routes = Routes;