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

var _graphql = require("../../../../core/graphql");

var _store = require("../../../../core/store");

var _store2 = require("../../../store");

var _Confirm = require("./Confirm");

var _Confirm2 = _interopRequireDefault(_Confirm);

var _Layout = require("./Layout");

var _Layout2 = _interopRequireDefault(_Layout);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function getTransaction(id, dispatch) {
  var mongoId = Meteor.userId();
  var query = "\n  {\n    transaction: scheduledFinanicalTransaction(id: " + id + ",  mongoId: \"" + mongoId + "\") {\n      numberOfPayments\n      next\n      end\n      id\n      reminderDate\n      gateway\n      start\n      date\n      details {\n        amount\n        account {\n          name\n          description\n        }\n      }\n      payment {\n        paymentType\n        accountNumber\n        id\n      }\n      schedule {\n        value\n        description\n      }\n    }\n  }\n  ";

  return _graphql.GraphQL.query(query).then(function (_ref) {
    var _obj;

    var transaction = _ref.transaction;

    var obj = (_obj = {}, _obj[transaction.id] = transaction, _obj);
    dispatch(_store2.transactions.addSchedule(obj));
  });
}

var map = function map(state) {
  return {
    person: state.accounts.person,
    transactions: state.transactions.scheduledTransactions

  };
};

var Details = (_dec = (0, _reactRedux.connect)(map), _dec(_class = function (_Component) {
  (0, _inherits3["default"])(Details, _Component);

  function Details() {
    var _temp, _this, _ret;

    (0, _classCallCheck3["default"])(this, Details);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3["default"])(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
      isActive: true,
      removed: null
    }, _this.stop = function (e) {
      e.preventDefault();

      _this.props.dispatch(_store.modal.render(_Confirm2["default"], {
        onFinished: function onFinished() {
          var _this$props$transacti = _this.props.transactions[Number(_this.props.params.id)];

          var id = _this$props$transacti.id;
          var gateway = _this$props$transacti.gateway;


          _this.setState({ isActive: false, removed: id });
          Meteor.call("give/schedule/cancel", { id: id, gateway: gateway }, function (err, response) {
            // console.log(err, response)
          });
        }
      }));
    }, _temp), (0, _possibleConstructorReturn3["default"])(_this, _ret);
  }

  Details.fetchData = function fetchData(getStore, dispatch, props) {
    var id = props.params.id;

    return getTransaction(id, dispatch);
  };

  Details.prototype.componentWillMount = function componentWillMount() {
    this.props.dispatch(_store.nav.setLevel("BASIC_CONTENT"));
  };

  Details.prototype.componentDidMount = function componentDidMount() {
    var id = this.props.params.id;
    var dispatch = this.props.dispatch;

    getTransaction(id, dispatch);
  };

  Details.prototype.componentWillUnmount = function componentWillUnmount() {
    this.props.dispatch(_store.nav.setLevel("TOP"));
    if (this.state.removed) {
      // WUT, need to clean up after launch
      this.props.dispatch(_store2.give.deleteSchedule(this.state.removed));
      this.props.dispatch(_store2.transactions.removeSchedule(this.state.removed));
    }
  };

  Details.prototype.render = function render() {
    var id = Number(this.props.params.id);
    var transaction = this.props.transactions[id];
    var complete = false;

    transaction || (transaction = false);

    if (new Date(transaction.next) < new Date() && transaction.schedule.value === "One-Time") {
      complete = true;
    }

    return React.createElement(_Layout2["default"], {
      stop: this.stop,
      schedule: transaction,
      state: this.state,
      person: this.props.person,
      active: this.state.isActive,
      complete: complete
    });
  };

  return Details;
}(_react.Component)) || _class);
exports["default"] = Details;
module.exports = exports['default'];