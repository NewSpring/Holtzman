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

var _graphql = require("../../../core/graphql");

var _authorzied = require("../../../core/blocks/authorzied");

var _authorzied2 = _interopRequireDefault(_authorzied);

var _store = require("../../../core/store");

var _store2 = require("../../store");

var _Details = require("./Details");

var _Details2 = _interopRequireDefault(_Details);

var _Layout = require("./Layout");

var _Layout2 = _interopRequireDefault(_Layout);

var _Confirm = require("./Details/Confirm");

var _Confirm2 = _interopRequireDefault(_Confirm);

var _Recover = require("./Recover");

var _Recover2 = _interopRequireDefault(_Recover);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function mapArrayToObj(array) {
  var obj = {};
  for (var _iterator = array, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
    var _ref;

    if (_isArray) {
      if (_i >= _iterator.length) break;
      _ref = _iterator[_i++];
    } else {
      _i = _iterator.next();
      if (_i.done) break;
      _ref = _i.value;
    }

    var item = _ref;
    obj[item.id] = item;
  }
  return obj;
}

function getSchedules(dispatch) {
  var query = "\n    query ScheduledTransactions($mongoId: String) {\n      transactions: allScheduledFinanicalTransactions(mongoId: $mongoId, cache: false) {\n        numberOfPayments\n        next\n        end\n        id\n        reminderDate\n        code\n        gateway\n        start\n        date\n        details {\n          amount\n          account {\n            name\n            description\n          }\n        }\n        payment {\n          paymentType\n          accountNumber\n          id\n        }\n        schedule {\n          value\n          description\n        }\n      }\n    }\n  ";
  return _graphql.GraphQL.query(query).then(function (_ref2) {
    var transactions = _ref2.transactions;

    var mappedObj = {};

    for (var _iterator2 = transactions, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
      var _ref3;

      if (_isArray2) {
        if (_i2 >= _iterator2.length) break;
        _ref3 = _iterator2[_i2++];
      } else {
        _i2 = _iterator2.next();
        if (_i2.done) break;
        _ref3 = _i2.value;
      }

      var transaction = _ref3;

      mappedObj[transaction.id] = transaction;
    }

    dispatch(_store2.transactions.addSchedule(mappedObj));

    return transactions;
  });
}

function getAccounts(dispatch) {
  return _graphql.GraphQL.query("\n      {\n        accounts: allFinancialAccounts(limit: 100, ttl: 86400) {\n          description\n          name\n          id\n          summary\n          image\n          order\n          images {\n            fileName\n            fileType\n            fileLabel\n            s3\n            cloudfront\n          }\n        }\n      }\n    ").then(function (_ref4) {
    var accounts = _ref4.accounts;

    var accts = [];
    for (var _iterator3 = accounts, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
      var _ref5;

      if (_isArray3) {
        if (_i3 >= _iterator3.length) break;
        _ref5 = _iterator3[_i3++];
      } else {
        _i3 = _iterator3.next();
        if (_i3.done) break;
        _ref5 = _i3.value;
      }

      var account = _ref5;

      account.formatedImage = {};
      if (account.images && account.images.length) {
        for (var _iterator4 = account.images, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
          var _ref6;

          if (_isArray4) {
            if (_i4 >= _iterator4.length) break;
            _ref6 = _iterator4[_i4++];
          } else {
            _i4 = _iterator4.next();
            if (_i4.done) break;
            _ref6 = _i4.value;
          }

          var image = _ref6;

          var img = image.cloudfront ? image.cloudfront : image.s3;
          img || (img = account.image);
          account.formatedImage[image.fileLabel] = img;
        }
      }
      accts.push(account);
    }

    var obj = mapArrayToObj(accts.filter(function (x) {
      return x.summary;
    }));
    dispatch(_store2.give.setAccounts(obj));
  });
}

var map = function map(store) {
  return {
    schedules: store.transactions.scheduledTransactions,
    give: store.give,
    person: store.accounts.person
  };
};

var Template = (_dec = (0, _reactRedux.connect)(map), _dec(_class = function (_Component) {
  (0, _inherits3["default"])(Template, _Component);

  function Template() {
    var _temp, _this, _ret;

    (0, _classCallCheck3["default"])(this, Template);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3["default"])(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
      loaded: true
    }, _this.confirm = function (e) {
      var dataset = e.currentTarget.dataset;
      var id = dataset.id;

      _this.props.dispatch(_store2.give.setRecoverableSchedule(Number(id)));

      return true;
    }, _this.cancel = function (e) {
      var dataset = e.currentTarget.dataset;
      var id = dataset.id;
      var dispatch = _this.props.dispatch;


      _this.props.dispatch(_store.modal.render(_Confirm2["default"], {
        onFinished: function onFinished() {
          dispatch(_store2.give.deleteSchedule(id));

          Meteor.call("give/schedule/cancel", { id: id }, function (err, response) {
            console.log(err, response);
          });
        }
      }));
    }, _temp), (0, _possibleConstructorReturn3["default"])(_this, _ret);
  }

  Template.fetchData = function fetchData(getStore, dispatch) {
    var mongoId = Meteor.userId();

    return getAccounts(dispatch).then(function (accounts) {
      if (mongoId) {
        return getSchedules(dispatch);
        // .then(() => {
        //   this.setState({loaded: true})
        // })
      }
      // this.setState({loaded: true})
    });
  };

  Template.prototype.componentDidMount = function componentDidMount() {
    var _this2 = this;

    var dispatch = this.props.dispatch;


    this.setState({
      loaded: false
    });

    var mongoId = Meteor.userId();

    return getAccounts(dispatch).then(function (accounts) {

      if (mongoId) {
        return getSchedules(dispatch).then(function () {
          _this2.setState({ loaded: true });
        });
      }
      _this2.setState({ loaded: true });
    });
  };

  Template.prototype.render = function render() {
    var _props = this.props;
    var schedules = _props.schedules;
    var give = _props.give;
    var accounts = give.accounts;
    var recoverableSchedules = give.recoverableSchedules;

    var transactions = [];
    for (var transaction in schedules) {
      transactions.push(schedules[transaction]);
    }

    transactions = _.sortBy(transactions, "start").reverse();

    var mappedAccounts = [];
    for (var account in accounts) {
      mappedAccounts.push(accounts[account]);
    }

    mappedAccounts = _.sortBy(mappedAccounts, "order");

    var recovers = [];
    for (var recover in recoverableSchedules) {
      recovers.push(recoverableSchedules[recover]);
    }

    return React.createElement(_Layout2["default"], {
      ready: this.state.loaded,
      schedules: transactions,
      accounts: mappedAccounts,
      cancelSchedule: this.cancel,
      recoverableSchedules: recovers,
      confirm: this.confirm,
      person: this.props.person
    });
  };

  return Template;
}(_react.Component)) || _class);
exports["default"] = Template;


var Routes = [{ path: "schedules", component: Template }, {
  path: "schedules/transfer",
  component: _authorzied2["default"],
  indexRoute: { component: _Recover2["default"] }
}, {
  path: "schedules/:id",
  component: _authorzied2["default"],
  indexRoute: { component: _Details2["default"] }
}];

exports["default"] = {
  Template: Template,
  Routes: Routes
};
module.exports = exports['default'];