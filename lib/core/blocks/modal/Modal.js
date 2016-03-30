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

var _velocityReact = require("velocity-react");

var _modal = {
  "side-panel": "modal__side-panel___1p2mN",
  "interior": "modal__interior___2ZAso"
};

var _modal2 = _interopRequireDefault(_modal);

var _offset = {
  "offset": "offset__offset___qWQMs"
};

var _offset2 = _interopRequireDefault(_offset);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var SideModal = (_temp2 = _class = function (_Component) {
  (0, _inherits3["default"])(SideModal, _Component);

  function SideModal() {
    var _temp, _this, _ret;

    (0, _classCallCheck3["default"])(this, SideModal);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3["default"])(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.childClasses = function () {
      var _this$props = _this.props;
      var childClasses = _this$props.childClasses;
      var float = _this$props.float;


      var classes = ["hard", "one-whole", _modal2["default"]["interior"], "scrollable"];

      if (childClasses.length) {
        classes.concat(childClasses);
      }

      if (float) {
        classes.push("floating__item");
      } else {
        classes = classes.concat(["inline-block", "locked-top"]);
      }

      return classes.join(" ");
    }, _this.layoutClasses = function () {
      var _this$props2 = _this.props;
      var float = _this$props2.float;
      var offset = _this$props2.offset;
      var _this$props$modal$pro = _this.props.modal.props;
      var classes = _this$props$modal$pro.classes;
      var layoutOverride = _this$props$modal$pro.layoutOverride;


      var classList = ["hard", "flush", "background--light-primary"];

      if (classes && classes.length) {
        classList.concat(classes);
      } else {
        classList.push(_modal2["default"]["side-panel"]);
      }

      if (layoutOverride && layoutOverride.length) {
        classList.push(layoutOverride);
      }

      if (float) {
        classList.push("floating");
      }

      if (offset) {
        classList.push(_offset2["default"]["offset"]);
      }

      return classList.join(" ");
    }, _temp), (0, _possibleConstructorReturn3["default"])(_this, _ret);
  }

  SideModal.prototype.render = function render() {

    var slide = {
      opacity: [1, 0],
      translateZ: 0
    };

    var _props = this.props;
    var close = _props.close;
    var component = _props.component;
    var props = _props.props;
    var visible = _props.visible;


    var ChildComponent = component;

    if (!visible || !component) {
      return React.createElement("div", null);
    }

    if (typeof window != "undefined" && window != null) {
      if (window.matchMedia("(max-width: 480px)").matches) {
        slide.translateY = [0, 80];
        if (typeof this.props.styles != "undefined") {
          this.props.styles.transform = "translateY(80px)";
          this.props.styles.opacity = 0;
        } else {
          this.props.style.transform = "translateY(80px)";
          this.props.style.opacity = 0;
        }
      } else {
        slide.translateX = [0, -20];
        if (typeof this.props.styles != "undefined") {
          this.props.styles.transform = "translateY(-20px)";
          this.props.styles.opacity = 0;
        } else {
          this.props.style.transform = "translateY(-20px)";
          this.props.style.opacity = 0;
        }
      }
    }

    return React.createElement(
      "div",
      { className: "panel overlay--solid-dark fixed", id: "@@modal", onClick: close, style: { zIndex: 100, position: "fixed" } },
      React.createElement(
        _velocityReact.VelocityComponent,
        {
          animation: slide,
          duration: 300,
          runOnMount: this.context.shouldAnimate
        },
        React.createElement(
          "section",
          {
            className: this.props.theme || this.layoutClasses(),
            style: this.props.styles || this.props.style
          },
          React.createElement(
            "div",
            { className: this.childClasses(), style: { height: "100%" } },
            React.createElement(ChildComponent, props)
          )
        )
      )
    );
  };

  return SideModal;
}(_react.Component), _class.contextTypes = {
  shouldAnimate: _react.PropTypes.bool
}, _class.propTypes = {
  childClasses: _react.PropTypes.array,
  float: _react.PropTypes.bool,
  classes: _react.PropTypes.array,
  offset: _react.PropTypes.bool,
  styles: _react.PropTypes.object,
  close: _react.PropTypes.func.isRequired,
  component: _react.PropTypes.func,
  props: _react.PropTypes.object.isRequired
}, _class.defaultProps = {
  childClasses: [],
  float: false,
  classes: [],
  offset: true,
  styles: {},
  props: {}
}, _temp2);
exports["default"] = SideModal;
module.exports = exports['default'];