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

var _store = require("../../../store");

var _Primary = require("./Primary");

var _Primary2 = _interopRequireDefault(_Primary);

var _Layout = require("./Layout");

var _Layout2 = _interopRequireDefault(_Layout);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var SubFund = (_dec = (0, _reactRedux.connect)(null, _store.give), _dec(_class = function (_Component) {
  (0, _inherits3["default"])(SubFund, _Component);

  function SubFund() {
    var _temp, _this, _ret;

    (0, _classCallCheck3["default"])(this, SubFund);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3["default"])(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
      active: false,
      focused: false,
      fund: false,
      amount: null,
      id: "select-account_" + Date.now() + "_" + Math.floor(Math.random() * 100)
    }, _this.monentize = function (value, fixed) {

      if (typeof value === "number") {
        value = "" + value;
      }

      if (!value.length) {
        return "$0.00";
      }

      value = value.replace(/[^\d.-]/g, "");

      var decimals = value.split(".")[1];
      if (decimals && decimals.length >= 2 || fixed) {
        value = Number(value).toFixed(2);
        value = String(value);
      }

      value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return "$" + value;
    }, _this.getFund = function (id) {
      var selectedFund = _this.props.accounts.filter(function (fund) {
        return fund.value === Number(id);
      });

      return selectedFund[0];
    }, _this.saveFund = function (id) {

      if (id === _this.state.id) {
        return;
      }

      // remove old funds transaction
      _this.props.clearTransaction(Number("" + _this.state.id));
      _this.props.remove(_this.props.instance, _this.state.id);

      var fund = _this.getFund(id);

      if (!fund) {
        _this.setState({
          id: null,
          fund: false,
          amount: null
        });
        return;
      }

      _this.setState({
        id: fund.value,
        fund: true
      });

      // we have monies, lets update the store
      if (_this.state.amount) {
        var _this$props$addTransa;

        _this.props.addTransactions((_this$props$addTransa = {}, _this$props$addTransa[id] = {
          value: Number(("" + _this.state.amount).replace(/[^0-9\.]+/g, '')),
          label: fund.label
        }, _this$props$addTransa));

        _this.props.update(_this.props.instance, id, _this.state.amount);
      }
    }, _this.saveAmount = function (value) {

      value = _this.monentize(value);

      var numberValue = Number(value.replace(/[^\d.-]/g, ""));

      if (numberValue > 0) {

        _this.setState({
          active: true,
          amount: numberValue
        });

        // there is also a fund stored, lets update the transactions store
        if (_this.state.fund) {
          var _this$props$addTransa2;

          var id = _this.state.id;

          var fund = _this.getFund(id);
          _this.props.addTransactions((_this$props$addTransa2 = {}, _this$props$addTransa2[id] = {
            value: Number(value.replace(/[^0-9\.]+/g, '')),
            label: fund.label
          }, _this$props$addTransa2));

          _this.props.update(_this.props.instance, id, numberValue);
        }
      } else {

        // remove transaction
        if (_this.state.fund) {
          _this.props.clearTransaction(_this.state.id);
          _this.props.remove(_this.props.instance, _this.state.id);
        }

        // this.setState({
        //   active: false,
        //   fund: false,
        //   id: `select-account_${Date.now()}_${Math.floor((Math.random() * 100))}`
        // })
      }

      return value;
    }, _this.statusClass = function () {
      if (_this.state.fund) {
        return "text-dark-tertiary";
      } else {
        return "text-light-tertiary";
      }
    }, _temp), (0, _possibleConstructorReturn3["default"])(_this, _ret);
  }

  SubFund.prototype.componentWillMount = function componentWillMount() {
    if (this.props.primary) {
      this.setState({
        fund: true,
        id: this.props.accounts[0].value
      });

      this.props.update(this.props.instance, this.props.accounts[0].value, this.state.amount);
    }

    if (this.props.selectVal) {
      this.setState({ fund: true, id: this.props.selectVal });
    }
    if (this.props.inputVal) {
      this.setState({ amount: this.props.inputVal });
    }
  };

  SubFund.prototype.render = function render() {

    if (!this.props.accounts.length) {
      return null;
    }

    if (this.props.primary) {

      /*
         The primary subfund template presents an input field first
        then the account to give to second.
         We store the amount in the state
          If there is no fund id, we are done
          If there is a fund id, we need to update the transaction store
         We store the fund id in the state
          If there is an amount, we update the transaction store
       */

      return React.createElement(_Primary2["default"], {
        classes: this.statusClass(),
        accounts: this.props.accounts,
        state: this.state,
        saveFund: this.saveFund,
        format: this.saveAmount,
        preFill: this.props.preFill,
        donate: this.props.donate,
        selectVal: this.props.selectVal
      });
    }

    /*
       The secondary subfund template presents a select then shows an
      input field for the amount
       We store the fund id in the state
        If there is an amount, we update the transaction store
       We store the amount in the state
        If there is a fund id, we need to update the transaction store
     */
    return React.createElement(_Layout2["default"], {
      classes: this.statusClass(),
      accounts: this.props.accounts,
      state: this.state,
      showInputs: this.saveFund,
      format: this.saveAmount,
      preFill: this.props.preFill,
      selectVal: this.props.selectVal,
      inputVal: this.props.inputVal
    });
  };

  return SubFund;
}(_react.Component)) || _class);
exports["default"] = SubFund;
module.exports = exports['default'];