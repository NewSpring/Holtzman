"use strict";

exports.__esModule = true;

var _components = require("../../../../core/components");

var _meta = require("../../../../core/components/meta");

var _meta2 = _interopRequireDefault(_meta);

var _Back = require("../Back");

var _Back2 = _interopRequireDefault(_Back);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Layout = function Layout(_ref, context) {
  var submit = _ref.submit;
  var save = _ref.save;
  var state = _ref.state;
  return React.createElement(
    "div",
    { className: "background--light-primary one-whole text-center push-double-top@lap-and-up push-double-bottom ", style: { overflow: "visible", zIndex: 1 } },
    React.createElement(_Back2["default"], null),
    React.createElement(_meta2["default"], { title: "Change your password" }),
    React.createElement(
      _components.Forms.Form,
      {
        id: "reset-password",
        classes: ["soft", "one-whole", "two-thirds@portable", "one-half@anchored", "display-inline-block"],
        submit: submit
      },
      React.createElement(
        "div",
        { className: "push-double" },
        React.createElement(
          "h4",
          { className: "text-center" },
          "Change Password"
        )
      ),
      React.createElement(_components.Forms.Input, {
        name: "current",
        label: "Current Password",
        validation: save,
        type: "password"
      }),
      React.createElement(_components.Forms.Input, {
        name: "newP",
        label: "New Password",
        validation: save,
        errorText: "New password does not match",
        type: "password"
      }),
      React.createElement(_components.Forms.Input, {
        name: "newPDup",
        label: "Repeat New Password",
        validation: save,
        errorText: "New password does not match",
        type: "password"
      }),
      function () {
        var btnClasses = [];
        var current = state.current;
        var newP = state.newP;
        var newPDup = state.newPDup;

        if (!current || !newP || !newPDup) {
          btnClasses.push("btn--disabled");
        } else {
          btnClasses.push("btn");
        }

        return React.createElement(
          "button",
          { className: btnClasses.join(" ") },
          "Enter"
        );
      }()
    )
  );
};

exports["default"] = Layout;
module.exports = exports['default'];