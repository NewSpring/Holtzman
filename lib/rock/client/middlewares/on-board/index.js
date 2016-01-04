"use strict";

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _coreClientActions = require("../../../../core/client/actions");

var _clientMethods = require("../../../client/methods");

var _onBoardLogin = require("./on-board.login");

var _onBoardLogin2 = _interopRequireDefault(_onBoardLogin);

var _onBoardSignup = require("./on-board.signup");

var _onBoardSignup2 = _interopRequireDefault(_onBoardSignup);

var onboard = function onboard(store) {
  return function (next) {
    return function (action) {
      var dispatch = store.dispatch;
      var getState = store.getState;

      // restrict middleware to onboard actions
      if (action.type.indexOf("ONBOARD") != 0) {
        return next(action);
      }

      switch (action.type) {
        case "ONBOARD.SET_STATE":
          var state = getState();

          if (action.state === "submit") {
            if (state.onBoard.account) {
              return _onBoardLogin2["default"](store, next, action);
            }

            return _onBoardSignup2["default"](store, next, action);
          }

          return next(action);

          break;
        case "ONBOARD.SET_DATA":
          // don't hold everything up
          next(action);

          if (action.data.email) {
            // set state based on is email is already in system
            _clientMethods.auth.available(action.data.email, function (err, isAvailable) {
              dispatch(_coreClientActions.onBoard.setAccount(!isAvailable));
            });
          }
          break;
        default:
          return next(action);
      }
    };
  };
};

exports["default"] = onboard;
module.exports = exports["default"];