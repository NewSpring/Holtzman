"use strict";

exports.__esModule = true;
exports["default"] = undefined;

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _class, _temp2;

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

var _right = {
  "right": "right__right___2hAZR"
};

var _right2 = _interopRequireDefault(_right);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var DefaultWrapper = function DefaultWrapper(props) {
  return React.createElement(
    "section",
    (0, _extends3["default"])({}, props, { className: props.imageclasses.join(" ") }),
    props.children
  );
};

var Right = (_temp2 = _class = function (_Component) {
  (0, _inherits3["default"])(Right, _Component);

  function Right() {
    var _temp, _this, _ret;

    (0, _classCallCheck3["default"])(this, Right);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3["default"])(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.layoutClasses = function () {
      var classes = ["panel__item--right", "hard", "flush", _right2["default"].right, "transition"];

      if (_this.props.mobile && !_this.props.aspect) {
        classes.push("ratio--landscape@handheld");
      } else if (_this.props.mobile && _this.props.aspect) {
        classes.push("ratio--" + _this.props.aspect + "@handheld");
      } else {
        classes.push("visuallyhidden@handheld");
      }

      if (_this.props.scroll) {
        classes.push("scrollable");
      }

      if (_this.props.width) {
        classes.push(_this.props.width);
      } else {
        classes.push("five-twelfths@lap-and-up");
      }

      if (_this.props.background && _this.props.backgroundFill != false) {
        classes.push("background--fill");
      }

      if (_this.props.classes) {
        classes = classes.concat(_this.props.classes);
      }

      return classes;
    }, _this.styles = function () {
      if (_this.props.background) {
        return {
          backgroundImage: "url(" + _this.props.background + ")"
        };
      }

      return {};
    }, _this.ratioClasses = function () {
      var classes = ["ratio__item"];

      if (_this.props.ratioClasses) {
        classes = classes.concat(_this.props.ratioClasses);
      }

      return classes.join(" ");
    }, _this.renderInsideRatio = function () {

      return React.createElement(
        "div",
        { className: _this.props.ratioTheme || _this.ratioClasses() },
        _this.props.children
      );
    }, _this.renderOutSideRatio = function () {
      return React.createElement(
        "div",
        null,
        function () {
          if (_this.props.outsideRatio) {
            return _this.props.outsideRatio();
          }
        }(),
        function () {
          var styles = _this.styles();

          styles = (0, _extends3["default"])({}, styles, {
            WebkitFilter: "blur(10px)",
            filter: "blur(10px)"
          });

          if (_this.props.blur) {
            return React.createElement("div", { className: "locked-sides locked-ends background--fill", style: styles });
          }
        }()
      );
    }, _temp), (0, _possibleConstructorReturn3["default"])(_this, _ret);
  }

  Right.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
    return !nextProps.keep;
  };

  // context from ImageLoader

  Right.prototype.preloader = function preloader() {
    return React.createElement(
      "section",
      { className: this.imageclasses.join(" ") + " " + _FeedItemSkeleton2["default"]["load-item"] },
      this.children ? this.children : null
    );
  };

  // context from ImageLoader


  Right.prototype.renderElement = function renderElement() {
    return React.createElement(
      "section",
      { className: this.imageclasses.join(" "), style: this.style },
      this.children ? this.children : null
    );
  };

  Right.prototype.render = function render() {
    var blur = this.props.blur;

    var Wrapper = DefaultWrapper;
    if (this.props.background) {
      Wrapper = _loading.ImageLoader;
    }

    if (this.props.link) {
      return React.createElement(
        _reactRouter.Link,
        {
          to: this.props.link,
          className: this.props.theme || this.layoutClasses().join(" ")
        },
        React.createElement(
          Wrapper,
          {
            src: this.props.background,
            preloader: this.preloader,
            renderElement: this.renderElement,
            style: this.props.styles || this.styles(),
            imageclasses: ["background--fill", "locked-ends", "locked-sides", "hard", "floating"]
          },
          this.renderInsideRatio(),
          this.renderOutSideRatio()
        )
      );
    }

    return React.createElement(
      Wrapper,
      {
        src: this.props.background,
        preloader: this.preloader,
        renderElement: this.renderElement,
        imageclasses: this.props.theme && this.props.theme.split(" ") || this.layoutClasses(),
        style: this.props.styles || this.styles()
      },
      this.renderInsideRatio(),
      this.renderOutSideRatio()
    );
  };

  return Right;
}(_react.Component), _class.propTypes = {
  classes: _react.PropTypes.array,
  theme: _react.PropTypes.string,
  scroll: _react.PropTypes.bool,
  width: _react.PropTypes.string,
  background: _react.PropTypes.string,
  styles: _react.PropTypes.object
}, _temp2);
exports["default"] = Right;
module.exports = exports['default'];