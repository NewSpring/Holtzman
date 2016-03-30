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

var _validate = require("../../../../core/util/validate");

var _validate2 = _interopRequireDefault(_validate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Personal = (_temp2 = _class = function (_Component) {
  (0, _inherits3["default"])(Personal, _Component);

  function Personal() {
    var _temp, _this, _ret;

    (0, _classCallCheck3["default"])(this, Personal);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3["default"])(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.header = function () {
      return React.createElement(
        "h4",
        { className: "text-center" },
        "Personal Details"
      );
    }, _this.firstName = function (value) {
      var isValid = value.length ? true : false;
      var noError = !_this.props.errors["firstName"];

      if (!isValid) {
        _this.props.clear("firstName");
      } else {

        _this.props.save({
          personal: {
            firstName: value
          }
        });
      }

      return true;
    }, _this.isEmail = function (value) {
      var isValid = _validate2["default"].isEmail(value);
      var noError = !_this.props.errors["email"];

      if (!isValid) {
        _this.props.clear("email");
      } else {
        _this.props.save({ personal: { email: value } });
      }

      return isValid;
    }, _this.lastName = function (value) {
      var isValid = value.length ? true : false;
      var noError = !_this.props.errors["lastName"];

      if (!isValid) {
        _this.props.clear("lastName");
      } else {
        _this.props.save({ personal: { lastName: value } });
      }

      return true;
    }, _this.campus = function (value) {

      _this.props.save({ personal: { campus: value } });

      return true;
    }, _temp), (0, _possibleConstructorReturn3["default"])(_this, _ret);
  }

  Personal.prototype.render = function render() {
    var _this2 = this;

    var personal = this.props.data.personal;
    var campuses = this.props.campuses;


    campuses || (campuses = []);

    if (campuses.length === 0) {
      delete personal.campus;
    }

    return React.createElement(
      "div",
      null,
      React.createElement(
        "div",
        { className: "push-double@lap-and-up push" },
        this.props.header || this.header()
      ),
      this.props.children,
      React.createElement(
        "div",
        { className: "soft" },
        React.createElement(
          "div",
          { className: "grid" },
          React.createElement(
            "div",
            { className: "grid__item one-half" },
            React.createElement(_components.Forms.Input, {
              name: "firstName",
              label: "First Name",
              errorText: "Please enter your first name",
              validation: this.firstName,
              defaultValue: personal.firstName,
              ref: "firstName"
            })
          ),
          React.createElement(
            "div",
            { className: "grid__item one-half" },
            React.createElement(_components.Forms.Input, {
              name: "lastName",
              label: "Last Name",
              errorText: "Please enter your last name",
              validation: this.lastName,
              defaultValue: personal.lastName,
              ref: "lastName"
            })
          )
        ),
        React.createElement(_components.Forms.Input, {
          name: "email",
          placeholder: "user@email.com",
          label: "Email",
          type: "email",
          errorText: "Please enter a valid email",
          validation: this.isEmail,
          defaultValue: personal.email,
          ref: "email"
        }),
        React.createElement(_components.Forms.Select, {
          name: "campus",
          label: "Campus",
          type: "campus",
          errorText: "Please choose a campus",
          validation: this.campus,
          defaultValue: personal.campus,
          ref: "campus",
          includeBlank: true,
          items: campuses
        })
      ),
      React.createElement(
        "div",
        null,
        function () {
          var btnClasses = [
            // "push-left"
          ];
          var disabled = false;
          if (personal.email === null || personal.firstName === null || personal.email === null || personal.campus === null) {
            btnClasses.push("btn--disabled");
            disabled = true;
          } else {
            btnClasses.push("btn");
          }

          return React.createElement(
            "button",
            { className: btnClasses.join(" "), disabled: disabled, onClick: _this2.props.next },
            "Next"
          );
        }()
      )
    );
  };

  return Personal;
}(_react.Component), _class.propTypes = {
  data: _react.PropTypes.object.isRequired,
  save: _react.PropTypes.func.isRequired,
  errors: _react.PropTypes.object.isRequired,
  clear: _react.PropTypes.func.isRequired,
  next: _react.PropTypes.func.isRequired
}, _temp2);
exports["default"] = Personal;
module.exports = exports['default'];