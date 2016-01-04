"use strict";

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _loadingParentLoading = require("./loading.ParentLoading");

var _loadingParentLoading2 = _interopRequireDefault(_loadingParentLoading);

var _loadingWindowLoading = require("./loading.WindowLoading");

var _loadingWindowLoading2 = _interopRequireDefault(_loadingWindowLoading);

var _loadingSpinner = require("./loading.Spinner");

var _loadingSpinner2 = _interopRequireDefault(_loadingSpinner);

exports.ParentLoading = _loadingParentLoading2["default"];
exports.WindowLoading = _loadingWindowLoading2["default"];
exports.Spinner = _loadingSpinner2["default"];
exports["default"] = _loadingParentLoading2["default"];