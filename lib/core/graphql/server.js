"use strict";

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _future = require("fibers/future");

var _future2 = _interopRequireDefault(_future);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

Meteor.methods({
  'graphql.transport': function graphqlTransport(query, variables, operationName) {
    check(query, String);
    check(variables, Match.OneOf(Object, undefined, null));
    check(operationName, Match.OneOf(String, undefined, null));

    variables = (0, _extends3["default"])({}, variables, {
      mongoId: this.userId
    });

    var payload = { query: query, variables: variables, operationName: operationName };
    var f = new _future2["default"]();

    fetch(Meteor.settings.heighliner, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': "basic " + new Buffer("apollos:" + Meteor.settings.rock.token).toString("base64")
      },
      body: JSON.stringify(payload)
    }).then(function (response) {
      return response.json();
    }).then(function (data) {
      f["return"](data);
    })["catch"](function (error) {
      console.error("@@GRAPHQL_ERROR", error, payload);
      f["throw"](error);
    });

    return f.wait();
  }
});