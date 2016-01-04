"use strict";

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _components = require("../../components");

var _lib = require("../../../lib");

var ForgotPassword = (function (_React$Component) {
  _inherits(ForgotPassword, _React$Component);

  function ForgotPassword() {
    var _this = this;

    _classCallCheck(this, ForgotPassword);

    _React$Component.apply(this, arguments);

    this.isEmail = function (value) {
      var isValid = _lib.Validate.isEmail(value);
      var noError = !_this.props.errors["email"];

      if (!isValid && noError) {

        _this.props.dispatch(onBoardActions.error({ email: {} }));
      } else if (isValid && !noError) {

        _this.props.dispatch(onBoardActions.fix("email"));
      }

      if (isValid) {
        _this.props.save({ email: value });
      }
      return isValid;
    };
  }

  ForgotPassword.prototype.render = function render() {
    var _this2 = this;

    return _react2["default"].createElement(
      _components.Forms.Form,
      {
        id: "forgot-password",
        fieldsetTheme: "flush soft-top",
        classes: ["push-double-top"]
      },
      _react2["default"].createElement(
        "legend",
        { className: "push-half-bottom" },
        "Reset Password"
      ),
      _react2["default"].createElement(
        "h6",
        { className: "push-double-bottom" },
        "confirm your email to send the reset link"
      ),
      _react2["default"].createElement(_components.Forms.Input, {
        name: "email",
        placeholder: "user@email.com",
        label: "Email",
        errorText: "Email does not exist",
        validation: this.isEmail,
        defaultValue: this.props.email
      }),
      _react2["default"].createElement(
        "div",
        null,
        _react2["default"].createElement(
          "button",
          {
            onClick: this.props.back,
            className: "btn--small btn--dark-tertiary display-inline-block"
          },
          "Back"
        ),
        (function () {
          var btnClasses = ["push-left"];
          if (Object.keys(_this2.props.errors).length) {
            btnClasses.push("btn--disabled");
          } else {
            btnClasses.push("btn");
          }

          return _react2["default"].createElement(
            "button",
            { className: btnClasses.join(" "), type: "submit" },
            "Enter"
          );
        })()
      )
    );
  };

  return ForgotPassword;
})(_react2["default"].Component);

exports["default"] = ForgotPassword;
module.exports = exports["default"];