"use strict";

exports.__esModule = true;

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

var _core = require("./../../../core");

var _store = require("../../store");

var _Layout = require("./Layout");

var _Layout2 = _interopRequireDefault(_Layout);

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

var map = function map(state) {
  return { accounts: state.give.accounts };
};

var Template = (_dec = (0, _reactRedux.connect)(map), _dec2 = _reactMixin2["default"].decorate(ReactMeteorData), _dec(_class = _dec2(_class = function (_Component) {
  (0, _inherits3["default"])(Template, _Component);

  function Template() {
    (0, _classCallCheck3["default"])(this, Template);
    return (0, _possibleConstructorReturn3["default"])(this, _Component.apply(this, arguments));
  }

  Template.fetchData = function fetchData(getState, dispatch) {
    return _core.GraphQL.query("\n      {\n       \taccounts: allFinancialAccounts(limit: 100, ttl: 86400) {\n          description\n          name\n          id\n          summary\n          image\n          order\n          images {\n            fileName\n            fileType\n            fileLabel\n            s3\n            cloudfront\n          }\n        }\n      }\n    ").then(function (_ref2) {
      var accounts = _ref2.accounts;

      var accts = [];
      for (var _iterator2 = accounts, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
        var _ref3;

        if (_isArray2) {
          if (_i2 >= _iterator2.length) break;
          _ref3 = _iterator2[_i2++];
        } else {
          _i2 = _iterator2.next();
          if (_i2.done) break;
          _ref3 = _i2.value;
        }

        var account = _ref3;

        account.formatedImage = {};
        if (account.images && account.images.length) {
          for (var _iterator3 = account.images, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
            var _ref4;

            if (_isArray3) {
              if (_i3 >= _iterator3.length) break;
              _ref4 = _iterator3[_i3++];
            } else {
              _i3 = _iterator3.next();
              if (_i3.done) break;
              _ref4 = _i3.value;
            }

            var image = _ref4;

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
      dispatch(_store.give.setAccounts(obj));
    });
  };

  Template.prototype.componentDidMount = function componentDidMount() {
    var dispatch = this.props.dispatch;

    _core.GraphQL.query("\n      {\n       \taccounts: allFinancialAccounts(limit: 100, ttl: 86400) {\n          description\n          name\n          id\n          summary\n          image\n          order\n          images {\n            fileName\n            fileType\n            fileLabel\n            s3\n            cloudfront\n          }\n        }\n      }\n    ").then(function (_ref5) {
      var accounts = _ref5.accounts;

      var accts = [];
      for (var _iterator4 = accounts, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
        var _ref6;

        if (_isArray4) {
          if (_i4 >= _iterator4.length) break;
          _ref6 = _iterator4[_i4++];
        } else {
          _i4 = _iterator4.next();
          if (_i4.done) break;
          _ref6 = _i4.value;
        }

        var account = _ref6;

        account.formatedImage = {};
        if (account.images && account.images.length) {
          for (var _iterator5 = account.images, _isArray5 = Array.isArray(_iterator5), _i5 = 0, _iterator5 = _isArray5 ? _iterator5 : _iterator5[Symbol.iterator]();;) {
            var _ref7;

            if (_isArray5) {
              if (_i5 >= _iterator5.length) break;
              _ref7 = _iterator5[_i5++];
            } else {
              _i5 = _iterator5.next();
              if (_i5.done) break;
              _ref7 = _i5.value;
            }

            var image = _ref7;

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
      dispatch(_store.give.setAccounts(obj));
    });
  };

  Template.prototype.componentWillUnmount = function componentWillUnmount() {
    if (this.handle) {
      this.handle.stop();
    }
  };

  Template.prototype.getMeteorData = function getMeteorData() {
    var alive = true;

    try {
      alive = serverWatch.isAlive("ROCK");
    } catch (e) {}

    return {
      alive: alive
    };
  };

  Template.prototype.render = function render() {
    var accounts = [];
    for (var account in this.props.accounts) {
      accounts.push(this.props.accounts[account]);
    }
    accounts = accounts.sort(function (a, b) {
      a = a.order;
      b = b.order;
      return a < b ? -1 : a > b ? 1 : 0;
    });

    return React.createElement(_Layout2["default"], { accounts: accounts, alive: this.data.alive });
  };

  return Template;
}(_react.Component)) || _class) || _class);


var Routes = [{ path: "now", component: Template }];

exports["default"] = {
  Template: Template,
  Routes: Routes
};
module.exports = exports['default'];