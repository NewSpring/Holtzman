"use strict";

exports.__esModule = true;

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _class, _temp2;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _components = require("../../components");

var _states = require("../../components/states");

var _validate = require("../../util/validate");

var _validate2 = _interopRequireDefault(_validate);

var _client = require("../../methods/accounts/client");

var _routing = require("../../store/routing");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ForgotPassword = (_temp2 = _class = function (_React$Component) {
  (0, _inherits3["default"])(ForgotPassword, _React$Component);

  function ForgotPassword() {
    var _temp, _this, _ret;

    (0, _classCallCheck3["default"])(this, ForgotPassword);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3["default"])(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.state = {
      state: "default"
    }, _this.isEmail = function (value) {
      var isValid = _validate2["default"].isEmail(value);

      if (!isValid) {
        _this.props.clear("email");
      } else {
        _this.props.save({ email: value });
      }

      return isValid;
    }, _this.submit = function (e) {
      e.preventDefault();

      _this.setState({
        state: "loading"
      });

      Accounts.forgotPassword({
        email: _this.props.email
      }, function (err, response) {
        if (err) {
          if (err.error === 403) {
            // this user may exist in Rock but not in Apollos
            // we fire a server side check with Rock then on the server
            // we create a user (if they exist in Rock) and email them the reciept
            (0, _client.forceReset)(_this.props.email, function (err, response) {

              if (err) {
                _this.setState({ state: "error", err: err.message });
                setTimeout(function () {
                  _this.setState({ state: "default" });
                }, 3000);
                return;
              }

              _this.setState({ state: "success" });

              setTimeout(function () {
                _this.setState({ state: "default" });
                _this.props.back();
              }, 3000);
            });

            return;
          }
          _this.setState({ state: "error", err: err.message });
          setTimeout(function () {
            _this.setState({ state: "default" });
          }, 3000);
          return;
        }

        _this.setState({ state: "success" });

        setTimeout(function () {
          _this.setState({ state: "default" });
          _this.props.back();
        }, 3000);
      });
    }, _temp), (0, _possibleConstructorReturn3["default"])(_this, _ret);
  }

  ForgotPassword.prototype.render = function render() {
    var _this2 = this;

    var err = this.state.err;


    switch (this.state.state) {
      case "error":
        return _react2["default"].createElement(_states.Error, { msg: "Looks like there was a problem", error: err ? err : " " });
      case "loading":
        return _react2["default"].createElement(_states.Loading, { msg: "Sending email to reset your password..." });
      case "success":
        return _react2["default"].createElement(_states.Success, { msg: "An email has been sent to " + this.props.email + " with instructions on how to reset your password!" });
    }

    return _react2["default"].createElement(
      _components.Forms.Form,
      {
        id: "forgot-password",
        fieldsetTheme: "flush soft-top",
        classes: ["push-double-top"],
        submit: this.submit
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
          "a",
          {
            href: "#",
            onClick: this.props.back,
            tabIndex: -1,
            className: "btn--small btn--dark-tertiary display-inline-block"
          },
          "Back"
        ),
        function () {
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
        }()
      )
    );
  };

  return ForgotPassword;
}(_react2["default"].Component), _class.propTypes = {
  save: _react.PropTypes.func.isRequired,
  clear: _react.PropTypes.func.isRequired,
  email: _react.PropTypes.string,
  errors: _react.PropTypes.object.isRequired,
  back: _react.PropTypes.func.isRequired,
  submit: _react.PropTypes.func.isRequired
}, _class.defaultProps = {
  errors: {}
}, _temp2);
exports["default"] = ForgotPassword;
module.exports = exports['default'];