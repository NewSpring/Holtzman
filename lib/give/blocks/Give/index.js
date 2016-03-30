"use strict";

exports.__esModule = true;
exports["default"] = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _dec, _class;

var _react = require("react");

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRedux = require("react-redux");

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var _graphql = require("../../../core/graphql");

var _components = require("../../../core/components");

var _accounts = require("../../../core/blocks/accounts");

var _accounts2 = _interopRequireDefault(_accounts);

var _store = require("../../../core/store");

var _store2 = require("../../store");

var _fieldsets = require("./fieldsets");

var _Loading = require("./Loading");

var _Loading2 = _interopRequireDefault(_Loading);

var _Err = require("./Err");

var _Err2 = _interopRequireDefault(_Err);

var _Success = require("./Success");

var _Success2 = _interopRequireDefault(_Success);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// We only care about the give state
var map = function map(state) {
  return {
    give: state.give,
    person: state.accounts.person,
    campuses: state.campuses.campuses,
    states: state.collections.states,
    countries: state.collections.countries,
    savedAccounts: state.collections.savedAccounts
  };
};

var Give = (_dec = (0, _reactRedux.connect)(map), _dec(_class = function (_Component) {
  (0, _inherits3["default"])(Give, _Component);

  function Give() {
    var _temp, _this, _ret;

    (0, _classCallCheck3["default"])(this, Give);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3["default"])(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.updateData = function () {
      var person = _this.props.person;
      var campus = person.campus;
      var home = person.home;

      campus || (campus = {});
      home || (home = {});

      var mappedPerson = {
        personal: {
          firstName: person.nickName || person.firstName,
          lastName: person.lastName,
          email: person.email,
          campus: campus.name
        },
        billing: {
          streetAddress: home.street1,
          streetAddress2: home.street2,
          city: home.city,
          state: home.state,
          zip: home.zip,
          country: home.country
        }
      };

      _this.props.dispatch(_store2.give.save(mappedPerson));
    }, _this.onSubmit = function (e) {
      e.preventDefault();
      var dispatch = _this.props.dispatch;


      dispatch(_store2.give.submit());
    }, _this.goBack = function (e) {
      e.preventDefault();
      if (typeof window != "undefined" && window != null) {
        window.history.back();
      }
    }, _this.next = function (e) {
      e.preventDefault();
      _this.props.dispatch(_store2.give.next());
    }, _this.goToStepOne = function (e) {
      e.preventDefault();
      _this.props.dispatch(_store2.give.clearAccount());
      _this.props.dispatch(_store2.give.setState("default"));
      _this.props.dispatch(_store2.give.setProgress(1));
    }, _this.changeSavedAccount = function (account) {
      _this.props.dispatch(_store2.give.setAccount(account));
    }, _this.back = function (e) {
      e.preventDefault();
      if (_this.props.give.step === 1) {
        _this.props.dispatch(_store.modal.hide());
        return;
      }

      _this.props.dispatch(_store2.give.previous());
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
    }, _this.goToaccounts = function () {
      var data = _this.props.give.data;


      var props = {
        account: false,
        data: {
          email: data.personal.email,
          firstName: data.personal.firstName,
          lastName: data.personal.lastName,
          terms: true
        }
      };

      _this.props.dispatch(_store.modal.render(_accounts2["default"], props));
    }, _temp), (0, _possibleConstructorReturn3["default"])(_this, _ret);
  }

  Give.prototype.componentWillMount = function componentWillMount() {
    var savedAccount = this.props.give.savedAccount;


    this.updateData();

    if (!savedAccount.id) {
      return;
    }

    this.props.dispatch(_store2.give.setProgress(4));
  };

  Give.prototype.componentWillUnmount = function componentWillUnmount() {
    if (this.props.give.state != "default") {
      this.props.dispatch(_store2.give.clearData());
      this.props.dispatch(_store2.give.clearSchedules());
    }
  };

  Give.prototype.componentDidMount = function componentDidMount() {
    var dispatch = this.props.dispatch;


    var query = "\n      {\n        states: allDefinedValues(id: 28) {\n          name: description\n          value\n          id\n        }\n        countries: allDefinedValues(id: 45) {\n          name: description\n          value\n          id\n        }\n      }\n    ";

    _graphql.GraphQL.query(query).then(function (_ref) {
      var states = _ref.states;
      var countries = _ref.countries;

      dispatch(_store.collections.insert("states", states, "id"));
      dispatch(_store.collections.upsertBatch("countries", countries, "id"));
    });
  };

  Give.prototype.render = function render() {
    var _this2 = this;

    var _props$give = this.props.give;
    var data = _props$give.data;
    var errors = _props$give.errors;
    var step = _props$give.step;
    var transactions = _props$give.transactions;
    var schedules = _props$give.schedules;
    var total = _props$give.total;
    var savedAccount = _props$give.savedAccount;
    var state = _props$give.state;
    var transactionType = _props$give.transactionType;
    var scheduleToRecover = _props$give.scheduleToRecover;


    var savedAccounts = [];
    for (var account in this.props.savedAccounts) {
      savedAccounts.push(this.props.savedAccounts[account]);
    }

    var campuses = [];
    for (var campus in this.props.campuses) {
      campuses.push(this.props.campuses[campus]);
    }

    campuses = campuses.map(function (x) {
      return {
        label: x.name,
        value: x.name
      };
    });

    var states = [];
    for (var _state in this.props.states) {
      states.push(this.props.states[_state]);
    }

    states = states.map(function (x) {
      return {
        label: x.name,
        value: x.value
      };
    });

    var countries = [];
    for (var country in this.props.countries) {
      countries.push(this.props.countries[country]);
    }

    countries = countries.map(function (x) {
      return {
        label: x.name,
        value: x.value
      };
    });

    var save = function save() {
      _this2.props.dispatch(_store2.give.save.apply(_store2.give, arguments));
    };
    var clear = function clear() {
      _this2.props.dispatch(_store2.give.clear.apply(_store2.give, arguments));
    };

    switch (state) {
      case "loading":
        this.copiedSchedules = (0, _extends3["default"])({}, schedules);
        return React.createElement(_Loading2["default"], { msg: "We're Processing Your Contribution" });
      case "error":
        return React.createElement(_Err2["default"], { msg: errors[Object.keys(errors)[0]].error, goToStepOne: this.goToStepOne });
      case "success":
        return React.createElement(_Success2["default"], {
          total: this.monentize(total.toFixed(2)),
          email: data.personal.email,
          guest: transactionType === "guest",
          onClick: this.goToaccounts,
          schedules: this.copiedSchedules
        });
      default:
        var Step = void 0;

        switch (step) {
          case 4:
            Step = _fieldsets.Confirm;
            break;
          case 3:
            Step = _fieldsets.Payment;
            break;
          case 2:
            Step = _fieldsets.Billing;
            break;
          default:
            Step = _fieldsets.Personal;
        }

        return React.createElement(
          _components.Forms.Form,
          {
            id: "give",
            theme: "hard",
            fieldsetTheme: "flush soft-top scrollable soft-double-bottom",
            ref: "form",
            method: "POST",
            submit: this.onSubmit
          },
          React.createElement(
            Step,
            {
              data: data,
              savedAccount: savedAccount,
              transactions: transactions,
              transactionType: transactionType,
              save: save,
              errors: errors,
              clear: clear,
              next: this.next,
              back: this.back,
              ref: "inputs",
              total: total,
              campuses: campuses,
              states: states,
              countries: countries,
              schedules: schedules,
              goToStepOne: this.goToStepOne,
              savedAccounts: savedAccounts,
              changeSavedAccount: this.changeSavedAccount,
              scheduleToRecover: scheduleToRecover
            },
            React.createElement(_components.Controls.Progress, {
              steps: 4,
              active: step
            })
          )
        );
    }
  };

  return Give;
}(_react.Component)) || _class);
exports["default"] = Give;
module.exports = exports['default'];