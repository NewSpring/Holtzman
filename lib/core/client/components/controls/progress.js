"use strict";

exports.__esModule = true;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var Progress = (function (_Component) {
  _inherits(Progress, _Component);

  function Progress() {
    var _this = this;

    _classCallCheck(this, Progress);

    _Component.apply(this, arguments);

    this.steps = function () {
      var steps = _this.props.steps;

      var stepsArray = [];
      for (var i = 0; i < steps; i++) {
        stepsArray.push(i);
      }

      return stepsArray.map(function (value, count) {
        return { count: count };
      });
    };

    this.getLayer = function (count) {
      return _this.props.steps + 2 - count;
    };
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

  _createClass(Progress, null, [{
    key: "propTypes",
    value: {
      steps: _react.PropTypes.number.isRequired,
      active: _react.PropTypes.number.isRequired
    },
    enumerable: true
  }]);

  return Progress;
})(_react.Component);

exports["default"] = Progress;
module.exports = exports["default"];