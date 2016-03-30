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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Progress = (_temp2 = _class = function (_Component) {
  (0, _inherits3["default"])(Progress, _Component);

  function Progress() {
    var _temp, _this, _ret;

    (0, _classCallCheck3["default"])(this, Progress);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3["default"])(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.steps = function () {
      var steps = _this.props.steps;


      var stepsArray = [];
      for (var i = 0; i < steps; i++) {
        stepsArray.push(i);
      }

      return stepsArray.map(function (value, count) {
        return { count: count };
      });
    }, _this.getLayer = function (count) {
      return _this.props.steps + 2 - count;
    }, _temp), (0, _possibleConstructorReturn3["default"])(_this, _ret);
  }

  Progress.prototype.render = function render() {
    var _this2 = this;

    var steps = this.steps();

    return React.createElement(
      "div",
      { className: "progress-bar text-center" },
      React.createElement(
        "div",
        { className: "progress" },
        steps.map(function (step, key) {

          var classes = [];
          var style = { zIndex: 1 };

          if (step.count + 1 <= _this2.props.active) {
            classes.push("progress__item--active");
          } else {
            classes.push("progress__item");
          }

          return React.createElement("div", {
            className: classes.join(" "),
            style: style,
            key: key
          });
        })
      ),
      React.createElement(
        "p",
        { className: "flush-bottom" },
        React.createElement(
          "small",
          { className: "italic display-inline-block push-half-top" },
          "Step ",
          this.props.active,
          " of ",
          this.props.steps
        )
      )
    );
  };

  return Progress;
}(_react.Component), _class.propTypes = {
  steps: _react.PropTypes.number.isRequired,
  active: _react.PropTypes.number.isRequired
}, _temp2);
exports["default"] = Progress;
module.exports = exports['default'];