"use strict";

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _reactRouter = require("react-router");

var Menu = (function (_Component) {
  _inherits(Menu, _Component);

  function Menu() {
    _classCallCheck(this, Menu);

    _Component.apply(this, arguments);

    this.signout = function (e) {
      e.preventDefault();

      Meteor.logout();
    };
  }

  Menu.prototype.render = function render() {
    return React.createElement(
      "div",
      { className: "locked-ends locked-sides background--light-secondary scrollable" },
      React.createElement(
        "section",
        { className: "hard " },
        React.createElement(
          "div",
          { className: "soft text-center background--light-primary outlined--light outlined--bottom" },
          React.createElement(
            "h5",
            { className: "soft-left display-inline-block flush" },
            "Settings"
          ),
          React.createElement(
            _reactRouter.Link,
            { to: "/profile", className: "float-right h6 flush plain visuallyhidden@lap-and-up" },
            "Done"
          )
        ),
        React.createElement("div", { className: "outlined--light outlined--top one-whole push-top" }),
        React.createElement(
          "div",
          { className: "background--light-primary outlined--light outlined--bottom text-dark-secondary" },
          React.createElement(
            _reactRouter.Link,
            { to: "/profile/settings/personal-details", className: "plain text-dark-secondary" },
            React.createElement(
              "div",
              { className: "push-left soft-ends soft-right text-left outlined--light outlined--bottom" },
              React.createElement(
                "h6",
                { className: "soft-half-left flush display-inline-block" },
                "Personal Details"
              ),
              React.createElement("i", { className: "float-right icon-arrow-next" })
            )
          ),
          React.createElement(
            _reactRouter.Link,
            { to: "/profile/settings/home-address", className: "plain text-dark-secondary" },
            React.createElement(
              "div",
              { className: "push-left soft-ends soft-right text-left outlined--light outlined--bottom" },
              React.createElement(
                "h6",
                { className: "soft-half-left flush display-inline-block" },
                "My Address"
              ),
              React.createElement("i", { className: "float-right icon-arrow-next" })
            )
          ),
          React.createElement(
            _reactRouter.Link,
            { to: "/profile/settings/change-password", className: "plain text-dark-secondary" },
            React.createElement(
              "div",
              { className: "push-left soft-ends soft-right text-left" },
              React.createElement(
                "h6",
                { className: "soft-half-left flush display-inline-block" },
                "Change Password"
              ),
              React.createElement("i", { className: "float-right icon-arrow-next" })
            )
          )
        ),
        React.createElement("div", { className: "outlined--light outlined--top one-whole push-top" }),
        React.createElement(
          "div",
          { className: "background--light-primary outlined--light outlined--bottom text-dark-secondary" },
          React.createElement(
            _reactRouter.Link,
            { to: "/profile/settings/saved-accounts", className: "plain text-dark-secondary" },
            React.createElement(
              "div",
              { className: "push-left soft-ends soft-right text-left outlined--light outlined--bottom" },
              React.createElement(
                "h6",
                { className: "soft-half-left flush display-inline-block" },
                "Saved Accounts"
              ),
              React.createElement("i", { className: "float-right icon-arrow-next" })
            )
          ),
          React.createElement(
            _reactRouter.Link,
            { to: "/give/recurring", className: "plain text-dark-secondary" },
            React.createElement(
              "div",
              { className: "push-left soft-ends soft-right text-left outlined--light outlined--bottom" },
              React.createElement(
                "h6",
                { className: "soft-half-left flush display-inline-block" },
                "Recurring Gifts"
              ),
              React.createElement("i", { className: "float-right icon-arrow-next" })
            )
          ),
          React.createElement(
            _reactRouter.Link,
            { to: "/give/history", className: "plain text-dark-secondary" },
            React.createElement(
              "div",
              { className: "push-left soft-ends soft-right text-left" },
              React.createElement(
                "h6",
                { className: "soft-half-left flush display-inline-block" },
                "Giving History"
              ),
              React.createElement("i", { className: "float-right icon-arrow-next" })
            )
          )
        ),
        React.createElement("div", { className: "outlined--light outlined--top one-whole push-top" }),
        React.createElement(
          "div",
          { className: "background--light-primary outlined--light outlined--bottom text-dark-secondary" },
          React.createElement(
            "a",
            { href: "//newspring.cc/about", target: "_blank", className: "plain text-dark-secondary" },
            React.createElement(
              "div",
              { className: "push-left soft-ends soft-right text-left outlined--light outlined--bottom" },
              React.createElement(
                "h6",
                { className: "soft-half-left flush display-inline-block" },
                "About Us"
              ),
              React.createElement("i", { className: "float-right icon-arrow-next" })
            )
          ),
          React.createElement(
            _reactRouter.Link,
            { to: "/profile/settings/privacy-policy", className: "plain text-dark-secondary" },
            React.createElement(
              "div",
              { className: "push-left soft-ends soft-right text-left" },
              React.createElement(
                "h6",
                { className: "soft-half-left flush display-inline-block" },
                "Privacy Policy"
              ),
              React.createElement("i", { className: "float-right icon-arrow-next" })
            )
          )
        ),
        React.createElement(
          "div",
          { className: "one-whole ratio--landscape floating" },
          React.createElement(
            "button",
            { onClick: this.signout, className: "h6 plain text-dark-secondary floating__item" },
            "Sign Out"
          )
        )
      )
    );
  };

  return Menu;
})(_react.Component);

exports["default"] = Menu;
module.exports = exports["default"];