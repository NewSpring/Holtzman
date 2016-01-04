"use strict";

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var Right = (function (_Component) {
  _inherits(Right, _Component);

  function Right() {
    var _this = this;

    _classCallCheck(this, Right);

    _Component.apply(this, arguments);

    this.layoutClasses = function () {
      var classes = ["panel__item--right", "hard", "flush"];

      if (_this.props.mobile) {
        classes.push("ratio--landscape@handheld");
      } else {
        classes.push("visuallyhidden@handheld");
      }

      if (_this.props.scroll) {
        classes.push("scrollable");
      }

      if (_this.props.width) {
        classes.push(_this.props.width);
      } else {
        classes.push("five-twelfths@lap-and-up");
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
          backgroundImage: "url(" + _this.props.background + ")"
        };
      }

      return {};
    };

    this.ratioClasses = function () {
      var classes = ["ratio__item"];

      if (_this.props.ratioClasses) {
        classes = classes.concat(_this.props.ratioClasses);
      }

      return classes.join(" ");
    };
  }

  Right.prototype.render = function render() {
    var _this2 = this;

    var blur = this.props.blur;

    return React.createElement(
      "section",
      {
        className: this.props.theme || this.layoutClasses(),
        style: this.props.styles || this.styles()
      },
      React.createElement(
        "div",
        { className: this.props.ratioTheme || this.ratioClasses() },
        this.props.children
      ),
      (function () {
        if (_this2.props.outsideRatio) {
          return _this2.props.outsideRatio();
        }
      })(),
      (function () {
        var styles = _this2.styles();

        styles = _extends({}, styles, {
          WebkitFilter: "blur(10px)",
          filter: "blur(10px)"
        });

        if (blur) {
          return React.createElement("div", { className: "locked-sides locked-ends background--fill", style: styles });
        }
      })()
    );
  };

  _createClass(Right, null, [{
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

  return Right;
})(_react.Component);

exports["default"] = Right;
module.exports = exports["default"];