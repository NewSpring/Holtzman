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

var _coreClientComponents = require("../../../../../core/client/components");

var _coreLib = require("../../../../../core/lib");

var Billing = (function (_Component) {
  _inherits(Billing, _Component);

  function Billing() {
    var _this = this;

    _classCallCheck(this, Billing);

    _Component.apply(this, arguments);

    this.header = function () {
      return React.createElement(
        "h4",
        { className: "text-center" },
        "Billing Address"
      );
    };

    this.streetAddress = function (value) {
      var isValid = value.length ? true : false;

      if (!isValid) {
        _this.props.clear("streetAddress");
      } else {
        _this.props.save({ billing: { streetAddress: value } });
      }

      return isValid;
    };

    this.streetAddress2 = function (value) {
      _this.props.save({ billing: { streetAddress: value } });
      return true;
    };

    this.saveState = function (value) {
      var isValid = value.length ? true : false;

      if (!isValid) {
        _this.props.clear("state");
      } else {
        _this.props.save({ billing: { state: value } });
      }

      return isValid;
    };

    this.city = function (value) {
      var isValid = value.length ? true : false;

      if (!isValid) {
        _this.props.clear("city");
      } else {
        _this.props.save({ billing: { city: value } });
      }

      return isValid;
    };

    this.zip = function (value) {
      var isValid = value.length ? true : false;

      if (!isValid) {
        _this.props.clear("zip");
      } else {
        _this.props.save({ billing: { zip: value } });
      }

      return isValid;
    };
  }

  Billing.prototype.render = function render() {
    var _this2 = this;

    var billing = this.props.data.billing;

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
        React.createElement(_coreClientComponents.Forms.Input, {
          name: "streetAddress",
          label: "Street Address",
          errorText: "Please enter your address",
          validation: this.streetAddress,
          defaultValue: billing.streetAddress,
          ref: "streetAddress"
        }),
        React.createElement(_coreClientComponents.Forms.Input, {
          name: "streetAddress2",
          label: "Street Address (optional)",
          validation: this.streetAddress2,
          defaultValue: billing.streetAddress2,
          ref: "streetAddress2"
        }),
        React.createElement(
          "div",
          { className: "grid" },
          React.createElement(
            "div",
            { className: "grid__item two-fifths" },
            React.createElement(_coreClientComponents.Forms.Input, {
              name: "city",
              label: "City",
              errorText: "Please enter your city",
              defaultValue: billing.city,
              validation: this.city,
              ref: "city"
            })
          ),
          React.createElement(
            "div",
            { className: "grid__item three-fifths" },
            React.createElement(
              "div",
              { className: "grid" },
              React.createElement(
                "div",
                { className: "grid__item one-half" },
                React.createElement(_coreClientComponents.Forms.Input, {
                  name: "state",
                  label: "State",
                  errorText: "Please enter your state",
                  defaultValue: billing.state,
                  validation: this.saveState,
                  ref: "state"
                })
              ),
              React.createElement(
                "div",
                { className: "grid__item one-half" },
                React.createElement(_coreClientComponents.Forms.Input, {
                  name: "zip",
                  label: "Zip",
                  type: "tel",
                  errorText: "Please enter your zip",
                  defaultValue: billing.zip,
                  validation: this.zip,
                  ref: "zip"
                })
              )
            )
          )
        )
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
          var billing = _this2.props.data.billing;

          var btnClasses = ["push-left"];

          if (!billing.streetAddress || !billing.city || !billing.state || !billing.zip) {
            btnClasses.push("btn--disabled");
          } else {
            btnClasses.push("btn");
          }

          return React.createElement(
            "button",
            { className: btnClasses.join(" "), type: "submit", onClick: _this2.props.next },
            "Enter"
          );
        })()
      )
    );
  };

  _createClass(Billing, null, [{
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

  return Billing;
})(_react.Component);

exports["default"] = Billing;
module.exports = exports["default"];