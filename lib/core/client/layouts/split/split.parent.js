"use strict";

exports.__esModule = true;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _reactRedux = require("react-redux");

var _blocksNavNavOffsetCss = require("../../blocks/nav/nav.offset.css");

var _blocksNavNavOffsetCss2 = _interopRequireDefault(_blocksNavNavOffsetCss);

function map(state) {
  return {
    navigation: state.nav
  };
}

var Split = (function (_Component) {
  _inherits(Split, _Component);

  function Split() {
    var _this = this;

    _classCallCheck(this, _Split);

    _Component.apply(this, arguments);

    this.layoutClasses = function () {
      var classes = ["panel"];

      if (_this.props.classes) {
        classes.concat(_this.props.classes);
      }

      if (_this.props.navigation.visible && _this.props.nav) {
        classes.push(_blocksNavNavOffsetCss2["default"]["offset"]);
      }

      return classes.join(" ");
    };

    this.styles = function () {
      return {};
    };
  }

  Split.prototype.render = function render() {
    return React.createElement(
      "div",
      {
        className: this.props.theme || this.layoutClasses(),
        style: this.props.styles || this.styles()
      },
      this.props.children
    );
  };

  _createClass(Split, null, [{
    key: "propTypes",
    value: {
      classes: _react.PropTypes.array,
      theme: _react.PropTypes.string,
      styles: _react.PropTypes.object,
      nav: _react.PropTypes.bool
    },
    enumerable: true
  }]);

  var _Split = Split;
  Split = _reactRedux.connect(map)(Split) || Split;
  return Split;
})(_react.Component);

exports["default"] = Split;
module.exports = exports["default"];