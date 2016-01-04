"use strict";

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _give = require("./give");

var _give2 = _interopRequireDefault(_give);

var _coreClientReducers = require("../../../core/client/reducers");

exports["default"] = _coreClientReducers.addReducer({
  give: _give2["default"]
});
module.exports = exports["default"];