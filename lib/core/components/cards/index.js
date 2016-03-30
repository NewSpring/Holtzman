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

var _reactRouter = require("react-router");

var _loading = require("../loading");

var _FeedItemSkeleton = {
  "load-item": "FeedItemSkeleton__load-item___2a44i",
  "fake-text": "FeedItemSkeleton__fake-text___1DR5P",
  "fake-text-small": "FeedItemSkeleton__fake-text-small___1ARkQ",
  "ColorAnimation": "FeedItemSkeleton__ColorAnimation___gr4HE"
};

var _FeedItemSkeleton2 = _interopRequireDefault(_FeedItemSkeleton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Wrapper = function Wrapper(props) {
  return React.createElement(
    "div",
    props,
    props.children
  );
};

var Card = (_temp2 = _class = function (_Component) {
  (0, _inherits3["default"])(Card, _Component);

  function Card() {
    var _temp, _this, _ret;

    (0, _classCallCheck3["default"])(this, Card);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3["default"])(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.itemClasses = function () {
      var classes = ["card__item", "soft", "text-center", "soft-double-ends"];

      if (_this.props.itemClasses) {
        classes = classes.concat(_this.props.itemClasses);
      }

      if (_this.props.linkAll) {
        classes.push("background--light-primary");
      }

      return classes.join(" ");
    }, _this.cardClasses = function () {
      var classes = ["card"];

      if (_this.props.classes) {
        classes = classes.concat(_this.props.classes);
      }

      return classes.join(" ");
    }, _this.styles = function () {
      var defaultStyles = {
        overflow: "hidden",
        display: "block"
      };

      if (_this.props.image && _this.props.image.full) {
        defaultStyles.backgroundImage = "url(" + _this.props.image.url + ")";
      }

      if (_this.props.linkAll) {
        defaultStyles.color = "inherit";
        defaultStyles.textDecoration = "none";
      }

      return defaultStyles;
    }, _this.createImage = function () {
      var image = _this.props.image;


      if (image) {
        var imageclasses = ["background--fill", "card__image", "background-light-tertiary"];

        if (image.ratio) {
          imageclasses.push("ratio--" + image.ratio);
        } else {
          imageclasses.push("ratio--landscape");
        }

        if (_this.props.imageclasses) {
          imageclasses = [].concat(imageclasses, _this.props.imageclasses);
        }

        var style = void 0;
        if (image.full != true) {
          style = {
            backgroundImage: "url(" + image.url + ")"
          };
        }

        return React.createElement(_loading.ImageLoader, {
          src: image.url,
          preloader: _this.preloader,
          renderElement: _this.renderElement,
          imageclasses: imageclasses,
          style: style
        });
      }
    }, _temp), (0, _possibleConstructorReturn3["default"])(_this, _ret);
  }

  // context from ImageLoader

  Card.prototype.preloader = function preloader() {
    return React.createElement(
      "div",
      { className: this.imageclasses.join(" ") + " " + _FeedItemSkeleton2["default"]["load-item"] },
      React.createElement("div", { className: "ratio__item" })
    );
  };

  // context from ImageLoader


  Card.prototype.renderElement = function renderElement() {
    return React.createElement(
      "div",
      { className: this.imageclasses.join(" "), style: this.style },
      React.createElement("div", { className: "ratio__item" })
    );
  };

  Card.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props;
    var link = _props.link;
    var image = _props.image;
    var theme = _props.theme;
    var styles = _props.styles;
    var itemTheme = _props.itemTheme;
    var itemStyles = _props.itemStyles;


    var wrapperClasses = "plain";
    if (this.props.mobile === false) {
      wrapperClasses += " visuallyhidden@handheld";
    }

    if (this.props.linkAll) {
      return React.createElement(
        _reactRouter.Link,
        {
          className: theme || this.cardClasses(),
          style: styles || this.styles(),
          to: link
        },
        React.createElement(
          "div",
          { className: wrapperClasses },
          this.createImage()
        ),
        React.createElement(
          "div",
          {
            className: itemTheme || this.itemClasses(),
            style: itemStyles
          },
          this.props.children
        )
      );
    }

    return React.createElement(
      "div",
      {
        className: theme || this.cardClasses(),
        style: styles || this.styles()
      },
      function () {
        if (link) {
          return React.createElement(
            _reactRouter.Link,
            { className: wrapperClasses, to: link },
            _this2.createImage()
          );
        }
        return React.createElement(
          Wrapper,
          { className: wrapperClasses },
          _this2.createImage()
        );
      }(),
      React.createElement(
        "div",
        {
          className: itemTheme || this.itemClasses(),
          style: itemStyles
        },
        this.props.children
      )
    );
  };

  return Card;
}(_react.Component), _class.propTypes = {
  classes: _react.PropTypes.array,
  theme: _react.PropTypes.string,
  link: _react.PropTypes.string,
  image: _react.PropTypes.object,
  styles: _react.PropTypes.object
}, _temp2);
exports["default"] = Card;
module.exports = exports['default'];