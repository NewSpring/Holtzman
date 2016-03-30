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

// @TODO refactor once giving is converted to sagas


var _react = require("react");

var _reactRedux = require("react-redux");

var _graphql = require("../../../core/graphql");

var _accounts = require("../../../core/blocks/accounts");

var _accounts2 = _interopRequireDefault(_accounts);

var _store = require("../../../core/store");

var _components = require("../../components");

var _store2 = require("../../store");

var _Give = require("../Give");

var _Give2 = _interopRequireDefault(_Give);

var _ChangePayments = require("../ChangePayments");

var _ChangePayments2 = _interopRequireDefault(_ChangePayments);

var _Buttons = require("./Buttons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function getPaymentDetails(id) {

  var query = "\n    {\n      paymentDetails: allSavedPaymentAccounts(cache: false, mongoId: \"" + id + "\") {\n        name\n        id\n        date\n        payment {\n          accountNumber\n          paymentType\n        }\n      }\n    }\n  ";
  return _graphql.GraphQL.query(query).then(function (_ref) {
    var paymentDetails = _ref.paymentDetails;
    return paymentDetails;
  });
}

/*

  The give now button is presented in the following order:

  1. Give with existing account if found
  2. Give now (if signed in)
  3. Give as guest (in small text) if not signed in

*/
var map = function map(store) {
  return {
    authorized: store.accounts.authorized,
    savedAccounts: store.collections.savedAccounts,
    savedAccount: store.give.savedAccount
  };
};
var GiveNow = (_dec = (0, _reactRedux.connect)(map), _dec(_class = function (_Component) {
  (0, _inherits3["default"])(GiveNow, _Component);

  function GiveNow() {
    var _temp, _this, _ret;

    (0, _classCallCheck3["default"])(this, GiveNow);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3["default"])(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
      paymentDetails: false
    }, _this.getData = function () {
      var id = Meteor.userId();
      var _this$props = _this.props;
      var dispatch = _this$props.dispatch;
      var savedAccounts = _this$props.savedAccounts;


      if (id && (!savedAccounts || !Object.keys(savedAccounts).length)) {
        getPaymentDetails(id, dispatch).then(function (paymentDetails) {

          dispatch(_store.collections.upsertBatch("savedAccounts", paymentDetails, "id"));
        });
      }
    }, _this.getAccount = function () {

      if (_this.props.savedAccount && _this.props.savedAccount.id) {
        return _this.props.savedAccount;
      }

      var account = {};
      if (_this.props.savedAccounts && Object.keys(_this.props.savedAccounts).length) {
        var accounts = [];
        for (var acc in _this.props.savedAccounts) {
          accounts.push(_this.props.savedAccounts[acc]);
        }
        account = _.sortBy(accounts, "date")[accounts.length - 1];
      }

      return account;
    }, _this.buttonClasses = function () {
      var classes = ["btn"];

      if (_this.props.savedAccounts && Object.keys(_this.props.savedAccounts).length) {
        classes.push("has-card");
      }

      if (_this.props.disabled && _this.props.authorized && Meteor.userId()) {
        classes.push("btn--disabled");
      }
      if (_this.props.classes) {
        classes = classes.concat(_this.props.classes);
      }

      return classes.join(" ");
    }, _this.renderAfterLogin = function () {
      if (_this.props.disabled) {
        return _this.props.dispatch(_store.modal.hide());
      }

      _this.props.dispatch(_store.modal.render(_Give2["default"]));
    }, _this.onClick = function (e) {

      var keepGoing = true;
      if (_this.props.onClick) {
        keepGoing = _this.props.onClick(e);
      }

      if (!keepGoing) {
        return;
      }

      _this.props.dispatch(_store2.give.setTransactionType("default"));

      if (_this.props.savedAccounts && Object.keys(_this.props.savedAccounts).length) {
        // const details = this.props.savedAccount[Object.keys(this.props.savedAccount)[0]]
        var details = _this.getAccount();
        _this.props.dispatch(_store2.give.setAccount(details));
      }

      if (Meteor.userId() && !_this.props.disabled) {
        _this.props.dispatch(_store.modal.render(_Give2["default"]));
      } else if (!Meteor.userId()) {

        _this.props.dispatch(_store.modal.render(_accounts2["default"], {
          onSignin: _this.getPaymentDetailsAfterLogin,
          onFinished: _this.renderAfterLogin
        }));

        _this.props.dispatch(_store.accounts.setAccount(true));
      }

      _this.props.dispatch(_store.nav.setLevel("MODAL"));
    }, _this.getPaymentDetailsAfterLogin = function () {
      var dispatch = _this.props.dispatch;

      var id = Meteor.userId();
      return getPaymentDetails(id).then(function (paymentDetails) {
        if (!paymentDetails.length) {
          return;
        }

        dispatch(_store.collections.upsertBatch("savedAccounts", paymentDetails, "id"));

        return paymentDetails;
      }).then(function (paymentDetails) {
        if (paymentDetails) {
          var details = _.sortBy(paymentDetails, "date")[paymentDetails.length - 1];
          _this.props.dispatch(_store2.give.setAccount(details));
        }
      });
    }, _this.giveAsGuest = function () {
      if (_this.props.disabled) {
        return;
      }
      _this.props.dispatch(_store2.give.setTransactionType("guest"));
      _this.props.dispatch(_store.modal.render(_Give2["default"]));
      // this.props.dispatch(navActions.setLevel("MODAL"))
    }, _this.register = function () {
      _this.props.dispatch(_store.accounts.setAccount(false));
      _this.props.dispatch(_store.modal.render(_accounts2["default"], {
        onFinished: _this.renderAfterLogin
      }));
      // this.props.dispatch(navActions.setLevel("MODAL"))
    }, _this.changePayments = function (e) {
      e.preventDefault();

      var accounts = [];
      for (var account in _this.props.savedAccounts) {
        accounts.push(_this.props.savedAccounts[account]);
      }

      _this.props.dispatch(_store.modal.render(_ChangePayments2["default"], {
        // onFinished: () => {},
        savedAccounts: accounts,
        currentAccount: _this.getAccount()
      }));
    }, _this.buttonText = function () {

      var text = "Give Now";
      if (_this.props.text) {
        text = _this.props.text;
      }

      if (_this.props.savedAccounts && Object.keys(_this.props.savedAccounts).length && !_this.props.hideCard) {

        // const details = this.props.savedAccount[Object.keys(this.props.savedAccount)[0]]
        var details = _this.getAccount();
        var accountNumber = details.payment.accountNumber;

        accountNumber = accountNumber.slice(-4).trim();
        text = "Review";
        text += " Using " + accountNumber;
      }

      if (!Meteor.userId()) {
        text = "Sign In";
      }

      return text;
    }, _this.icon = function () {

      if (_this.props.savedAccounts && Object.keys(_this.props.savedAccounts).length && _this.props.authorized && !_this.props.hideCard) {
        // const detail = this.props.savedAccount[Object.keys(this.props.savedAccount)[0]]
        var detail = _this.getAccount();
        if (detail.paymentType && detail.payment.paymentType === "ACH") {
          return React.createElement(_components.AccountType, { width: "30px", height: "21px", type: "Bank" });
        } else if (detail.payment.paymentType) {
          return React.createElement(_components.AccountType, { width: "30px", height: "21px", type: detail.payment.paymentType });
        }
      }
    }, _temp), (0, _possibleConstructorReturn3["default"])(_this, _ret);
  }

  GiveNow.prototype.componentDidMount = function componentDidMount() {
    this.getData();
  };

  GiveNow.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (!this.props.authorized && nextProps.authorized) {
      this.getData();
    }
  };

  GiveNow.prototype.render = function render() {
    var _this2 = this;

    try {
      return React.createElement(
        "span",
        null,
        React.createElement(_Buttons.PrimaryButton, {
          classes: this.props.theme || this.buttonClasses(),
          icon: this.icon(),
          text: this.buttonText(),
          onClick: this.onClick,
          value: this.props.value,
          style: this.props.style || {},
          dataId: this.props.dataId
        }),
        function () {
          if (!_this2.props.authorized && !Meteor.userId()) {
            return React.createElement(_Buttons.SecondaryButton, {

              onClick: _this2.register
            });
          }
        }(),
        function () {
          if (!_this2.props.disabledGuest && !Meteor.userId()) {
            return React.createElement(_Buttons.Guest, {
              disabled: _this2.props.disabled,
              onClick: _this2.giveAsGuest
            });
          }
        }(),
        function () {
          if (_this2.props.savedAccounts && Object.keys(_this2.props.savedAccounts).length && !_this2.props.hideCard) {
            return React.createElement(_Buttons.Guest, {
              onClick: _this2.changePayments,
              text: "Change payment account"
            });
          }
        }()
      );
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  return GiveNow;
}(_react.Component)) || _class);
exports["default"] = GiveNow;
module.exports = exports['default'];