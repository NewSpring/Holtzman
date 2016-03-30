"use strict";

exports.__esModule = true;
exports["default"] = undefined;

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

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

var _Layout = require("./Layout");

var _Layout2 = _interopRequireDefault(_Layout);

var _Details = require("./Details");

var _Details2 = _interopRequireDefault(_Details);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function getTransactions(data, dispatch) {
  var mongoId = data.mongoId;
  var size = data.size;
  var skip = data.skip;

  var query = "\n    {\n      transactions: allFinanicalTransactions(cache: false, mongoId: \"" + mongoId + "\", limit: " + size + ", skip: " + skip + ") {\n        id\n        date\n        status\n        summary\n        details {\n          id\n          amount\n          account {\n            id\n            name\n          }\n          date\n        }\n      }\n    }\n  ";
  return _graphql.GraphQL.query(query).then(function (_ref) {
    var transactions = _ref.transactions;

    var mappedObj = {};

    for (var _iterator = transactions, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref2;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref2 = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref2 = _i.value;
      }

      var transaction = _ref2;

      mappedObj[transaction.id] = transaction;
    }

    dispatch(_store2.transactions.add(mappedObj));

    return transactions;
  });
}

var map = function map(state) {
  return {
    transactions: state.transactions.transactions
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
      page: 0,
      pageSize: 20,
      shouldUpdate: true,
      done: false,
      loaded: false
    }, _this.getData = function () {
      var dispatch = _this.props.dispatch;


      var mongoId = Meteor.userId(),
          size = _this.state.pageSize,
          skip = _this.state.page * size;

      if (_this.state.done) {
        return;
      }

      if (Object.keys(_this.props.transactions).length === (size + 1) * _this.state.pageSize) {
        return;
      }

      if (mongoId) {
        getTransactions({ mongoId: mongoId, skip: skip, size: size }, dispatch).then(function (transactions) {
          var done = false;
          if (transactions.length < size) {
            done = true;
          }
          _this.setState({ done: done, loaded: true });
        });
      }
    }, _this.onScroll = function (e) {
      if (_this.state.done) return;

      var _e$currentTarget = e.currentTarget;
      var scrollHeight = _e$currentTarget.scrollHeight;
      var clientHeight = _e$currentTarget.clientHeight;
      var scrollTop = _e$currentTarget.scrollTop;
      var offsetTop = _e$currentTarget.offsetTop;


      var percentage = void 0;
      if (scrollTop && scrollHeight) {
        percentage = scrollTop / scrollHeight;
      } else if (window.scrollY && document.body.clientHeight) {
        percentage = window.scrollY / document.body.clientHeight;
      }

      if (percentage > 0.5 && _this.state.shouldUpdate) {
        var _ret2 = function () {
          var nextPage = _this.state.page + 1;

          // //
          if (Object.keys(_this.props.transactions).length === (nextPage + 1) * _this.state.pageSize) {
            return {
              v: void 0
            };
          }

          _this.setState({
            page: nextPage,
            shouldUpdate: false
          });

          // wait a bit to prevent paging multiple times
          setTimeout(function () {
            if (nextPage * _this.state.pageSize > Object.keys(_this.props.transactions).length) {
              _this.setState({ done: true, shouldUpdate: false });
            } else {
              _this.setState({ shouldUpdate: true });
            }
          }, 1000);
        }();

        if ((typeof _ret2 === "undefined" ? "undefined" : (0, _typeof3["default"])(_ret2)) === "object") return _ret2.v;
      }
    }, _temp), (0, _possibleConstructorReturn3["default"])(_this, _ret);
  }

  Template.fetchData = function fetchData(getStore, dispatch) {
    var mongoId = Meteor.userId(),
        size = 20,
        skip = 0 * size;

    if (mongoId) {
      return getTransactions({ mongoId: mongoId, skip: skip, size: size }, dispatch);
    }
  };

  // its probably safter to not SSR giving data right?

  Template.prototype.componentDidMount = function componentDidMount() {
    var dispatch = this.props.dispatch;


    this.getData();
  };

  Template.prototype.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
    var _state = this.state;
    var page = _state.page;
    var shouldUpdate = _state.shouldUpdate;


    if (prevState.page === page || prevState.shouldUpdate === shouldUpdate) {
      return;
    }

    this.getData();
  };

  // @TODO fix scroll loading


  Template.prototype.render = function render() {

    var transactions = [];

    for (var transaction in this.props.transactions) {
      transactions.push(this.props.transactions[transaction]);
    }

    transactions = _.sortBy(transactions, "date").reverse();

    return React.createElement(_Layout2["default"], {
      onScroll: this.onScroll,
      state: this.state,
      transactions: transactions,
      alive: true,
      ready: this.state.loaded
    });
  };

  return Template;
}(_react.Component)) || _class);
exports["default"] = Template;


var Routes = [{
  path: "history",
  component: _authorzied2["default"],
  indexRoute: { component: Template },
  childRoutes: [{
    path: ":id/:account",
    component: _Details2["default"]
  }]
}];

exports["default"] = {
  Template: Template,
  Routes: Routes
};
module.exports = exports['default'];