"use strict";

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _navLink = require("./nav.link");

var _navLink2 = _interopRequireDefault(_navLink);

var _navCss = require("./nav.css");

var _navCss2 = _interopRequireDefault(_navCss);

var NavLayout = (function (_React$Component) {
  _inherits(NavLayout, _React$Component);

  function NavLayout() {
    var _this = this;

    _classCallCheck(this, NavLayout);

    _React$Component.apply(this, arguments);

    this.layoutClasses = function () {
      var classes = ["background--dark-primary", "one-whole", "floating", "soft-half", "locked-left", "locked-bottom", "hard-sides@lap-and-up", "soft-half-top@lap-and-up"];

      if (_this.props.classes) {
        classes.concat(_this.props.classes);
      } else {
        classes.push(_navCss2["default"]["nav-bar"]);
      }

      return classes.join(" ");
    };
  }

  NavLayout.prototype.render = function render() {
    var _props = this.props;
    var handleAction = _props.handleAction;
    var back = _props.back;

    return _react2["default"].createElement(
      "section",
      { className: this.props.theme || this.layoutClasses() },
      this.props.links.map(function (item, i) {
        return _react2["default"].createElement(_navLink2["default"], {
          navItem: item,
          key: i,
          handleAction: handleAction
        });
      })
    );
  };

  return NavLayout;
})(_react2["default"].Component);

exports["default"] = NavLayout;
module.exports = exports["default"];