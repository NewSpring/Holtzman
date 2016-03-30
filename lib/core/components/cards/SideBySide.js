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
    undefined.props,
    undefined.props.children
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
      var classes = ["card__item", "soft", "text-left", "soft-double@anchored", "one-whole@palm", "one-whole@lap", "three-fifths@lap-wide", "three-fifths@palm-wide", "one-half@anchored"];

      if (_this.props.itemClasses) {
        classes = classes.concat(_this.props.itemClasses);
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
        overflow: "hidden"
      };

      if (_this.props.image && _this.props.image.full) {
        defaultStyles.backgroundImage = "url(" + _this.props.image.url + ")";
      }

      return defaultStyles;
    }, _this.createImage = function () {
      var image = _this.props.image;


      if (image) {
        var imageclasses = ["background--fill", "card__image", "locked-ends@lap-wide-and-up", "locked-sides@lap-wide-and-up", "locked-ends@palm-wide", "locked-sides@palm-wide", "relative@palm", "relative@lap"];

        if (image.ratio) {
          imageclasses.push("ratio--" + image.ratio);
        } else {
          imageclasses.push("ratio--landscape");
        }

        var src = image.defaultImage;
        if (typeof window != "undefined" && window != null) {
          if (window.matchMedia("(max-width: 480px)").matches) {
            src = image["2:1"] ? image["2:1"] : image.url;
          } else if (window.matchMedia("(max-width: 730px)").matches) {
            src = image["1:2"] ? image["1:2"] : image.url;
          } else if (window.matchMedia("(max-width: 768px)").matches) {
            src = image["1:1"] ? image["1:1"] : image.url;
          } else if (window.matchMedia("(max-width: 1024px)").matches) {
            src = image["2:1"] ? image["2:1"] : image.url;
          } else if (window.matchMedia("(max-width: 1281px)").matches) {
            src = image["1:2"] ? image["1:2"] : image.url;
          } else {
            src = image["1:1"] ? image["1:1"] : image.url;
          }

          var style = void 0;
          if (image.full != true) {
            style = {
              backgroundImage: "url(" + src + ")"
            };
          }

          return React.createElement(_loading.ImageLoader, {
            src: src,
            preloader: _this.preloader,
            renderElement: _this.renderElement,
            imageclasses: imageclasses,
            style: style
          });
        }
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
    var _props = this.props;
    var link = _props.link;
    var image = _props.image;
    var theme = _props.theme;
    var styles = _props.styles;
    var itemTheme = _props.itemTheme;
    var itemStyles = _props.itemStyles;


    var wrapperClasses = ["relative@lap", "relative@palm", "plain", "locked-ends@lap-wide-and-up", "locked-right@lap-wide-and-up", "locked-ends@palm-wide", "locked-right@palm-wide", "one-whole@lap", "one-whole@palm", "two-fifths@lap-wide", "two-fifths@palm-wide", "one-half@anchored"].join(" ");

    if (link) {
      return React.createElement(
        "div",
        {
          className: theme || this.cardClasses(),
          style: styles || this.styles()
        },
        React.createElement(
          _reactRouter.Link,
          { className: wrapperClasses, to: link },
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