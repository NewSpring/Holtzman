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

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _components = require("../../../../core/components");

var _util = require("../../../../core/util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Billing = (_temp2 = _class = function (_Component) {
  (0, _inherits3["default"])(Billing, _Component);

  function Billing() {
    var _temp, _this, _ret;

    (0, _classCallCheck3["default"])(this, Billing);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3["default"])(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.header = function () {
      return React.createElement(
        "h4",
        { className: "text-center" },
        "Billing Address"
      );
    }, _this.streetAddress = function (value) {
      var isValid = value.length ? true : false;

      if (!isValid) {
        _this.props.clear("billing", "streetAddress");
      } else {
        _this.props.save({ billing: { streetAddress: value } });
      }

      return true;
    }, _this.streetAddress2 = function (value) {
      _this.props.save({ billing: { streetAddress2: value } });
      return true;
    }, _this.saveState = function (value) {
      // we can't require city for international giving

      if (!value.length) {
        _this.props.clear("billing", "state");
      } else {
        _this.props.save({ billing: { state: value } });
      }

      return true;
    }, _this.saveCountry = function (value) {
      var isValid = value.length ? true : false;

      if (!isValid) {
        _this.props.clear("billing", "country");
      } else {
        _this.props.save({ billing: { country: value } });
      }

      return true;
    }, _this.city = function (value) {

      if (!value.length) {
        _this.props.clear("billing", "city");
      } else {
        _this.props.save({ billing: { city: value } });
      }

      return true;
    }, _this.zip = function (value) {

      // we can't require zip for international giving
      if (!value.length) {
        _this.props.clear("billing", "zip");
      } else {
        _this.props.save({ billing: { zip: value } });
      }

      return true;
    }, _temp), (0, _possibleConstructorReturn3["default"])(_this, _ret);
  }

  Billing.prototype.render = function render() {
    var _this2 = this;

    var billing = this.props.data.billing;
    var _props = this.props;
    var states = _props.states;
    var countries = _props.countries;

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
        React.createElement(_components.Forms.Input, {
          name: "streetAddress",
          label: "Street Address",
          errorText: "Please enter your address",
          validation: this.streetAddress,
          defaultValue: billing.streetAddress,
          ref: "streetAddress",
          autofocus: true
        }),
        React.createElement(_components.Forms.Input, {
          name: "streetAddress2",
          label: "Street Address (optional)",
          validation: this.streetAddress2,
          defaultValue: billing.streetAddress2,
          ref: "streetAddress2"
        }),
        React.createElement(_components.Forms.Select, {
          name: "country",
          label: "Country",
          errorText: "Please enter your country",
          defaultValue: billing.country ? billing.country : "US",
          items: countries,
          validation: this.saveCountry,
          ref: "country",
          includeBlank: true
        }),
        React.createElement(_components.Forms.Input, {
          name: "city",
          label: "City",
          errorText: "Please enter your city",
          defaultValue: billing.city,
          validation: this.city,
          ref: "city"
        }),
        React.createElement(
          "div",
          { className: "grid" },
          function () {
            if (!billing.country || billing.country === "US" || billing.country === "CA") {
              return React.createElement(
                "div",
                { className: "grid__item one-half" },
                React.createElement(_components.Forms.Select, {
                  name: "state",
                  label: "State/Territory",
                  errorText: "Please enter your state",
                  defaultValue: billing.state ? billing.state : "SC",
                  items: states,
                  validation: _this2.saveState,
                  ref: "state",
                  includeBlank: true
                })
              );
            }
          }(),
          function () {
            var length = "one-whole";
            if (!billing.country || billing.country === "US" || billing.country === "CA") {
              length = "one-half";
            }
            return React.createElement(
              "div",
              { className: "grid__item " + length },
              React.createElement(_components.Forms.Input, {
                name: "zip",
                label: "Zip/Postal",
                errorText: "Please enter your zip",
                defaultValue: billing.zip,
                onChange: _this2.zip,
                validation: _this2.zip,
                ref: "zip"
              })
            );
          }()
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
        function () {
          var billing = _this2.props.data.billing;

          var btnClasses = ["push-left"];
          var disabled = false;
          if (!billing.streetAddress || !billing.city) {
            btnClasses.push("btn--disabled");
            disabled = true;
          } else {
            btnClasses.push("btn");
          }

          return React.createElement(
            "button",
            { className: btnClasses.join(" "), disabled: disabled, type: "submit", onClick: _this2.props.next },
            "Next"
          );
        }()
      )
    );
  };

  return Billing;
}(_react.Component), _class.propTypes = {
  data: _react.PropTypes.object.isRequired,
  save: _react.PropTypes.func.isRequired,
  errors: _react.PropTypes.object.isRequired,
  clear: _react.PropTypes.func.isRequired,
  next: _react.PropTypes.func.isRequired,
  states: _react.PropTypes.array
}, _temp2);
exports["default"] = Billing;
module.exports = exports['default'];