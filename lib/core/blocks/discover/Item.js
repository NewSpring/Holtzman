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

var _reactRouter = require("react-router");

var _loading = require("../../components/loading");

var _FeedItemSkeleton = {
  "load-item": "FeedItemSkeleton__load-item___2a44i",
  "fake-text": "FeedItemSkeleton__fake-text___1DR5P",
  "fake-text-small": "FeedItemSkeleton__fake-text-small___1ARkQ",
  "ColorAnimation": "FeedItemSkeleton__ColorAnimation___gr4HE"
};

var _FeedItemSkeleton2 = _interopRequireDefault(_FeedItemSkeleton);

var _inAppLink = require("../../util/inAppLink");

var _inAppLink2 = _interopRequireDefault(_inAppLink);

var _styles = {
  "card": "styles__card___20IO6",
  "height-100": "styles__height-100___4K_2R",
  "ellipsis-p": "styles__ellipsis-p___1cZxp",
  "placeholder-img": "styles__placeholder-img___1VYKW"
};

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var SearchItem = function (_Component) {
  (0, _inherits3["default"])(SearchItem, _Component);

  function SearchItem() {
    var _temp, _this, _ret;

    (0, _classCallCheck3["default"])(this, SearchItem);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3["default"])(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.cardClasses = function () {
      return ["background--light-primary", "push-half-bottom", "card", "rounded", "text-dark-secondary", "display-block", _styles2["default"].card].join(" ");
    }, _this.gridClasses = function () {
      return ["grid", "flush", _styles2["default"]["height-100"]].join(" ");
    }, _this.gridItemClasses = function () {
      return ["grid__item", "three-fifths", "soft-half", "floating--left", "one-whole", _styles2["default"]["height-100"]].join(" ");
    }, _this.pClasses = function () {
      return "small " + _styles2["default"]["ellipsis-p"];
    }, _this.bgClasses = function () {
      return ["grid__item", "two-fifths", "hard", "soft-half-left", "background--cover", _styles2["default"]["height-100"]];
    }, _temp), (0, _possibleConstructorReturn3["default"])(_this, _ret);
  }

  // context from ImageLoader

  SearchItem.prototype.preloader = function preloader() {
    return React.createElement(
      "div",
      { className: this.imageclasses.join(" ") + " " + _FeedItemSkeleton2["default"]["load-item"] },
      React.createElement("div", { className: "ratio--square" })
    );
  };

  // context from ImageLoader


  SearchItem.prototype.renderElement = function renderElement() {
    return React.createElement("div", {
      className: this.imageclasses.join(" "),
      style: this.style
    });
  };

  SearchItem.prototype.render = function render() {
    var _this2 = this;

    return React.createElement(
      _reactRouter.Link,
      { to: this.props.item.link, className: this.cardClasses(), onClick: _inAppLink2["default"] },
      React.createElement(
        "div",
        { className: this.gridClasses() },
        React.createElement(
          "div",
          { className: this.gridItemClasses() },
          React.createElement(
            "div",
            { className: "floating__item one-whole soft-half-sides" },
            React.createElement(
              "h6",
              null,
              this.props.item.title
            ),
            React.createElement(
              "p",
              { className: this.pClasses() },
              this.props.item.description
            )
          )
        ),
        function () {
          if (_this2.props.item.image === "null") {
            var classes = _this2.bgClasses();
            classes.push(_styles2["default"]["placeholder-img"]);
            return React.createElement("div", { className: classes.join(" ") });
          } else {
            return React.createElement(_loading.ImageLoader, {
              src: _this2.props.item.image,
              force: true,
              preloader: _this2.preloader,
              renderElement: _this2.renderElement,
              imageclasses: _this2.bgClasses(),
              style: {
                backgroundImage: "url(" + _this2.props.item.image + ")"
              }
            });
          }
        }()
      )
    );
  };

  return SearchItem;
}(_react.Component);

exports["default"] = SearchItem;
module.exports = exports['default'];