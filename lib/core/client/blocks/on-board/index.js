"use strict";

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _reactRedux = require("react-redux");

var _actions = require("../../actions");

var _onBoardLoading = require("./on-board.Loading");

var _onBoardLoading2 = _interopRequireDefault(_onBoardLoading);

var _onBoardSignin = require("./on-board.Signin");

var _onBoardSignin2 = _interopRequireDefault(_onBoardSignin);

var _onBoardSignout = require("./on-board.Signout");

var _onBoardSignout2 = _interopRequireDefault(_onBoardSignout);

var _onBoardForgotPassword = require("./on-board.ForgotPassword");

var _onBoardForgotPassword2 = _interopRequireDefault(_onBoardForgotPassword);

/*

  States of the OnBoard component

  1. SignIn / SignUp
  2. Forgot Password

*/
// We only care about the onboard state
function mapStateToProps(state) {
  return {
    onboard: state.onBoard
  };
}

var OnBoard = (function (_Component) {
  _inherits(OnBoard, _Component);

  function OnBoard() {
    var _this = this;

    _classCallCheck(this, _OnBoard);

    _Component.apply(this, arguments);

    this.goBack = function (e) {
      e.preventDefault();
      window.history.back();
    };

    this.goSignIn = function (e) {
      e.preventDefault();
      _this.props.remember();
    };

    this.goForgotPassword = function (e) {
      e.preventDefault();
      _this.props.forgot();
    };

    this.signout = function (e) {
      e.preventDefault();
      Meteor.logout();

      _this.props.authorize(false);
    };
  }

  OnBoard.prototype.render = function render() {
    var _props$onboard = this.props.onboard;
    var data = _props$onboard.data;
    var errors = _props$onboard.errors;
    var account = _props$onboard.account;
    var state = _props$onboard.state;
    var success = _props$onboard.success;
    var forgot = _props$onboard.forgot;
    var authorized = _props$onboard.authorized;

    if (state === "loading") {
      return React.createElement(_onBoardLoading2["default"], {
        account: account,
        forgot: forgot
      });
    }

    if (forgot) {
      return React.createElement(_onBoardForgotPassword2["default"], {
        save: this.props.save,
        email: data.email,
        errors: errors,
        account: account,
        back: this.goSignIn,
        submit: this.props.submit
      });
    }

    if (authorized) {
      return React.createElement(_onBoardSignout2["default"], {
        signout: this.signout
      });
    }

    return React.createElement(_onBoardSignin2["default"], {
      save: this.props.save,
      data: data,
      errors: errors,
      account: account,
      state: state,
      submit: this.props.submit,
      success: success,
      back: this.goBack,
      forgot: this.goForgotPassword
    });
  };

  var _OnBoard = OnBoard;
  OnBoard = _reactRedux.connect(mapStateToProps, _actions.onBoard)(OnBoard) || OnBoard;
  return OnBoard;
})(_react.Component);

exports["default"] = OnBoard;
module.exports = exports["default"];