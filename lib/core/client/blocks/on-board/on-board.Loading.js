"use strict";

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _velocityReact = require("velocity-react");

var _componentsLoading = require("../../components/loading");

var _default = (function (_Component) {
  _inherits(_default, _Component);

  function _default() {
    _classCallCheck(this, _default);

    _Component.apply(this, arguments);
  }

  _default.prototype.render = function render() {
    var _this = this;

    return React.createElement(
      _velocityReact.VelocityComponent,
      {
        animation: "transition.fadeIn",
        runOnMount: true
      },
      React.createElement(
        _componentsLoading.WindowLoading,
        { classes: ["background--primary"] },
        React.createElement(
          "div",
          { className: "locked-top locked-bottom one-whole floating" },
          React.createElement(
            "div",
            { className: "floating__item" },
            (function () {
              if (_this.props.account) {
                return React.createElement(
                  "h4",
                  { className: "text-light-primary" },
                  "Signing you in..."
                );
              }

              return React.createElement(
                "h4",
                { className: "text-light-primary" },
                "Creating your account"
              );
            })()
          )
        )
      )
    );
  };

  return _default;
})(_react.Component);

exports["default"] = _default;
module.exports = exports["default"];