"use strict";

exports.__esModule = true;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var Left = (function (_Component) {
  _inherits(Left, _Component);

  function Left() {
    var _this = this;

    _classCallCheck(this, Left);

    _Component.apply(this, arguments);

    this.layoutClasses = function () {
      var classes = ["panel__item--left", "hard", "flush"];

      if (_this.props.scroll) {
        classes.push("scrollable");
      }

      if (_this.props.width) {
        classes.push(_this.props.width);
      } else {
        classes.push("seven-twelfths@lap-and-up");
      }

      if (_this.props.background) {
        classes.push("background--fill");
      }

      if (_this.props.classes) {
        classes = classes.concat(_this.props.classes);
      }

      return classes.join(" ");
    };

    this.styles = function () {
      if (_this.props.background) {
        return {
          backgroundImage: "url($this.props.image)"
        };
      }

      return {};
    };
  }

  Left.prototype.render = function render() {
    return React.createElement(
      "section",
      {
        className: this.props.theme || this.layoutClasses(),
        style: this.props.styles || this.styles()
      },
      this.props.children
    );
  };

  _createClass(Left, null, [{
    key: "propTypes",
    value: {
      classes: _react.PropTypes.array,
      theme: _react.PropTypes.string,
      scroll: _react.PropTypes.bool,
      width: _react.PropTypes.string,
      background: _react.PropTypes.string,
      styles: _react.PropTypes.object
    },
    enumerable: true
  }]);

  return Left;
})(_react.Component);

exports["default"] = Left;
module.exports = exports["default"];