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

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var _reactRouter = require("react-router");

var _loading = require("../../../core/components/loading");

var _FeedItemSkeleton = {
  "load-item": "FeedItemSkeleton__load-item___2a44i",
  "fake-text": "FeedItemSkeleton__fake-text___1DR5P",
  "fake-text-small": "FeedItemSkeleton__fake-text-small___1ARkQ",
  "ColorAnimation": "FeedItemSkeleton__ColorAnimation___gr4HE"
};

var _FeedItemSkeleton2 = _interopRequireDefault(_FeedItemSkeleton);

var _inAppLink = require("../../../core/util/inAppLink");

var _inAppLink2 = _interopRequireDefault(_inAppLink);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var LikesItem = (_temp2 = _class = function (_Component) {
  (0, _inherits3["default"])(LikesItem, _Component);

  function LikesItem() {
    var _temp, _this, _ret;

    (0, _classCallCheck3["default"])(this, LikesItem);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3["default"])(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.backgroundStyles = {
      backgroundImage: "url('" + _this.props.like.image + "')"
    }, _this.imageclasses = ["background--fill", "card__image", "ratio--landscape"], _this.preloader = function () {
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
    }, _this.iconClasses = _this.props.like.icon + " soft-half-right", _this.onClick = function (e) {
      var targetLink = e.currentTarget.href;
      // direct to in app helper unless it's an internal link
      if (targetLink.match(/^(http|https):\/\/localhost.*/) === null) {
        (0, _inAppLink2["default"])(e);
      }
    }, _temp), (0, _possibleConstructorReturn3["default"])(_this, _ret);
  }

  // context from ImageLoader


  // context from ImageLoader


  LikesItem.prototype.getDate = function getDate(entry) {
    var date = new Date(entry.date);

    var time = (0, _moment2["default"])(date);
    var currentTime = new Date();

    if (date.getUTCFullYear() === currentTime.getUTCFullYear()) return (0, _moment2["default"])(time).format("MMM D");else return (0, _moment2["default"])(time).format("MMM D, YYYY");
  };

  LikesItem.prototype.render = function render() {

    var like = this.props.like;

    return React.createElement(
      "div",
      { className: "grid__item one-whole" },
      React.createElement(
        "div",
        { className: "card" },
        React.createElement(
          _reactRouter.Link,
          { to: like.link, onClick: this.onClick, className: "plain" },
          React.createElement(_loading.ImageLoader, {
            src: this.props.like.image,
            preloader: this.preloader,
            renderElement: this.renderElement,
            imageclasses: this.iamgeclasses
          }),
          React.createElement(
            "div",
            { className: "card__item soft text-dark-tertiary" },
            React.createElement(
              "h4",
              { className: "text-dark" },
              like.title
            ),
            React.createElement(
              "h7",
              null,
              like.category
            ),
            React.createElement(
              "h7",
              { className: "text-right float-right" },
              this.getDate(like)
            )
          )
        )
      )
    );
  };

  return LikesItem;
}(_react.Component), _class.propTypes = {
  like: _react.PropTypes.object.isRequired
}, _temp2);
exports["default"] = LikesItem;
module.exports = exports['default'];