"use strict";

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var SignOut = (function (_Component) {
  _inherits(SignOut, _Component);

  function SignOut() {
    _classCallCheck(this, SignOut);

    _Component.apply(this, arguments);
  }

  SignOut.prototype.render = function render() {
    return React.createElement(
      "div",
      null,
      React.createElement(
        "div",
        { className: "push-double" },
        React.createElement(
          "h4",
          { className: "text-center" },
          "Sign out of your NewSpring profile"
        )
      ),
      React.createElement(
        "div",
        { className: "one-whole text-center" },
        React.createElement(
          "button",
          { className: "btn", onClick: this.props.signout },
          "Sign Out"
        )
      )
    );
  };

  return SignOut;
})(_react.Component);

exports["default"] = SignOut;
module.exports = exports["default"];