"use strict";

exports.__esModule = true;
exports["default"] = undefined;

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _dec, _class, _class2, _temp2;

// import Loading from "./Loading"


var _react = require("react");

var _reactRedux = require("react-redux");

var _states = require("../../components/states");

var _accounts = require("../../store/accounts");

var _accounts2 = _interopRequireDefault(_accounts);

var _modal = require("../../store/modal");

var _modal2 = _interopRequireDefault(_modal);

var _Signin = require("./Signin");

var _Signin2 = _interopRequireDefault(_Signin);

var _Success = require("./Success");

var _Success2 = _interopRequireDefault(_Success);

var _ForgotPassword = require("./ForgotPassword");

var _ForgotPassword2 = _interopRequireDefault(_ForgotPassword);

var _SuccessCreate = require("./SuccessCreate");

var _SuccessCreate2 = _interopRequireDefault(_SuccessCreate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// We only care about the accounts state
var map = function map(state) {
  return { accounts: state.accounts };
};
var AccountsContainer = (_dec = (0, _reactRedux.connect)(map, (0, _extends3["default"])({}, _accounts2["default"], _modal2["default"])), _dec(_class = (_temp2 = _class2 = function (_Component) {
  (0, _inherits3["default"])(AccountsContainer, _Component);

  function AccountsContainer() {
    var _temp, _this, _ret;

    (0, _classCallCheck3["default"])(this, AccountsContainer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3["default"])(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
      loading: false,
      account: null
    }, _this.goBack = function (e) {
      e.preventDefault();
      if (typeof window != "undefined" && window != null) {
        window.history.back();
      }
    }, _this.goSignIn = function (e) {
      if (e) {
        e.preventDefault();
      }

      _this.props.remember();
    }, _this.goBackToDefaultOnBoard = function (e) {
      if (e) {
        e.preventDefault();
      }

      _this.props.resetAccount();
    }, _this.goForgotPassword = function (e) {
      e.preventDefault();
      _this.props.forgot();
    }, _this.signout = function (e) {
      e.preventDefault();
      Meteor.logout();

      _this.props.authorize(false);
    }, _this.setAccountWrapper = function (bool) {
      _this.setState({
        account: null
      });

      _this.props.setAccount(bool);
    }, _temp), (0, _possibleConstructorReturn3["default"])(_this, _ret);
  }

  AccountsContainer.prototype.componentWillMount = function componentWillMount() {

    if (typeof this.props.account != "undefined") {
      this.setState({
        account: this.props.account
      });
    }
  };

  AccountsContainer.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var _this2 = this;

    // if logged in, go to the next action
    if (!this.props.accounts.authorized && nextProps.accounts.authorized) {
      // let the UI show the welcome
      var user = Meteor.user();
      var isOld = user && user.profile && user.profile.lastLogin < new Date();

      if (nextProps.accounts.showWelcome && !isOld) {
        return;
      }

      var finish = function finish() {
        _this2.setState({
          loading: false
        });
        // follow up action
        if (_this2.props.onFinished) {
          return _this2.props.onFinished();
        }

        // close the modal
        _this2.props.hide();
      };

      if (this.props.onSignin) {
        this.setState({
          loading: true
        });

        return this.props.onSignin().then(finish)["catch"](finish);
      }

      finish();
    }
  };

  AccountsContainer.prototype.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
    var reset = this.props.reset;


    if (Object.keys(this.props.accounts.errors).length) {
      setTimeout(function () {
        reset();
      }, 2000);
    }
  };

  AccountsContainer.prototype.render = function render() {
    var _props$accounts = this.props.accounts;
    var data = _props$accounts.data;
    var errors = _props$accounts.errors;
    var state = _props$accounts.state;
    var success = _props$accounts.success;
    var forgot = _props$accounts.forgot;
    var authorized = _props$accounts.authorized;
    var person = _props$accounts.person;
    var showWelcome = _props$accounts.showWelcome;
    var alternateAccounts = _props$accounts.alternateAccounts;
    var peopleWithoutAccountEmails = _props$accounts.peopleWithoutAccountEmails;
    var resettingAccount = _props$accounts.resettingAccount;


    if (this.state.loading) {
      state = "loading";
    }

    var account = this.props.accounts.account;

    if (this.state.account != null) {
      account = this.state.account;
    }

    if (Object.keys(errors).length) {
      var primaryError = void 0;
      for (var error in errors) {
        primaryError = errors[error];
        break;
      }
      return React.createElement(_states.Error, { msg: "There was an error", error: primaryError });
    }

    if (state === "loading") {
      var msg = account ? "Signing you in..." : "Creating your account...";
      return React.createElement(_states.Loading, { msg: msg });
    }

    if (forgot) {
      return React.createElement(_ForgotPassword2["default"], {
        save: this.props.save,
        clear: this.props.clear,
        email: data.email,
        errors: errors,
        back: this.goSignIn,
        submit: this.props.submit
      });
    }

    if (authorized && showWelcome) {
      return React.createElement(_Success2["default"], {
        person: person,
        onExit: this.props.hide
      });
    }

    if (data.personId && !authorized && resettingAccount) {
      var email = data.email;
      for (var _iterator = peopleWithoutAccountEmails, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref = _i.value;
        }

        var p = _ref;

        if (p.id === data.personId) {
          email = p.email;
          break;
        }
      }
      return React.createElement(_SuccessCreate2["default"], {
        email: email,
        goBack: this.goBackToDefaultOnBoard
      });
    }

    return React.createElement(_Signin2["default"], {
      save: this.props.save,
      clear: this.props.clear,
      data: this.props.data || data,
      errors: errors,
      account: account,
      state: state,
      submit: this.props.submit,
      success: success,
      back: this.goBack,
      completeAccount: this.props.completeAccount,
      forgot: this.goForgotPassword,
      setAccount: this.setAccountWrapper,
      alternateAccounts: alternateAccounts,
      peopleWithoutAccountEmails: peopleWithoutAccountEmails
    });
  };

  return AccountsContainer;
}(_react.Component), _class2.propTypes = {
  back: _react.PropTypes.func,
  onFinished: _react.PropTypes.func
}, _temp2)) || _class);
exports["default"] = AccountsContainer;
module.exports = exports['default'];