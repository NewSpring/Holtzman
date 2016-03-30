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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Toggle = (_temp2 = _class = function (_Component) {
  (0, _inherits3["default"])(Toggle, _Component);

  function Toggle() {
    var _temp, _this, _ret;

    (0, _classCallCheck3["default"])(this, Toggle);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3["default"])(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
      active: 0
    }, _this.toggle = function (event) {
      var active = Number(event.target.dataset.toggle);
      if (active != _this.state.active) {
        if (typeof _this.props.toggle === "function") {
          _this.props.toggle(active);
        }

        _this.setState({ active: active });
      }
    }, _this.toggleClasses = function (main) {
      var classes = ["transition", "text-center", "toggle__item"];

      if (_this.state.active === main) {
        classes.push("toggle__item--active");
      }
      return classes.join(" ");
    }, _this.toggleWidth = function () {
      return 100 / _this.props.items.length;
    }, _this.toggleStyle = { width: _this.toggleWidth() + "%" }, _this.arrowStyle = function () {
      return {
        marginLeft: _this.toggleWidth() * _this.state.active + "%"
      };
    }, _temp), (0, _possibleConstructorReturn3["default"])(_this, _ret);
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
    var _this2 = this;

    return React.createElement(
      "div",
      { className: "toggle push-bottom soft-sides", style: { backgroundColor: "#fff" } },
      this.props.items.map(function (item, i) {
        return React.createElement(
          "div",
          {
            "data-toggle": i,
            className: _this2.toggleClasses(i),
            style: _this2.toggleStyle,
            onClick: _this2.toggle,
            key: i
          },
          item
        );
      }),
      React.createElement(
        "div",
        { className: "grid text-left toggle-arrow soft-sides" },
        React.createElement("div", { className: "transition grid__item hard one-half toggle-arrow__item", style: this.arrowStyle() })
      )
    );
  };

  return Toggle;
}(_react.Component), _class.propTypes = {
  items: _react.PropTypes.array.isRequired,
  toggle: _react.PropTypes.func.isRequired
}, _temp2);
exports["default"] = Toggle;
module.exports = exports['default'];