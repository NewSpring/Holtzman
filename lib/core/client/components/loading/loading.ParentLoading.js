"use strict";

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _loadingSpinner = require("./loading.Spinner");

var _loadingSpinner2 = _interopRequireDefault(_loadingSpinner);

var Loading = (function (_Component) {
  _inherits(Loading, _Component);

  function Loading() {
    _classCallCheck(this, Loading);

    _Component.apply(this, arguments);
  }

  Loading.prototype.render = function render() {
    return React.createElement(_loadingSpinner2["default"], null);
  };

  return Loading;
})(_react.Component);

exports["default"] = Loading;
module.exports = exports["default"];