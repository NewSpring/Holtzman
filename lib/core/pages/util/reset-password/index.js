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

var _reactRouter = require("react-router");

var _reactRedux = require("react-redux");

var _client = require("../../../methods/accounts/client");

var _routing = require("../../../store/routing");

var _states = require("../../../components/states");

var _Success = require("./Success");

var _Success2 = _interopRequireDefault(_Success);

var _Layout = require("./Layout");

var _Layout2 = _interopRequireDefault(_Layout);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ChangePassword = (_dec = (0, _reactRedux.connect)(), _dec(_class = function (_Component) {
  (0, _inherits3["default"])(ChangePassword, _Component);

  function ChangePassword() {
    var _temp, _this, _ret;

    (0, _classCallCheck3["default"])(this, ChangePassword);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3["default"])(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
      newP: null,
      newPDup: null,
      state: "default"
    }, _this.submit = function (e) {
      e.preventDefault();
      _this.setState({ state: "loading" });

      Accounts.resetPassword(_this.props.params.token, _this.state.newP, function (err) {
        if (err) {
          _this.setState({ state: "error", err: err });
          setTimeout(function () {
            _this.setState({ state: "default" });
          }, 5000);
          return;
        }

        (0, _client.reset)(false, _this.state.newP, function (err, result) {
          if (err) {
            _this.setState({ state: "error", err: err });
            setTimeout(function () {
              _this.setState({ state: "default" });
            }, 5000);
            return;
          }

          _this.setState({ state: "success" });

          setTimeout(function () {
            // this.setState({ state: "default"})
            _this.props.dispatch(_routing.routeActions.push("/profile"));
          }, 1000);
        });
      });
    }, _this.save = function (value, input) {
      var _this$setState;

      var id = input.id;


      if (id === "newPDup" && _this.state.newP && _this.state.newP != value) {
        return false;
      }

      if (id === "newP" && _this.state.newPDup && _this.state.newPDup != value) {
        return false;
      }

      _this.setState((_this$setState = {}, _this$setState[id] = value, _this$setState));

      return true;
    }, _temp), (0, _possibleConstructorReturn3["default"])(_this, _ret);
  }

  ChangePassword.prototype.render = function render() {
    var _state = this.state;
    var state = _state.state;
    var err = _state.err;


    switch (state) {
      case "error":
        return React.createElement(_states.Error, { msg: "Looks like there was a problem", error: err && err.message ? err.message : " " });
      case "loading":
        return React.createElement(_states.Loading, { msg: "Updating your password..." });
      case "success":
        return React.createElement(_Success2["default"], { msg: "Your password has been updated!" });
      default:
        return React.createElement(_Layout2["default"], {
          submit: this.submit,
          save: this.save,
          state: this.state
        });
    }
  };

  return ChangePassword;
}(_react.Component)) || _class);
exports["default"] = ChangePassword;
module.exports = exports['default'];