"use strict";

exports.__esModule = true;
exports["default"] = undefined;

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _dec, _dec2, _class;

var _react = require("react");

var _reactRedux = require("react-redux");

var _reactMixin = require("react-mixin");

var _reactMixin2 = _interopRequireDefault(_reactMixin);

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var _store = require("../../store");

var _status = require("../../components/status");

var _Layout = require("./Layout");

var _Layout2 = _interopRequireDefault(_Layout);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// We only care about the give state
var map = function map(state) {
  return { give: state.give };
};

var CartContainer = (_dec = (0, _reactRedux.connect)(map, _store.give), _dec2 = _reactMixin2["default"].decorate(ReactMeteorData), _dec(_class = _dec2(_class = function (_Component) {
  (0, _inherits3["default"])(CartContainer, _Component);

  function CartContainer() {
    var _temp, _this, _ret;

    (0, _classCallCheck3["default"])(this, CartContainer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3["default"])(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
      fundId: false,
      fundLabel: null,
      frequency: null,
      startDate: null,
      amount: null
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
    }, _this.format = function (value, target) {
      var id = target.id;
      var name = target.name;


      value = _this.monentize(value);

      _this.setState({
        fundId: id,
        fundLabel: name,
        amount: Number(value.replace(/[^0-9\.]+/g, ''))
      });
      // this.props.addTransactions({ [id]: {
      //   value: Number(value.replace(/[^0-9\.]+/g, '')),
      //   label: name
      // }})

      return value;
    }, _this.saveData = function (value, target) {
      var id = target.id;
      var name = target.name;


      value = _this.monentize(value);
      _this.setState({
        fundId: id,
        fundLabel: name,
        amount: Number(value.replace(/[^0-9\.]+/g, ''))
      });
      // console.log(id, target)
      // this.props.addTransactions({ [id]: {
      //   value: Number(value.replace(/[^0-9\.]+/g, '')),
      //   label: name
      // }})

      return true;
    }, _this.saveDate = function (value, target) {
      var _this$state = _this.state;
      var fundId = _this$state.fundId;
      var fundLabel = _this$state.fundLabel;
      var frequency = _this$state.frequency;


      var date = (0, _moment2["default"])(new Date(value)).format("YYYYMMDD");

      _this.setState({ startDate: date });

      if (fundId) {
        _this.props.saveSchedule(fundId, { start: new Date(value) });
      }

      return true;
    }, _this.setFund = function (id) {
      var selectedFund = _this.props.accounts.filter(function (fund) {
        return fund.id === Number(id);
      });

      var name = selectedFund[0].name;


      if (_this.state.fundId != id) {
        _this.props.removeSchedule(_this.state.fundId);
      }

      _this.setState({ fundId: id, fundLabel: name });
      _this.props.saveSchedule(id, {
        label: name,
        frequency: _this.state.frequency,
        start: _this.state.start
      });

      _this.props.setTransactionType("recurring");
    }, _this.setFrequency = function (value) {
      _this.setState({ frequency: value });
      if (_this.state.fundId) {
        _this.props.saveSchedule(_this.state.fundId, { frequency: value });
      }
    }, _this.onClick = function (e) {
      e.preventDefault();

      var keepGoing = true;
      if (_this.state.fundId) {
        var _this$props$addTransa;

        _this.props.clearAllSchedulesExcept(Number(_this.state.fundId));

        _this.props.saveSchedule(_this.state.fundId, {
          label: _this.state.fundLabel,
          frequency: _this.state.frequency,
          start: _this.state.startDate
        });

        _this.props.clearTransactions();
        _this.props.addTransactions((_this$props$addTransa = {}, _this$props$addTransa[_this.state.fundId] = {
          value: Number(_this.state.amount),
          label: _this.state.fundLabel
        }, _this$props$addTransa));
      }

      if (_this.props.onClick) {
        keepGoing = _this.props.onClick(e);
      }

      return keepGoing;
    }, _temp), (0, _possibleConstructorReturn3["default"])(_this, _ret);
  }

  CartContainer.prototype.componentWillMount = function componentWillMount() {
    this.props.clearTransactions();

    if (this.props.existing) {
      var existing = this.props.existing;

      if (existing.details && existing.details.length && existing.details[0].account) {
        this.setState({
          fundId: Number(existing.details[0].account.id),
          fundLabel: existing.details[0].account.name,
          frequency: existing.frequency,
          amount: Number(existing.details[0].amount.replace(/[^0-9\.]+/g, ''))
        });

        // if (existing.details[0].amount) {
        //   this.props.addTransactions({ [Number(existing.details[0].account.id)]: {
        //     value: Number(existing.details[0].amount.replace(/[^0-9\.]+/g, '')),
        //     label: existing.details[0].account.name
        //   }})
        // }
      }
    }
  };

  CartContainer.prototype.componentWillUnmount = function componentWillUnmount() {
    this.props.clearSchedules();
  };

  CartContainer.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var _nextProps$give = nextProps.give;
    var transactions = _nextProps$give.transactions;
    var schedules = _nextProps$give.schedules;


    if (Object.keys(transactions).length === 0 && Object.keys(schedules).length === 0) {
      var form = document.getElementById("add-to-cart");
      if (form) form.reset();

      // this works, but the input--active never comes back
      // let inputs = document.getElementsByClassName("input");
      // for (let i = 0; i < inputs.length; i++) {
      //   inputs[i].className = inputs[i].className.replace(/\binput--active\b/gmi,'');
      // }
    }
  };

  CartContainer.prototype.getMeteorData = function getMeteorData() {
    var alive = true;

    try {
      alive = serverWatch.isAlive("ROCK");
    } catch (e) {}

    return {
      alive: alive
    };
  };

  CartContainer.prototype.render = function render() {

    if (!this.data.alive) {
      return React.createElement(_status.Offline, null);
    }

    var transactions = this.props.give.transactions;


    var schedules = [{
      label: "one time",
      value: "One-Time"
    }, {
      label: "every week",
      value: "Weekly"
    }, {
      label: "every two weeks",
      value: "Bi-Weekly"
    },
    // {
    //   label: "Twice a Month",
    //   value: "Twice a Month"
    // },
    {
      label: "once a month",
      value: "Monthly"
    }];

    var mappedAccounts = this.props.accounts.filter(function (x) {
      return x.description && x.image;
      // return true
    }).map(function (x) {
      return {
        value: x.id,
        label: x.name
      };
    });

    if (!mappedAccounts.length) {
      return null;
    }

    var _state = this.state;
    var fundId = _state.fundId;
    var fundLabel = _state.fundLabel;
    var startDate = _state.startDate;
    var frequency = _state.frequency;


    return React.createElement(_Layout2["default"], {
      schedules: schedules,
      setFrequency: this.setFrequency,
      accounts: mappedAccounts,
      setFund: this.setFund,
      state: this.state,
      format: this.format,
      save: this.saveData,
      saveDate: this.saveDate,
      total: this.state.amount,
      existing: this.props.existing,
      date: this.state.startDate,
      text: this.props.text,
      onSubmitSchedule: this.onClick,
      ready: fundId && fundLabel && startDate && frequency,
      dataId: this.props.dataId
    });
  };

  return CartContainer;
}(_react.Component)) || _class) || _class);
exports["default"] = CartContainer;
module.exports = exports['default'];