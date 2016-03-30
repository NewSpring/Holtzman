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

var _Layout = require("./Layout");

var _Layout2 = _interopRequireDefault(_Layout);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function getTransaction(id, account, dispatch) {
  var mongoId = Meteor.userId();
  var query = "\n    {\n      transaction: finanicalTransaction(id: " + id + ", mongoId: \"" + mongoId + "\") {\n        id\n        date\n        summary\n        details {\n          id\n          amount\n          date\n        }\n        payment {\n         id\n         paymentType\n         accountNumber\n       }\n      }\n      account: financialAccount(id: " + account + ") {\n        id\n        name\n        description\n        summary\n        image\n        end\n        start\n      }\n    }\n  ";

  return _graphql.GraphQL.query(query).then(function (_ref) {
    var _obj;

    var transaction = _ref.transaction;
    var account = _ref.account;

    transaction.account = account;
    var obj = (_obj = {}, _obj[transaction.id] = transaction, _obj);
    dispatch(_store2.transactions.add(obj));
  });
}

var map = function map(state) {
  return {
    person: state.accounts.person,
    transactions: state.transactions.transactions
  };
};

var Details = (_dec = (0, _reactRedux.connect)(map), _dec(_class = function (_Component) {
  (0, _inherits3["default"])(Details, _Component);

  function Details() {
    (0, _classCallCheck3["default"])(this, Details);
    return (0, _possibleConstructorReturn3["default"])(this, _Component.apply(this, arguments));
  }

  Details.fetchData = function fetchData(getStore, dispatch, props) {
    var _props$params = props.params;
    var id = _props$params.id;
    var account = _props$params.account;

    return getTransaction(id, account, dispatch);
  };

  Details.prototype.componentWillMount = function componentWillMount() {
    this.props.dispatch(_store.nav.setLevel("BASIC_CONTENT"));
  };

  Details.prototype.componentDidMount = function componentDidMount() {
    var _props$params2 = this.props.params;
    var id = _props$params2.id;
    var account = _props$params2.account;
    var dispatch = this.props.dispatch;

    getTransaction(id, account, dispatch);
  };

  Details.prototype.componentWillUnmount = function componentWillUnmount() {
    this.props.dispatch(_store.nav.setLevel("TOP"));
  };

  Details.prototype.render = function render() {
    var id = Number(this.props.params.id);
    var transaction = this.props.transactions[id];
    transaction || (transaction = false);
    var account = transaction.account;
    account || (account = {});

    return React.createElement(_Layout2["default"], {
      transaction: transaction,
      person: this.props.person,
      account: account
    });
  };

  return Details;
}(_react.Component)) || _class);
exports["default"] = Details;
module.exports = exports['default'];