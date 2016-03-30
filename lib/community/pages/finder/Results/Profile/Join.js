"use strict";

exports.__esModule = true;
exports["default"] = undefined;

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require("react");

var _forms = require("../../../../../core/components/forms");

var _forms2 = _interopRequireDefault(_forms);

var _states = require("../../../../../core/components/states");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Join = function (_Component) {
  (0, _inherits3["default"])(Join, _Component);

  function Join() {
    var _temp, _this, _ret;

    (0, _classCallCheck3["default"])(this, Join);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3["default"])(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
      state: "default",
      err: null
    }, _this.onClick = function (e) {

      _this.setState({
        state: "loading"
      });

      _this.props.onClick(e, function (err, response) {
        if (err) {
          _this.setState({
            state: "error",
            err: err.message
          });

          setTimeout(function () {
            _this.setState({
              state: "default"
            });
          }, 3000);

          return;
        }

        _this.setState({
          state: "success"
        });
      });
    }, _temp), (0, _possibleConstructorReturn3["default"])(_this, _ret);
  }

  Join.prototype.render = function render() {
    var _props = this.props;
    var group = _props.group;
    var onExit = _props.onExit;
    var person = _props.person;

    var leaders = group.members.filter(function (x) {
      return x.role.toLowerCase() === "leader";
    });
    var firstNames = leaders.map(function (x, i) {
      return x.person.nickName || x.person.firstName;
    }).join(", ");

    var message = "\nHey" + (" " + firstNames) + ",\n\nI'm interested in joining your group and looking forward to hearing from you soon!\n\nThanks!";

    switch (this.state.state) {
      case "loading":
        return React.createElement(_states.Loading, { msg: "We're sending your request!" });
      case "error":
        return React.createElement(_states.Error, { msg: "There was a problem sending your request", error: this.state.err });
      case "success":

        return React.createElement(
          "div",
          { className: "soft soft-double-ends one-whole text-center" },
          React.createElement(
            "h4",
            { className: "text-center push-ends" },
            "Request Sent!"
          ),
          React.createElement(
            "p",
            null,
            "We have sent your request to join ",
            group.name,
            " to the group leaders!"
          ),
          React.createElement(
            "button",
            { className: "btn--thin btn--small btn--dark-tertiary one-whole", onClick: onExit },
            "Close"
          )
        );

    }

    return React.createElement(
      "div",
      { className: "soft soft-double-ends one-whole text-center" },
      React.createElement(
        "h4",
        { className: "text-center push-ends" },
        "Request to Join ",
        group.name
      ),
      React.createElement(
        _forms2["default"].Form,
        {
          id: "message-form",
          classes: ["hard"],
          submit: this.onClick
        },
        React.createElement(_forms2["default"].TextArea, {
          label: "Your Message",
          name: "message",
          classes: ["hard-bottom", "push-half-ends"],
          inputClasses: "text-dark-secondary",
          rows: 10,
          defaultValue: message
        }),
        React.createElement(
          "div",
          { className: "grid" },
          React.createElement(
            "div",
            { className: "grid__item one-half" },
            React.createElement(
              "button",
              { className: "btn--thin btn--small btn--dark-tertiary one-whole", onClick: onExit },
              "Cancel"
            )
          ),
          React.createElement(
            "div",
            { className: "grid__item one-half" },
            React.createElement(
              "button",
              { type: "submit", className: "one-whole btn" },
              "Send"
            )
          )
        )
      )
    );
  };

  return Join;
}(_react.Component);

exports["default"] = Join;
module.exports = exports['default'];