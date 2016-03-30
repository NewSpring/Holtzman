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

var _components = require("../../../../core/components");

var _meta = require("../../../../core/components/meta");

var _meta2 = _interopRequireDefault(_meta);

var _validate = require("../../../../core/util/validate");

var _validate2 = _interopRequireDefault(_validate);

var _Back = require("../Back");

var _Back2 = _interopRequireDefault(_Back);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import { VelocityComponent } from "velocity-react"

//
var Layout = (_temp2 = _class = function (_Component) {
  (0, _inherits3["default"])(Layout, _Component);

  function Layout() {
    var _temp, _this, _ret;

    (0, _classCallCheck3["default"])(this, Layout);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3["default"])(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.submit = function (e) {
      e.preventDefault();

      var data = {};
      for (var ref in _this.refs) {
        var value = _this.refs[ref].getValue();
        if (ref === "Email" && !_validate2["default"].isEmail(value)) {
          continue;
        }

        var number = Number(value);
        if (number) {
          value = number;
        }

        data[ref] = value;
      }

      _this.props.submit(data);
    }, _temp), (0, _possibleConstructorReturn3["default"])(_this, _ret);
  }

  Layout.prototype.render = function render() {
    var _props = this.props;
    var submit = _props.submit;
    var person = _props.person;
    var months = _props.months;
    var saveMonth = _props.saveMonth;
    var days = _props.days;
    var years = _props.years;
    var campuses = _props.campuses;
    var campus = person.campus;
    var firstName = person.firstName;
    var lastName = person.lastName;
    var nickName = person.nickName;
    var email = person.email;
    var birthDay = person.birthDay;
    var birthMonth = person.birthMonth;
    var birthYear = person.birthYear;


    return React.createElement(
      "div",
      { className: "background--light-primary one-whole text-center push-double-top@lap-and-up soft-double-bottom push-double-bottom" },
      React.createElement(_meta2["default"], { title: "Update your details" }),
      React.createElement(_Back2["default"], null),
      React.createElement(
        _components.Forms.Form,
        {
          id: "reset-password",
          classes: ["soft", "one-whole", "two-thirds@portable", "one-half@anchored", "display-inline-block"],
          submit: this.submit
        },
        React.createElement(
          "div",
          { className: "push-double" },
          React.createElement(
            "h4",
            { className: "text-center" },
            "My Personal Details"
          )
        ),
        React.createElement(
          "h6",
          { className: "soft-bottom" },
          "Name"
        ),
        React.createElement(_components.Forms.Input, {
          name: "NickName",
          label: "Nickname",
          ref: "NickName",
          type: "text",
          defaultValue: nickName
        }),
        React.createElement(_components.Forms.Input, {
          name: "FirstName",
          label: "First Name",
          ref: "FirstName",
          type: "text",
          defaultValue: firstName
        }),
        React.createElement(_components.Forms.Input, {
          name: "LastName",
          label: "Last Name",
          ref: "LastName",
          type: "text",
          defaultValue: lastName
        }),
        React.createElement(
          "h6",
          { className: "soft-bottom" },
          "Contact"
        ),
        React.createElement(_components.Forms.Input, {
          name: "Email",
          placeholder: "user@email.com",
          label: "Email",
          type: "email",
          ref: "Email",
          errorText: "Please enter a valid email",
          validation: _validate2["default"].isEmail,
          defaultValue: email
        }),
        React.createElement(
          "h6",
          { className: "soft-bottom" },
          "Birthday"
        ),
        React.createElement(
          "div",
          { className: "grid" },
          React.createElement(
            "div",
            { className: "grid__item three-fifths" },
            React.createElement(
              "div",
              { className: "grid" },
              React.createElement(
                "div",
                { className: "grid__item one-half" },
                React.createElement(_components.Forms.Select, {
                  name: "BirthMonth",
                  label: "Month",
                  ref: "BirthMonth",
                  type: "text",
                  defaultValue: birthMonth,
                  includeBlank: true,
                  items: months,
                  validation: saveMonth
                })
              ),
              React.createElement(
                "div",
                { className: "grid__item one-half" },
                React.createElement(_components.Forms.Select, {
                  name: "BirthDay",
                  label: "Day",
                  ref: "BirthDay",
                  type: "text",
                  defaultValue: birthDay,
                  includeBlank: true,
                  items: days
                })
              )
            )
          ),
          React.createElement(
            "div",
            { className: "grid__item two-fifths" },
            React.createElement(_components.Forms.Select, {
              name: "BirthYear",
              label: "Year",
              ref: "BirthYear",
              type: "text",
              defaultValue: birthYear,
              includeBlank: true,
              items: years
            })
          )
        ),
        function () {
          var btnClasses = [];
          var ready = true;
          if (!ready) {
            btnClasses.push("btn--disabled");
          } else {
            btnClasses.push("btn");
          }

          return React.createElement(
            "button",
            { className: btnClasses.join(" ") },
            "Update"
          );
        }()
      )
    );
  };

  return Layout;
}(_react.Component), _class.propTypes = {
  submit: _react.PropTypes.func.isRequired,
  person: _react.PropTypes.object,
  months: _react.PropTypes.array.isRequired,
  saveMonth: _react.PropTypes.func.isRequired,
  days: _react.PropTypes.array.isRequired,
  years: _react.PropTypes.array.isRequired
}, _temp2);
exports["default"] = Layout;
module.exports = exports['default'];