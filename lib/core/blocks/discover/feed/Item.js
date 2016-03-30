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

var _loading = require("../../../components/loading");

var _FeedItemSkeleton = {
  "load-item": "FeedItemSkeleton__load-item___2a44i",
  "fake-text": "FeedItemSkeleton__fake-text___1DR5P",
  "fake-text-small": "FeedItemSkeleton__fake-text-small___1ARkQ",
  "ColorAnimation": "FeedItemSkeleton__ColorAnimation___gr4HE"
};

var _FeedItemSkeleton2 = _interopRequireDefault(_FeedItemSkeleton);

var _inAppLink = require("../../../util/inAppLink");

var _inAppLink2 = _interopRequireDefault(_inAppLink);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var DiscoverItem = (_temp2 = _class = function (_Component) {
  (0, _inherits3["default"])(DiscoverItem, _Component);

  function DiscoverItem() {
    var _temp, _this, _ret;

    (0, _classCallCheck3["default"])(this, DiscoverItem);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3["default"])(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.backgroundStyles = {
      backgroundImage: "url('" + _this.props.item.image + "')"
    }, _this.imageclasses = ["overlay", "rounded", "background--fill", "ratio--landscape", "floating--bottom", "floating--left", "card__image"], _this.preloader = function () {
      return React.createElement(
        "div",
        {
          className: _this.imageclasses.join(" ") + " " + _FeedItemSkeleton2["default"]["load-item"]
        },
        _this.children
      );
    }, _this.renderElement = function () {
      return React.createElement(
        "div",
        {
          className: _this.imageclasses.join(" "),
          style: _this.backgroundStyles
        },
        _this.children
      );
    }, _temp), (0, _possibleConstructorReturn3["default"])(_this, _ret);
  }

  // context from ImageLoader


  // context from ImageLoader


  DiscoverItem.prototype.render = function render() {
    return React.createElement(
      "div",
      { className: "push-half-bottom card" },
      React.createElement(
        "a",
        { href: this.props.item.link, onClick: _inAppLink2["default"] },
        React.createElement(
          _loading.ImageLoader,
          {
            src: this.props.item.image,
            preloader: this.preloader,
            renderElement: this.renderElement,
            imageclasses: this.imageclasses,
            force: true
          },
          React.createElement(
            "div",
            { className: "overlay__item floating__item soft-left soft-bottom text-light-primary card__item" },
            React.createElement(
              "h5",
              { className: "flush" },
              this.props.item.topicName
            )
          )
        )
      )
    );
  };

  return DiscoverItem;
}(_react.Component), _class.propTypes = {
  item: _react.PropTypes.object.isRequired
}, _temp2);
exports["default"] = DiscoverItem;
module.exports = exports['default'];