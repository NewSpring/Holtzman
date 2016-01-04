"use strict";

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _reactRedux = require("react-redux");

var _velocityReact = require("velocity-react");

var _actions = require("../../actions");

var _blocksNavNavOffsetCss = require("../../blocks/nav/nav.offset.css");

var _blocksNavNavOffsetCss2 = _interopRequireDefault(_blocksNavNavOffsetCss);

var _modalCss = require("./modal.css");

var _modalCss2 = _interopRequireDefault(_modalCss);

var map = function map(state) {
  return {
    navigation: state.nav,
    modal: state.modal,
    router: state.routing
  };
};

var SideModal = (function (_Component) {
  _inherits(SideModal, _Component);

  function SideModal() {
    var _this = this;

    _classCallCheck(this, _SideModal);

    _Component.apply(this, arguments);

    this.childClasses = function () {
      var props = _this.props.modal.props;

      var classes = ["hard", "one-whole", _modalCss2["default"]["interior"]];

      if (props.childClasses) {
        classes.concat(props.childClasses);
      }

      if (props.float) {
        classes.push("floating__item");
      } else {
        classes = classes.concat(["inline-block", "locked-top"]);
      }

      return classes.join(" ");
    };

    this.layoutClasses = function () {
      var props = _this.props.modal.props;

      var classes = ["hard", "flush", "background--light-primary"];

      if (props.classes.length) {
        classes.concat(props.classes);
      } else {
        classes.push(_modalCss2["default"]["side-panel"]);
      }

      if (props.float) {
        classes.push("floating");
      }

      if (_this.props.navigation.visible) {
        classes.push(_blocksNavNavOffsetCss2["default"]["offset"]);
      }

      return classes.join(" ");
    };

    this.styles = function () {
      return {};
    };

    this.close = function (e) {
      var target = e.target;

      if (target.className != "panel overlay--solid-dark") {
        return;
      }

      _this.props.dispatch(_actions.modal.hide());
    };
  }

  SideModal.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {

    if (nextProps.modal.visible && nextProps.navigation.level != "MODAL" && nextProps.modal.props.keepNav != true) {
      this.props.dispatch(_actions.nav.setLevel("MODAL"));
    }

    if (!nextProps.modal.visible && nextProps.navigation.level === "MODAL" && !this.props.modal.props.keepNav) {
      // this will need to be expanded...
      this.props.dispatch(_actions.nav.setLevel("TOP"));
    }

    // if (this.props.router.path === nextProps.router.path && nextProps.router.replace) {
    //   this.props.dispatch(modalActions.hide())
    // }
  };

  SideModal.prototype.componentWillUpdate = function componentWillUpdate(nextProps) {
    if (typeof document != "undefined" && document != null) {
      var root = document.documentElement;

      if (!nextProps.modal.visible) {
        root.className = root.className.split(" ").filter(function (className) {
          return className != "modal--opened";
        }).join(" ");
      } else if (!this.props.modal.visible && nextProps.modal.visible) {
        root.className += "modal--opened";
      }
    }
  };

  SideModal.prototype.render = function render() {
    var _this2 = this;

    var enter = "fadeIn";
    var exit = "fadeOut";
    var slide = "transition.slideLeftIn";

    // if (typeof window != "undefined" && window != null) {
    //   const width = window.innerWidth
    //   if (width < 768) {
    //     enter = "transition.slideUpIn"
    //     exit = "slideDown"
    //     slide = "slideUp"
    //   }
    // }

    return React.createElement(
      _velocityReact.VelocityTransitionGroup,
      {
        enter: {
          animation: enter, duration: 250
        },
        leave: {
          animation: exit, duration: 250
        }
      },
      (function () {

        if (!_this2.props.modal.visible) {
          return null;
        }

        return React.createElement(
          "div",
          { className: "panel overlay--solid-dark", onClick: _this2.close },
          React.createElement(
            _velocityReact.VelocityComponent,
            {
              animation: slide,
              duration: 500,
              runOnMount: true
            },
            React.createElement(
              "section",
              {
                className: _this2.props.theme || _this2.layoutClasses(),
                style: _this2.props.styles || _this2.styles()
              },
              React.createElement(
                "div",
                { className: _this2.props.childClasses || _this2.childClasses() },
                React.createElement(_this2.props.modal.content, _this2.props.modal.props)
              )
            )
          )
        );
      })()
    );
  };

  var _SideModal = SideModal;
  SideModal = _reactRedux.connect(map)(SideModal) || SideModal;
  return SideModal;
})(_react.Component);

exports["default"] = SideModal;
module.exports = exports["default"];