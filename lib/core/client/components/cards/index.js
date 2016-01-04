"use strict";

exports.__esModule = true;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _reactRouter = require("react-router");

var Card = (function (_Component) {
  _inherits(Card, _Component);

  function Card() {
    var _this = this;

    _classCallCheck(this, Card);

    _Component.apply(this, arguments);

    this.layoutClasses = function () {
      var classes = ["card__item", "outlined--light", "soft", "rounded-bottom", "text-center"];

      if (_this.props.classes) {
        classes = classes.concat(_this.props.classes);
      }

      return classes.join(" ");
    };

    this.styles = function () {
      return {};
    };

    this.createImage = function () {
      var image = _this.props.image;

      if (image && image.url) {
        var imageclasses = ["rounded-top", "background--fill", "card__image"];
        if (image.ratio) {
          imageclasses.push(image.ratio);
        } else {
          imageclasses.push("ratio--landscape");
        }

        return React.createElement(
          "div",
          { className: imageclasses.join(" "), style: { backgroundImage: "url(" + image.url + ")" } },
          React.createElement("div", { className: "ratio__item" })
        );
      }
    };
  }

  Card.prototype.render = function render() {
    var _props = this.props;
    var link = _props.link;
    var image = _props.image;
    var theme = _props.theme;
    var styles = _props.styles;

    var Wrapper = _reactRouter.Link;

    if (!link) {
      Wrapper = (function (_Component2) {
        _inherits(ALink, _Component2);

        function ALink() {
          _classCallCheck(this, ALink);

          _Component2.apply(this, arguments);
        }

        ALink.prototype.render = function render() {
          return React.createElement(
            "div",
            this.props,
            this.props.children
          );
        };

        return ALink;
      })(_react.Component);
    }

    return React.createElement(
      "div",
      { className: "card" },
      React.createElement(
        Wrapper,
        { className: "plain", to: link },
        this.createImage()
      ),
      React.createElement(
        "div",
        {
          className: theme || this.layoutClasses(),
          style: styles || this.styles()
        },
        this.props.children
      )
    );
  };

  _createClass(Card, null, [{
    key: "propTypes",
    value: {
      classes: _react.PropTypes.array,
      theme: _react.PropTypes.string,
      link: _react.PropTypes.string,
      background: _react.PropTypes.object,
      styles: _react.PropTypes.object
    },
    enumerable: true
  }]);

  return Card;
})(_react.Component);

exports["default"] = Card;
module.exports = exports["default"];