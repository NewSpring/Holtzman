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

var _FeedItemSkeleton = {
  "load-item": "FeedItemSkeleton__load-item___2a44i",
  "fake-text": "FeedItemSkeleton__fake-text___1DR5P",
  "fake-text-small": "FeedItemSkeleton__fake-text-small___1ARkQ",
  "ColorAnimation": "FeedItemSkeleton__ColorAnimation___gr4HE"
};

var _FeedItemSkeleton2 = _interopRequireDefault(_FeedItemSkeleton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var FeedItemSkeleton = function (_Component) {
  (0, _inherits3["default"])(FeedItemSkeleton, _Component);

  function FeedItemSkeleton() {
    var _temp, _this, _ret;

    (0, _classCallCheck3["default"])(this, FeedItemSkeleton);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3["default"])(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.backgroundStyles = function () {
      var classes = ["rounded-top", "ratio--square", "background--light-tertiary", _FeedItemSkeleton2["default"]["load-item"]];

      return classes.join(" ");
    }, _this.titleStyles = function () {
      var classes = ["one-whole", "push-half-bottom", "background--light-tertiary", _FeedItemSkeleton2["default"]["fake-text"]];

      return classes.join(" ");
    }, _this.subtitleStyles = function () {
      var classes = ["two-thirds", "push-bottom", "background--lirght-tertiary", _FeedItemSkeleton2["default"]["fake-text"]];

      return classes.join(" ");
    }, _this.subsubtitleStyles = function () {
      var classes = ["one-fifth", "background--light-tertiary", _FeedItemSkeleton2["default"]["fake-text-small"]];

      return classes.join(" ");
    }, _temp), (0, _possibleConstructorReturn3["default"])(_this, _ret);
  }

  FeedItemSkeleton.prototype.render = function render() {
    return React.createElement(
      "div",
      { className: "card" },
      React.createElement("div", { className: this.backgroundStyles() }),
      React.createElement(
        "div",
        { className: "outlined--light soft card__item rounded-bottom" },
        React.createElement("div", { className: this.titleStyles() }),
        React.createElement("div", { className: this.subtitleStyles() }),
        React.createElement("div", { className: this.subsubtitleStyles() })
      )
    );
  };

  return FeedItemSkeleton;
}(_react.Component);

exports["default"] = FeedItemSkeleton;
module.exports = exports['default'];