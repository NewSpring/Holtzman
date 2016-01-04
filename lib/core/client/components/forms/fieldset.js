"use strict";

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var FieldSet = (function (_React$Component) {
  _inherits(FieldSet, _React$Component);

  function FieldSet() {
    var _this = this;

    _classCallCheck(this, FieldSet);

    _React$Component.apply(this, arguments);

    this.layoutClasses = function () {
      var classes = ["flush-bottom"];

      if (_this.props.classes) {
        classes = classes.concat(_this.props.classes);
      }

      return classes.join(" ");
    };
  }

  FieldSet.prototype.render = function render() {
    return _react2["default"].createElement(
      "fieldset",
      { className: this.props.theme || this.layoutClasses() },
      this.props.children
    );
  };

  return FieldSet;
})(_react2["default"].Component);

exports["default"] = FieldSet;
module.exports = exports["default"];