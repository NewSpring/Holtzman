"use strict";

exports.__esModule = true;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRedux = require("react-redux");

var _reactMixin = require("react-mixin");

var _reactMixin2 = _interopRequireDefault(_reactMixin);

var _coreClientComponents = require("../../../../../core/client/components");

var _coreLib = require("../../../../../core/lib");

var _rockLibCollections = require("../../../../../rock/lib/collections");

var Personal = (function (_Component) {
  _inherits(Personal, _Component);

  function Personal() {
    var _this = this;

    _classCallCheck(this, _Personal);

    _Component.apply(this, arguments);

    this.header = function () {
      return React.createElement(
        "h4",
        { className: "text-center" },
        "Personal Details"
      );
    };

    this.firstName = function (value) {
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

      return isValid;
    };

    this.isEmail = function (value) {
      var isValid = _coreLib.Validate.isEmail(value);
      var noError = !_this.props.errors["email"];

      if (!isValid) {
        _this.props.clear("email");
      } else {
        _this.props.save({ personal: { email: value } });
      }

      return isValid;
    };

    this.lastName = function (value) {
      var isValid = value.length ? true : false;
      var noError = !_this.props.errors["lastName"];

      if (!isValid) {
        _this.props.clear("lastName");
      } else {
        _this.props.save({ personal: { lastName: value } });
      }

      return isValid;
    };

    this.campus = function (value) {

      _this.props.save({ personal: { campus: value } });

      return true;
    };
  }

  Personal.prototype.getMeteorData = function getMeteorData() {
    Meteor.subscribe("campuses");
    return {
      campuses: _rockLibCollections.Campuses.find().fetch()
    };
  };

  Personal.prototype.render = function render() {
    var _this2 = this;

    var personal = this.props.data.personal;
    var campuses = this.data.campuses;

    campuses || (campuses = []);
    campuses = campuses.map(function (campus) {
      return { label: campus.Name, value: campus.Name };
    });

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
            React.createElement(_coreClientComponents.Forms.Input, {
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
            React.createElement(_coreClientComponents.Forms.Input, {
              name: "lastName",
              label: "Last Name",
              errorText: "Please enter your last name",
              validation: this.lastName,
              defaultValue: personal.lastName,
              ref: "lastName"
            })
          )
        ),
        React.createElement(_coreClientComponents.Forms.Input, {
          name: "email",
          placeholder: "user@email.com",
          label: "Email",
          errorText: "Please enter a valid email",
          validation: this.isEmail,
          defaultValue: personal.email,
          ref: "email"
        }),
        React.createElement(_coreClientComponents.Forms.Select, {
          name: "campus",
          label: "Campus",
          type: "campus",
          errorText: "Please choose a campus",
          validation: this.campus,
          defaultValue: personal.campus,
          ref: "campus",
          items: campuses
        })
      ),
      React.createElement(
        "div",
        null,
        React.createElement(
          "a",
          { href: "#", tabIndex: -1, onClick: this.props.back, className: "btn--small btn--dark-tertiary display-inline-block" },
          "Back"
        ),
        (function () {
          var btnClasses = ["push-left"];

          if (personal.email === null || personal.firstName === null || personal.email === null || personal.campus === null) {
            btnClasses.push("btn--disabled");
          } else {
            btnClasses.push("btn");
          }

          return React.createElement(
            "button",
            { className: btnClasses.join(" "), onClick: _this2.props.next },
            "Enter"
          );
        })()
      )
    );
  };

  _createClass(Personal, null, [{
    key: "propTypes",
    value: {
      data: _react.PropTypes.object.isRequired,
      save: _react.PropTypes.func.isRequired,
      errors: _react.PropTypes.object.isRequired,
      clear: _react.PropTypes.func.isRequired,
      next: _react.PropTypes.func.isRequired
    },
    enumerable: true
  }]);

  var _Personal = Personal;
  Personal = _reactMixin2["default"].decorate(ReactMeteorData)(Personal) || Personal;
  return Personal;
})(_react.Component);

exports["default"] = Personal;
module.exports = exports["default"];