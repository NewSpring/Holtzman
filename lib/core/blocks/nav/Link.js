"use strict";

exports.__esModule = true;
exports["default"] = undefined;

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _class, _temp2;

var _react = require("react");

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _routing = require("../../store/routing");

var _nav = {
  "nav-bar": "nav__nav-bar___vz8uD",
  "locked": "nav__locked___FoUqI"
};

var _nav2 = _interopRequireDefault(_nav);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var NavLink = (_temp2 = _class = function (_Component) {
  (0, _inherits3["default"])(NavLink, _Component);

  function NavLink() {
    var _temp, _this, _ret;

    (0, _classCallCheck3["default"])(this, NavLink);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3["default"])(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.linkClasses = function () {
      var navItem = _this.props.navItem;


      var classes = ["text-light-primary", "floating__item", "soft-sides@handheld", "soft-half-ends@lap-and-up", "one-whole@lap-and-up", "plain"];

      if (navItem.isActive && navItem.isActive(_this.props)) {
        classes.push("text-brand");
      }

      return classes.join(" ");
    }, _this.handleAction = function (e) {
      e.preventDefault();
      var navItem = _this.props.navItem;


      _this.props.reset();

      if (navItem.action && typeof navItem.action === "function") {

        _this.props.handleAction(navItem.action);
        return;
      }

      if (navItem.link && navItem.link != window.location.pathname) {
        var navigate = function navigate() {
          return _routing.routeActions.push(navItem.link);
        };

        _this.props.handleAction(navigate);
      }
    }, _temp), (0, _possibleConstructorReturn3["default"])(_this, _ret);
  }

  NavLink.prototype.render = function render() {
    var iconClasses = this.props.navItem.icon + " display-block";
    var navItem = this.props.navItem;


    var itemStyle = {};
    if (Meteor.isCordova) {
      itemStyle = {
        marginTop: "-3px"
      };
    }
    return React.createElement(
      "button",
      {
        className: this.linkClasses(),
        onClick: this.handleAction,
        style: { minHeight: "40px" }
      },
      React.createElement(
        "div",
        { className: "floating " + _nav2["default"]["locked"] },
        React.createElement(
          "div",
          { className: "floating__item" },
          React.createElement("i", { className: iconClasses, style: itemStyle }),
          function () {
            if (navItem.label) {
              return React.createElement(
                "h7",
                { className: "display-block" },
                React.createElement(
                  "small",
                  { className: "text-center" },
                  navItem.label
                )
              );
            }
          }()
        )
      )
    );
  };

  return NavLink;
}(_react.Component), _class.propTypes = {
  navItem: _react.PropTypes.object.isRequired
}, _temp2);
exports["default"] = NavLink;
module.exports = exports['default'];