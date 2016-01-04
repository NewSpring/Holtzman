"use strict";

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var Loading = (function (_Component) {
  _inherits(Loading, _Component);

  function Loading() {
    var _this = this;

    _classCallCheck(this, Loading);

    _Component.apply(this, arguments);

    this.styles = function () {

      var defaults = {
        position: "fixed",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999
      };

      return _extends({}, defaults, _this.props.styles);
    };

    this.getClasses = function () {
      var classes = [];

      if (_this.props.classes) {
        classes = [].concat(classes, _this.props.classes);
      }

      return classes.join(" ");
    };
  }

  Loading.prototype.render = function render() {
    return React.createElement(
      "div",
      {
        className: this.props.theme || this.getClasses(),
        style: this.styles() },
      this.props.children
    );
  };

  return Loading;
})(_react.Component);

exports["default"] = Loading;
module.exports = exports["default"];