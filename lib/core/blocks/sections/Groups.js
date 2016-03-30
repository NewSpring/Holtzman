"use strict";

exports.__esModule = true;

var _Item = require("./Item");

var _Item2 = _interopRequireDefault(_Item);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Groups = function Groups(_ref) {
  var items = _ref.items;
  var hide = _ref.hide;
  return React.createElement(
    "section",
    { className: "hard-sides soft-half-ends" },
    items.map(function (section, i) {
      return React.createElement(_Item2["default"], { sections: section, key: i, hide: hide });
    })
  );
};

exports["default"] = Groups;
module.exports = exports['default'];