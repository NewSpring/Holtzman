"use strict";

exports.__esModule = true;

var _coreClientActions = require("../../../../core/client/actions");

var _clientMethods = require("../../../client/methods");

var signup = function signup(store, next, action) {
  var dispatch = store.dispatch;
  var getState = store.getState;

  var state = getState();
  var data = state.onBoard.data;

  // submitting form
  if (state.onBoard.state === "default" && action.state === "submit" && data.email && data.password && data.firstName && data.lastName && data.terms) {
    var _ret = (function () {

      // trigger loading screen
      dispatch(_coreClientActions.onBoard.loading());

      var failure = function failure(err) {
        dispatch(_coreClientActions.onBoard.error({
          unauthorized: {
            message: "Incorrect email and password combination"
          }
        }));
        dispatch(_coreClientActions.onBoard.authorize(false));
        dispatch(_coreClientActions.onBoard.fail());
      };

      _clientMethods.auth.signup(data, function (err, success) {

        if (err) {
          failure(err);return;
        }
        Meteor.loginWithPassword(data.email, data.password, function (err, id) {
          var loggedIn = function loggedIn(err, account) {

            dispatch(_coreClientActions.onBoard.success());
            dispatch(_coreClientActions.onBoard.authorize(true));
          };

          loggedIn();

          action.state = "default";
          return next(action);
        });
      });

      return {
        v: function cancel() {}
      };
    })();

    if (typeof _ret === "object") return _ret.v;
  }

  return next(action);
};

exports["default"] = signup;
module.exports = exports["default"];