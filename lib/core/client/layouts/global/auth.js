"use strict";

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _global = require("./global");

var _global2 = _interopRequireDefault(_global);

var _rockClientMiddlewares = require("../../../../rock/client/middlewares/");

var _middlewares = require("../../middlewares");

var _blocks = require("../../blocks");

_middlewares.addMiddleware(_rockClientMiddlewares.onBoard);

var App = (function (_Component) {
  _inherits(App, _Component);

  function App() {
    _classCallCheck(this, App);

    _Component.apply(this, arguments);
  }

  App.prototype.render = function render() {
    return React.createElement(
      _global2["default"],
      null,
      React.createElement(
        _blocks.Authorized,
        null,
        this.props.children
      )
    );
  };

  return App;
})(_react.Component);

exports["default"] = App;
module.exports = exports["default"];