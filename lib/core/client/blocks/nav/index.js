"use strict";

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _reactRedux = require("react-redux");

var _actionsNav = require("../../actions/nav");

var _navLayout = require("./nav.layout");

var _navLayout2 = _interopRequireDefault(_navLayout);

// We only care about the navigation state
var map = function map(state) {
  return {
    state: state.nav
  };
};

var NavContainer = (function (_Component) {
  _inherits(NavContainer, _Component);

  function NavContainer() {
    var _this = this;

    _classCallCheck(this, _NavContainer);

    _Component.apply(this, arguments);

    this.handleAction = function (action) {
      _this.props.dispatch(action(_this.props));
    };
  }

  NavContainer.prototype.render = function render() {
    var _props = this.props;
    var state = _props.state;
    var router = _props.router;

    if (!state.visible) {
      return null;
    }

    // console.log(this.props.router)

    return React.createElement(_navLayout2["default"], {
      links: state.links,
      handleAction: this.handleAction,
      back: this.getBackLink
    });
  };

  var _NavContainer = NavContainer;
  NavContainer = _reactRedux.connect(map)(NavContainer) || NavContainer;
  return NavContainer;
})(_react.Component);

exports["default"] = NavContainer;
module.exports = exports["default"];
// router: state.routing