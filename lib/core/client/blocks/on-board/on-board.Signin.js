"use strict";

exports.__esModule = true;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRedux = require("react-redux");

// import { goBack } from "redux-router"

var _actions = require("../../actions");

var _components = require("../../components");

var _lib = require("../../../lib");

var SignIn = (function (_React$Component) {
  _inherits(SignIn, _React$Component);

  function SignIn() {
    var _this = this;

    _classCallCheck(this, _SignIn);

    _React$Component.apply(this, arguments);

    this.header = function () {
      return _react2["default"].createElement(
        "h4",
        { className: "text-center" },
        "Sign in or create your NewSpring profile"
      );
    };

    this.toggles = [{ label: "Sign In" }, { label: "Register" }];

    this.toggle = function (bool) {
      _this.props.dispatch(_actions.onBoard.setAccount(bool));
    };

    this.isEmail = function (value) {
      var isValid = _lib.Validate.isEmail(value);
      var noError = !_this.props.errors["email"];

      if (!isValid) {
        _this.props.dispatch(_actions.onBoard.clear("email"));
      } else {
        _this.props.save({ email: value });
      }

      return isValid;
    };

    this.savePassword = function (value) {
      var isValid = value.length ? true : false;
      var noError = !_this.props.errors["password"];

      if (!isValid) {
        _this.props.dispatch(_actions.onBoard.clear("password"));
      } else {
        _this.props.save({ password: value });
      }

      return isValid;
    };

    this.firstName = function (value) {
      var isValid = value.length ? true : false;
      var noError = !_this.props.errors["firstName"];

      if (!isValid) {
        _this.props.dispatch(_actions.onBoard.clear("firstName"));
      } else {
        _this.props.save({ firstName: value });
      }

      return isValid;
    };

    this.lastName = function (value) {
      var isValid = value.length ? true : false;
      var noError = !_this.props.errors["lastName"];

      if (!isValid) {
        _this.props.dispatch(_actions.onBoard.clear("lastName"));
      } else {
        _this.props.save({ lastName: value });
      }

      return isValid;
    };

    this.saveTerms = function (event) {
      _this.props.save({ terms: event.target.checked });
    };

    this.submit = function (event) {
      event.preventDefault();
      var refs = _this.refs;

      for (var input in refs) {
        var component = refs[input];

        if (component.validate) {
          component.validate();
        }
      }

      _this.props.submit();

      return;
    };
  }

  SignIn.prototype.render = function render() {
    var _this2 = this;

    return _react2["default"].createElement(
      "div",
      null,
      _react2["default"].createElement(
        "div",
        { className: "push-double" },
        this.props.header || this.header()
      ),
      _react2["default"].createElement(_components.Controls.Toggle, {
        items: this.props.toggles || this.toggles,
        toggle: this.toggle,
        state: this.props.account
      }),
      _react2["default"].createElement(
        _components.Forms.Form,
        {
          id: "onboard",
          fieldsetTheme: "flush soft-top",
          submit: this.submit
        },
        _react2["default"].createElement(_components.Forms.Input, {
          name: "email",
          placeholder: "user@email.com",
          label: "Email",
          errorText: "Please enter a valid email",
          validation: this.isEmail,
          defaultValue: this.props.data.email,
          ref: "email"
        }),
        _react2["default"].createElement(_components.Forms.Input, {
          name: "password",
          placeholder: "password",
          label: "Password",
          type: "password",
          errorText: "Password may not be empty",
          validation: this.savePassword,
          ref: "password"
        }),
        (function () {
          if (!_this2.props.account) {
            return _react2["default"].createElement(
              "div",
              null,
              _react2["default"].createElement(_components.Forms.Input, {
                name: "firstName",
                label: "First Name",
                errorText: "Please enter your first name",
                validation: _this2.firstName,
                defaultValue: _this2.props.data.firstName,
                ref: "firstName"
              }),
              _react2["default"].createElement(_components.Forms.Input, {
                name: "lastName",
                label: "Last Name",
                errorText: "Please enter your last name",
                validation: _this2.lastName,
                defaultValue: _this2.props.data.lastName,
                ref: "lastName"
              })
            );
          }
        })(),
        (function () {
          if (!_this2.props.account) {

            return _react2["default"].createElement(
              _components.Forms.Checkbox,
              {
                name: "terms",
                defaultValue: _this2.props.data.terms,
                clicked: _this2.saveTerms
              },
              "By signing up you agree to our ",
              _react2["default"].createElement(
                "a",
                { href: "#" },
                "terms and conditions"
              )
            );
          } else {
            return _react2["default"].createElement(
              "div",
              { className: "push-bottom" },
              _react2["default"].createElement(
                "h7",
                null,
                _react2["default"].createElement(
                  "small",
                  null,
                  _react2["default"].createElement(
                    "a",
                    { href: "/profile/forgot-password",
                      className: "text-primary",
                      onClick: _this2.props.forgot
                    },
                    "Forgot Password?"
                  )
                )
              )
            );
          }
        })(),
        _react2["default"].createElement(
          "div",
          null,
          _react2["default"].createElement(
            "a",
            { href: "#", tabIndex: -1, className: "btn--small btn--dark-tertiary display-inline-block" },
            "Back"
          ),
          (function () {
            var data = _this2.props.data;

            var btnClasses = ["push-left"];

            if (data.email === null || data.password === null && !data.terms) {
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
      )
    );
  };

  _createClass(SignIn, null, [{
    key: "propTypes",
    value: {
      save: _react.PropTypes.func.isRequired,
      data: _react.PropTypes.object.isRequired,
      back: _react.PropTypes.func.isRequired,
      forgot: _react.PropTypes.func.isRequired,
      errors: _react.PropTypes.object.isRequired,
      account: _react.PropTypes.bool.isRequired,
      state: _react.PropTypes.string.isRequired,
      success: _react.PropTypes.bool.isRequired,
      header: _react.PropTypes.object,
      toggles: _react.PropTypes.array
    },
    enumerable: true
  }]);

  var _SignIn = SignIn;
  SignIn = _reactRedux.connect()(SignIn) || SignIn;
  return SignIn;
})(_react2["default"].Component);

exports["default"] = SignIn;
module.exports = exports["default"];