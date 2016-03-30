"use strict";

exports.__esModule = true;

var _react = require("react");

var _reactRouter = require("react-router");

var _reactHelmet = require("react-helmet");

var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

var _split = require("../../../core/blocks/split");

var _split2 = _interopRequireDefault(_split);

var _controls = require("../../../core/components/controls");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import { VelocityComponent } from "velocity-react"

var SettingsLink = function SettingsLink() {
  return React.createElement(
    _reactRouter.Link,
    { to: "/profile/settings", className: "text-light-primary plain soft overlay__item locked-top locked-right" },
    React.createElement("i", { className: "icon-settings h4" })
  );
};

var Layout = function Layout(_ref, context) {
  var photo = _ref.photo;
  var person = _ref.person;
  var onToggle = _ref.onToggle;
  var content = _ref.content;
  var onUpload = _ref.onUpload;
  return React.createElement(
    "div",
    null,
    React.createElement(
      _split2["default"],
      { nav: true, classes: ["background--light-primary"] },
      React.createElement(_reactHelmet2["default"], {
        title: person ? person.nickName + " " + person.lastName : "Sign In",
        titleTemplate: "%s | NewSpring Church"
      }),
      React.createElement(
        _split.Right,
        {
          mobile: true,
          classes: ["floating", "overlay--solid-dark"],
          ratioClasses: ["floating__item", "overlay__item", "one-whole", "text-center"],
          background: photo,
          blur: true,
          outsideRatio: SettingsLink
        },
        React.createElement(
          "div",
          { className: "soft one-whole" },
          React.createElement(
            "label",
            { htmlFor: "file",
              className: "background--fill ratio--square round two-fifths display-inline-block",
              style: { backgroundImage: "url(" + photo + ")", position: "relative" }
            },
            React.createElement("input", { onChange: onUpload, type: "file", className: "locked-ends locked-sides", style: { opacity: 0 } })
          ),
          React.createElement(
            "h4",
            { className: "text-light-primary soft-half-top flush-bottom" },
            person.nickName,
            " ",
            person.lastName
          ),
          React.createElement(
            "p",
            { className: "text-light-primary flush" },
            React.createElement(
              "em",
              null,
              person.home.city
            )
          )
        )
      )
    ),
    React.createElement(
      _split.Left,
      { scroll: true },
      React.createElement(_controls.Toggle, { items: ["Likes", "Following"], toggle: onToggle }),
      React.createElement(
        "div",
        null,
        content
      )
    )
  );
};

Layout.contextTypes = { shouldAnimate: _react.PropTypes.bool };

exports["default"] = Layout;
module.exports = exports['default'];