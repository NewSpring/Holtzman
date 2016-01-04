"use strict";

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouter = require("react-router");

var _navCss = require("./nav.css");

var _navCss2 = _interopRequireDefault(_navCss);

var NavLink = (function (_Component) {
  _inherits(NavLink, _Component);

  function NavLink() {
    var _this = this;

    _classCallCheck(this, NavLink);

    _Component.apply(this, arguments);

    this.handleAction = function (e) {
      var navItem = _this.props.navItem;

      if (navItem.action && typeof navItem.action === "function") {
        e.preventDefault();
        _this.props.handleAction(navItem.action);
      }
    };
  }

  NavLink.prototype.linkClasses = function linkClasses(link) {
    var classes = ["floating__item", "text-light-primary", "soft-sides@handheld", "soft-half-ends@lap-and-up", "one-whole@lap-and-up", "plain"];
    return classes.join(" ");
  };

  NavLink.prototype.render = function render() {
    var iconClasses = this.props.navItem.icon + " display-block";
    var navItem = this.props.navItem;

    var Wrapper = _reactRouter.Link;

    if (navItem.link === "/") {
      Wrapper = _reactRouter.IndexLink;
    }

    if (!navItem.link) {
      Wrapper = (function (_Component2) {
        _inherits(ALink, _Component2);

        function ALink() {
          _classCallCheck(this, ALink);

          _Component2.apply(this, arguments);
        }

        ALink.prototype.render = function render() {
          return React.createElement(
            "a",
            _extends({ href: "#" }, this.props),
            this.props.children
          );
        };

        return ALink;
      })(_react.Component);
    }

    return React.createElement(
      Wrapper,
      {
        to: navItem.link,
        className: this.linkClasses(navItem.link),
        onClick: this.handleAction,
        activeClassName: "text-brand",
        style: { minHeight: "40px" }
      },
      React.createElement(
        "div",
        { className: "floating " + _navCss2["default"]["locked"] },
        React.createElement(
          "div",
          { className: "floating__item" },
          React.createElement("i", { className: iconClasses }),
          (function () {
            if (navItem.label) {
              return React.createElement(
                "h7",
                null,
                React.createElement(
                  "small",
                  { className: "text-center" },
                  navItem.label
                )
              );
            }
          })()
        )
      )
    );
  };

  _createClass(NavLink, null, [{
    key: "propTypes",
    value: {
      navItem: _react.PropTypes.object.isRequired
    },
    enumerable: true
  }]);

  return NavLink;
})(_react.Component);

exports["default"] = NavLink;
module.exports = exports["default"];