"use strict";

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _loadingSpinnerCss = require("./loading.spinner.css");

var _loadingSpinnerCss2 = _interopRequireDefault(_loadingSpinnerCss);

var Spinner = (function (_Component) {
  _inherits(Spinner, _Component);

  function Spinner() {
    var _this = this;

    _classCallCheck(this, Spinner);

    _Component.apply(this, arguments);

    this.getClasses = function () {
      var classes = [_loadingSpinnerCss2["default"].loader];

      if (_this.props.classes) {
        classes = classes.concat(_this.props.classes);
      }

      return classes.join(" ");
    };
  }

  Spinner.prototype.render = function render() {
    return React.createElement("div", {
      className: this.props.theme || this.getClasses(),
      style: this.props.styles || {}
    });
  };

  return Spinner;
})(_react.Component);

exports["default"] = Spinner;
module.exports = exports["default"];