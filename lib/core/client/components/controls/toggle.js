"use strict";

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var Toggle = (function (_Component) {
  _inherits(Toggle, _Component);

  function Toggle() {
    var _this = this;

    _classCallCheck(this, Toggle);

    _Component.apply(this, arguments);

    this.state = {
      active: true
    };

    this.toggle = function (event) {
      var active = event.target.dataset.toggle;
      if (active != _this.state.active) {
        if (typeof _this.props.toggle === "function") {
          _this.props.toggle(!_this.state.active);
        }

        _this.setState({ active: !_this.state.active });
      }
    };

    this.toggleClasses = function (main) {
      var classes = ["transition", "one-half", "text-center", "toggle__item"];

      if (_this.state.active === main) {
        classes.push("toggle__item--active");
      }
      return classes.join(" ");
    };

    this.arrowStyle = function () {
      if (!_this.state.active) {
        return {
          marginLeft: "50%"
        };
      }

      return {};
    };
  }

  Toggle.prototype.componentWillMount = function componentWillMount() {
    if (this.props.state != null || this.props.state != undefined) {
      this.setState({ active: this.props.state });
    }
  };

  Toggle.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (nextProps.state != null || this.props.state != undefined) {
      this.setState({ active: nextProps.state });
    }
  };

  Toggle.prototype.render = function render() {

    return React.createElement(
      "div",
      { className: "toggle push-bottom soft-sides" },
      React.createElement(
        "div",
        { "data-toggle": "true", className: this.toggleClasses(true), onClick: this.toggle },
        this.props.items[0].label
      ),
      React.createElement(
        "div",
        { "data-toggle": "false", className: this.toggleClasses(false), onClick: this.toggle },
        this.props.items[1].label
      ),
      React.createElement(
        "div",
        { className: "grid text-left toggle-arrow soft-sides" },
        React.createElement("div", { className: "transition grid__item hard one-half toggle-arrow__item", style: this.arrowStyle() })
      )
    );
  };

  return Toggle;
})(_react.Component);

exports["default"] = Toggle;
module.exports = exports["default"];