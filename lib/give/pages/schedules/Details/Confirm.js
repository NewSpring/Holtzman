"use strict";

exports.__esModule = true;
exports["default"] = undefined;

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _dec, _class;

var _react = require("react");

var _reactRedux = require("react-redux");

var _icons = require("../../../../core/components/icons");

var _store = require("../../../../core/store");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Err = (_dec = (0, _reactRedux.connect)(), _dec(_class = function (_Component) {
  (0, _inherits3["default"])(Err, _Component);

  function Err() {
    var _temp, _this, _ret;

    (0, _classCallCheck3["default"])(this, Err);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3["default"])(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.onClick = function () {

      // follow up action
      if (_this.props.onFinished) {
        _this.props.onFinished();
      }

      _this.back();
    }, _this.back = function () {
      _this.props.dispatch(_store.modal.hide());
    }, _temp), (0, _possibleConstructorReturn3["default"])(_this, _ret);
  }

  Err.prototype.render = function render() {

    return React.createElement(
      "div",
      { className: "soft soft-double-ends push-double-top one-whole text-center" },
      React.createElement(
        "div",
        { className: "push-double-top" },
        React.createElement(_icons.Error, null),
        React.createElement(
          "h3",
          { className: "text-alert push-ends" },
          "Are you sure?"
        ),
        React.createElement(
          "p",
          { className: "text-left" },
          "Want to stop your scheduled contributions? You can always create another when you're ready."
        ),
        React.createElement(
          "button",
          { className: "one-whole btn push-ends btn--alert", onClick: this.onClick },
          "Cancel Schedule"
        ),
        React.createElement(
          "button",
          {
            className: "btn--thin btn--small btn--dark-tertiary one-whole",
            onClick: this.back
          },
          "Back to Contributions"
        ),
        React.createElement(
          "p",
          { className: "test-dark-tertiary text-left" },
          React.createElement(
            "em",
            null,
            "If you would like a member of our customer support team to follow up with you regarding this contributions, click ",
            React.createElement(
              "a",
              { target: "_blank", href: "//rock.newspring.cc/workflows/152?Topic=Stewardship" },
              "here"
            )
          )
        )
      )
    );
  };

  return Err;
}(_react.Component)) || _class);
exports["default"] = Err;
module.exports = exports['default'];