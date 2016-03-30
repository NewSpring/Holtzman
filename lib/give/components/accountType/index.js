"use strict";

exports.__esModule = true;

var _react = require("react");

var _icons = require("../icons");

var AccountType = function AccountType(_ref) {
  var width = _ref.width;
  var height = _ref.height;
  var type = _ref.type;


  var bottom = Number(height) / 10;
  var style = {
    marginBottom: "-" + bottom + "px",
    marginRight: "-6px",
    marginLeft: "6px"
  };

  if (type === "American Express") {
    type = "AmEx";
  }

  if (type === "ACH") {
    type = "Bank";
  }

  width || (width = 54);
  height || (height = 40);

  var Icon = _icons.Accounts[type];
  return React.createElement(Icon, { width: width, height: height, style: style });
};

AccountType.propTypes = {
  width: _react.PropTypes.string,
  height: _react.PropTypes.string,
  type: _react.PropTypes.string.isRequired
};

AccountType.defaultProps = {
  type: "Bank"
};

exports["default"] = AccountType;
module.exports = exports['default'];