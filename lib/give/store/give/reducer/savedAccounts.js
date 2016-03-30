"use strict";

exports.__esModule = true;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var savedAccount = function savedAccount(state, action) {

  if (!action.savedAccount && action.savedAccount != "clear") {
    return state;
  }

  if (action.savedAccount === "clear") {
    action.savedAccount = {
      id: null, // Id of saved account to charge
      payment: {
        accountNumber: null, // accountNumber to be shown (full, not just last four)
        paymentType: null },
      // type of card
      name: null };
  }

  // name of card
  return (0, _extends3["default"])({}, state, {
    savedAccount: action.savedAccount
  });
};

exports["default"] = {
  savedAccount: savedAccount
};
module.exports = exports['default'];