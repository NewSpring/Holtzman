"use strict";

exports.__esModule = true;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

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

var _components = require("../../components");

var _validate = require("../../util/validate");

var _validate2 = _interopRequireDefault(_validate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var SignIn = (_temp2 = _class = function (_Component) {
  (0, _inherits3["default"])(SignIn, _Component);

  function SignIn() {
    var _temp, _this, _ret;

    (0, _classCallCheck3["default"])(this, SignIn);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3["default"])(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
      showAlternativePeople: true,
      selectedPerson: null
    }, _this.header = function () {
      return React.createElement(
        "h4",
        { className: "text-center" },
        "Sign in or create your NewSpring profile"
      );
    }, _this.toggle = function (num) {
      _this.props.setAccount(num == 0);
    }, _this.isEmail = function (value) {
      var isValid = _validate2["default"].isEmail(value);

      if (!isValid) {
        _this.props.clear("email");
      } else {
        _this.props.save({ email: value });
      }

      _this.setState({
        showAlternativePeople: true
      });

      return isValid;
    }, _this.savePassword = function (value) {
      _this.props.save({ password: value });
      return true;
    }, _this.liveSavePassword = function (value) {
      var isValid = value.length ? true : false;

      if (!isValid) {
        _this.props.clear("password");
      } else {
        _this.props.save({ password: value });
      }

      return value;
    }, _this.firstName = function (value) {
      var isValid = value.length ? true : false;

      if (!isValid) {
        _this.props.clear("firstName");
      } else {
        _this.props.save({ firstName: value });
      }

      return isValid;
    }, _this.lastName = function (value) {
      var isValid = value.length ? true : false;

      if (!isValid) {
        _this.props.clear("lastName");
      } else {
        _this.props.save({ lastName: value });
      }

      return isValid;
    }, _this.saveTerms = function (event) {
      _this.props.save({ terms: event.target.checked });
    }, _this.changeEmails = function (event) {
      var dataset = event.currentTarget.dataset;
      var email = dataset.email;


      _this.isEmail(email);
      _this.props.setAccount(true);

      event.preventDefault();
    }, _this.submit = function (event) {
      event.preventDefault();
      var _this2 = _this;
      var refs = _this2.refs;

      var data = (0, _extends3["default"])({}, _this.props.data);
      for (var input in refs) {
        var component = refs[input];
        if (component.validate) {
          component.validate();
        }
        data[input] = component.getValue();
      }

      if (data.email && data.password) {
        _this.props.submit();
      }

      return;
    }, _this.selectPerson = function (id) {

      if (_this.state.selectPerson === id) {
        _this.setState({
          selectedPerson: null
        });

        _this.props.clear("data");

        return;
      }

      _this.setState({
        selectedPerson: id
      });

      _this.props.save({ personId: id });
    }, _this.createNewPerson = function () {
      _this.setState({
        showAlternativePeople: false
      });

      _this.props.clear("data");
    }, _this.completeAccount = function (e) {
      e.preventDefault();

      _this.props.completeAccount();
    }, _temp), (0, _possibleConstructorReturn3["default"])(_this, _ret);
  }

  SignIn.prototype.render = function render() {
    var _this3 = this;

    return React.createElement(
      "div",
      null,
      React.createElement(
        "div",
        { className: "push-double" },
        this.props.header || this.header()
      ),
      React.createElement(_components.Controls.Toggle, {
        items: this.props.toggles,
        toggle: this.toggle,
        state: this.props.account ? 0 : 1
      }),
      React.createElement(
        _components.Forms.Form,
        {
          id: "accounts",
          fieldsetTheme: "flush soft-top",
          classes: ["hard-sides"],
          submit: this.submit
        },
        function () {
          if (!_this3.props.account && _this3.props.alternateAccounts.length) {
            // return null
            return React.createElement(
              "div",
              { className: "soft-sides push-back-half-top soft-double-bottom" },
              React.createElement(
                "h6",
                { className: "flush-bottom" },
                "It looks like you may have a NewSpring account already!",
                function () {
                  if (_this3.props.alternateAccounts.length === 1) {

                    return React.createElement(
                      "span",
                      null,
                      "  Is this your email ",
                      React.createElement(
                        "a",
                        {
                          href: "#",
                          onClick: _this3.changeEmails,
                          "data-email": _this3.props.alternateAccounts[0]
                        },
                        _this3.props.alternateAccounts[0]
                      ),
                      "?"
                    );
                  }

                  var count = 0;
                  return React.createElement(
                    "span",
                    null,
                    "  Is one of these your email ",
                    _this3.props.alternateAccounts.map(function (x, key) {
                      count++;
                      return React.createElement(
                        "span",
                        { key: key },
                        React.createElement(
                          "a",
                          {
                            href: "#",
                            onClick: _this3.changeEmails,
                            "data-email": x
                          },
                          x
                        ),
                        count != _this3.props.alternateAccounts.length ? ", " : "",
                        count === _this3.props.alternateAccounts.length - 1 ? " or " : ""
                      );
                    }),
                    "?"
                  );
                }()
              )
            );
          }
        }(),
        React.createElement(
          "div",
          { className: "soft-sides" },
          React.createElement(_components.Forms.Input, {
            name: "email",
            type: "email",
            placeholder: "user@email.com",
            label: "Email",
            errorText: "Please enter a valid email",
            validation: this.isEmail,
            defaultValue: this.props.data.email,
            ref: "email"
          })
        ),
        function () {
          if (!_this3.props.account && _this3.props.peopleWithoutAccountEmails.length && _this3.state.showAlternativePeople) {
            var people = [].concat(_this3.props.peopleWithoutAccountEmails);
            var classes = ["soft-half-sides", "soft-bottom", "push-bottom", "push-back-top"];
            return React.createElement(
              "div",
              { className: classes.join(" ") },
              people.map(function (person, key) {
                var classes = ["card", "soft-half", "text-left"];

                var color = "#f1f1f1";

                if (person.id === _this3.state.selectedPerson) {
                  color = "#6bac43";
                }

                return React.createElement(
                  "div",
                  { className: classes.join(" "), key: key, style: {
                      borderStyle: "solid",
                      borderColor: color,
                      boxShadow: "none",
                      borderWidth: "2px"
                    },
                    onClick: function onClick(e) {
                      e.preventDefault();
                      _this3.selectPerson(person.id);
                    }
                  },
                  React.createElement(
                    "div",
                    { className: "card__item" },
                    React.createElement("div", {
                      className: "round background--fill display-inline-block push-half-right",
                      style: {
                        backgroundImage: "url(" + person.photo + ")",
                        width: "40px",
                        height: "40px",
                        verticalAlign: "middle"
                      }
                    }),
                    React.createElement(
                      "div",
                      { className: "flush hard display-inline-block",
                        style: {
                          verticalAlign: "middle"
                        } },
                      React.createElement(
                        "h5",
                        { className: "flush-bottom" },
                        person.firstName,
                        " ",
                        person.lastName
                      ),
                      React.createElement(
                        "h7",
                        { className: "flush-bottom" },
                        person.email
                      )
                    )
                  )
                );
              }),
              React.createElement(
                "div",
                {
                  className: "card soft-half text-left",
                  style: {
                    borderStyle: "solid",
                    borderColor: "#f1f1f1",
                    boxShadow: "none",
                    borderWidth: "2px"
                  },
                  onClick: function onClick(e) {
                    e.preventDefault();
                    _this3.createNewPerson();
                  }
                },
                React.createElement(
                  "div",
                  { className: "card__item" },
                  React.createElement(
                    "div",
                    {
                      className: "display-inline-block push-half-right",
                      style: {
                        width: "40px",
                        height: "40px",
                        verticalAlign: "middle",
                        paddingTop: "5px"
                      }
                    },
                    React.createElement("i", {
                      className: "icon-profile",
                      style: {
                        fontSize: "30px",
                        marginLeft: "5px"
                      }
                    })
                  ),
                  React.createElement(
                    "h5",
                    {
                      className: "flush hard display-inline-block",
                      style: {
                        verticalAlign: "middle"
                      }
                    },
                    "Create new account"
                  )
                )
              ),
              React.createElement(
                "h6",
                { className: "soft-top soft-half-sides flush-bottom" },
                React.createElement(
                  "em",
                  null,
                  "It looks like you already have a NewSpring account started! To finish setting up your account, click on your name above."
                )
              ),
              React.createElement(
                "button",
                { className: "btn push-top", onClick: _this3.completeAccount },
                "Complete Account"
              )
            );
          }

          return React.createElement(
            "div",
            { className: "soft-sides" },
            React.createElement(_components.Forms.Input, {
              name: "password",
              placeholder: "password",
              label: "Password",
              type: "password",
              errorText: "Password may not be empty",
              validation: _this3.savePassword,
              format: _this3.liveSavePassword,
              ref: "password"
            }),
            function () {
              if (!_this3.props.account) {
                return React.createElement(
                  "div",
                  null,
                  React.createElement(_components.Forms.Input, {
                    name: "firstName",
                    label: "First Name",
                    errorText: "Please enter your first name",
                    validation: _this3.firstName,
                    defaultValue: _this3.props.data.firstName,
                    ref: "firstName"
                  }),
                  React.createElement(_components.Forms.Input, {
                    name: "lastName",
                    label: "Last Name",
                    errorText: "Please enter your last name",
                    validation: _this3.lastName,
                    defaultValue: _this3.props.data.lastName,
                    ref: "lastName"
                  })
                );
              }
            }(),
            function () {
              if (!_this3.props.account) {

                return React.createElement(
                  _components.Forms.Checkbox,
                  {
                    name: "terms",
                    defaultValue: _this3.props.data.terms,
                    clicked: _this3.saveTerms
                  },
                  "By signing up you agree to our ",
                  React.createElement(
                    "a",
                    { href: "//newspring.cc/terms", target: "_blank" },
                    "terms of use"
                  )
                );
              } else {
                return React.createElement(
                  "div",
                  { className: "push-bottom" },
                  React.createElement(
                    "h7",
                    null,
                    React.createElement(
                      "small",
                      null,
                      React.createElement(
                        "a",
                        { href: "/profile/forgot-password",
                          className: "text-primary",
                          onClick: _this3.props.forgot
                        },
                        "Forgot Password?"
                      )
                    )
                  )
                );
              }
            }(),
            function () {
              var data = _this3.props.data;

              var btnClasses = [];

              if (data.email === null || data.password === null && !data.terms) {
                btnClasses.push("btn--disabled");
              } else {
                btnClasses.push("btn");
              }

              return React.createElement(
                "button",
                { className: btnClasses.join(" "), type: "submit" },
                "Enter"
              );
            }()
          );
        }()
      )
    );
  };

  return SignIn;
}(_react.Component), _class.propTypes = {
  setAccount: _react.PropTypes.func.isRequired,
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
}, _class.defaultProps = {
  toggles: ["Sign In", "Register"]
}, _temp2);
exports["default"] = SignIn;
module.exports = exports['default'];