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

var _meta = require("../../../../core/components/meta");

var _meta2 = _interopRequireDefault(_meta);

var _components = require("../../../../core/components");

var _Back = require("../Back");

var _Back2 = _interopRequireDefault(_Back);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
        var number = Number(value);
        if (number) {
          value = number;
        }

        data[ref] = value;
      }

      _this.props.update(data);
    }, _temp), (0, _possibleConstructorReturn3["default"])(_this, _ret);
  }

  Layout.prototype.render = function render() {
    var _props = this.props;
    var update = _props.update;
    var home = _props.home;
    var campuses = _props.campuses;
    var campus = _props.campus;
    var city = home.city;
    var country = home.country;
    var zip = home.zip;
    var state = home.state;
    var street1 = home.street1;
    var street2 = home.street2;


    return React.createElement(
      "div",
      { className: "background--light-primary one-whole text-center push-double-top@lap-and-up push-double-bottom background--light-primary" },
      React.createElement(_meta2["default"], { title: "Change your address" }),
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
            "My Home Address"
          )
        ),
        React.createElement(_components.Forms.Input, {
          name: "Street1",
          label: "Street",
          ref: "Street1",
          type: "text",
          defaultValue: street1
        }),
        React.createElement(_components.Forms.Input, {
          name: "Street2",
          label: "Street 2 (Optional)",
          ref: "Street2",
          type: "text",
          defaultValue: street2
        }),
        React.createElement(
          "div",
          { className: "grid" },
          React.createElement(
            "div",
            { className: "grid__item two-fifths" },
            React.createElement(_components.Forms.Input, {
              name: "City",
              label: "City",
              defaultValue: city,
              ref: "City"
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
                React.createElement(_components.Forms.Input, {
                  name: "State",
                  label: "State",
                  defaultValue: state,
                  ref: "State"
                })
              ),
              React.createElement(
                "div",
                { className: "grid__item one-half" },
                React.createElement(_components.Forms.Input, {
                  name: "PostalCode",
                  label: "Zip",
                  defaultValue: zip,
                  ref: "PostalCode"
                })
              )
            )
          )
        ),
        React.createElement(
          "h6",
          { className: "soft-bottom" },
          "Campus"
        ),
        React.createElement(_components.Forms.Select, {
          name: "Campus",
          label: "Campus",
          type: "Campus",
          defaultValue: campus.id || false,
          ref: "Campus",
          includeBlank: true,
          items: campuses
        }),
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
  home: _react.PropTypes.object,
  update: _react.PropTypes.func
}, _temp2);
exports["default"] = Layout;
module.exports = exports['default'];