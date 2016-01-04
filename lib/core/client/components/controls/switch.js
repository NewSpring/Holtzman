"use strict";

exports.__esModule = true;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _switchCss = require("./switch.css");

var _switchCss2 = _interopRequireDefault(_switchCss);

var Swtich = (function (_Component) {
  _inherits(Swtich, _Component);

  function Swtich() {
    var _this = this;

    _classCallCheck(this, Swtich);

    _Component.apply(this, arguments);

    this.layoutClasses = function () {
      var classes = [_switchCss2["default"][".toggle-switch"]];

      if (_this.props.classes) {
        classes.concat(_this.props.classes);
      }

      return classes.join(" ");
    };
  }

  Swtich.prototype.render = function render() {

    var id = this.props.id;

    return React.createElement(
      "div",
      null,
      React.createElement("input", {
        className: this.props.theme || this.layoutClasses(),
        styles: this.props.styles || {},
        type: "checkbox",
        name: this.props.name || id || "toggle-switch",
        id: id
      }),
      React.createElement("label", { htmlFor: id })
    );
  };

  _createClass(Swtich, null, [{
    key: "propTypes",
    value: {
      id: _react.PropTypes.string.isRequired
    },
    enumerable: true
  }]);

  return Swtich;
})(_react.Component);

exports["default"] = Swtich;
module.exports = exports["default"];