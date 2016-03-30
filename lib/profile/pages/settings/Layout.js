"use strict";

exports.__esModule = true;

var _react = require("react");

var _reactRouter = require("react-router");

var _split = require("../../../core/blocks/split");

var _split2 = _interopRequireDefault(_split);

var _meta = require("../../../core/components/meta");

var _meta2 = _interopRequireDefault(_meta);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import { VelocityComponent } from "velocity-react"

var Close = function Close() {
  return React.createElement(
    _reactRouter.Link,
    { to: "/profile", className: "text-light-primary plain soft overlay__item locked-top locked-right" },
    React.createElement("i", { className: "icon-close h4" })
  );
};

var Layout = function Layout(_ref, context) {
  var photo = _ref.photo;
  var person = _ref.person;
  var children = _ref.children;
  var mobile = _ref.mobile;
  var onUpload = _ref.onUpload;
  return React.createElement(
    "div",
    null,
    React.createElement(_meta2["default"], {
      title: person ? person.nickName + " " + person.lastName : "Profile",
      image: photo ? photo : null
    }),
    React.createElement(
      _split2["default"],
      { nav: true, classes: mobile ? ["background--light-secondary"] : ["background--light-primary"] },
      React.createElement(
        _split.Right,
        {
          mobile: mobile,
          classes: ["floating", "overlay--solid-dark"],
          ratioClasses: ["floating__item", "overlay__item", "one-whole", "text-center"],
          background: photo,
          blur: true
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
            person.nickName || person.firstName,
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
      { scroll: true, classes: !mobile ? ["locked-ends@handheld", "locked-sides@handheld", "scrollable", "background--light-primary"] : ["background--light-primary"] },
      children
    )
  );
};

Layout.propTypes = {
  photo: _react.PropTypes.string,
  person: _react.PropTypes.object
};

Layout.contextTypes = { shouldAnimate: _react.PropTypes.bool };

exports["default"] = Layout;
module.exports = exports['default'];