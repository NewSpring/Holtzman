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

var _components = require("../../../core/components");

var _store = require("../../../core/store");

var _store2 = require("../../store");

var _Layout = require("./Layout");

var _Layout2 = _interopRequireDefault(_Layout);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var map = function map(state) {
  return { accounts: state.give.accounts };
};

function getAccounts(name, dispatch) {

  var query = "\n    {\n      act: financialAccount(name: \"" + name + "\", cache: false) {\n        description\n        name\n        id\n        summary\n        image\n        images {\n          fileName\n          fileType\n          fileLabel\n          s3\n          cloudfront\n        }\n      }\n    }\n  ";

  return _graphql.GraphQL.query(query).then(function (_ref) {
    var _giveActions$setAccou;

    var act = _ref.act;

    var accounts = [act];
    var accts = [];
    for (var _iterator = accounts, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref2;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref2 = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref2 = _i.value;
      }

      var account = _ref2;

      account.formatedImage = {};
      if (account.images && account.images.length) {
        for (var _iterator2 = account.images, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
          var _ref3;

          if (_isArray2) {
            if (_i2 >= _iterator2.length) break;
            _ref3 = _iterator2[_i2++];
          } else {
            _i2 = _iterator2.next();
            if (_i2.done) break;
            _ref3 = _i2.value;
          }

          var image = _ref3;

          var img = image.cloudfront ? image.cloudfront : image.s3;
          img || (img = account.image);
          account.formatedImage[image.fileLabel] = img;
        }
      }
      accts.push(account);
    }

    accts = accts.filter(function (x) {
      return x.summary;
    });
    var obj = accts[0];
    dispatch(_store2.give.setAccounts((_giveActions$setAccou = {}, _giveActions$setAccou[obj.id] = obj, _giveActions$setAccou)));
  });
}

function getAccount(name, accounts) {
  for (var account in accounts) {

    if (accounts[account].name === name) {
      return accounts[account];
    }
  }

  return false;
}

var Template = (_dec = (0, _reactRedux.connect)(map), _dec(_class = function (_Component) {
  (0, _inherits3["default"])(Template, _Component);

  function Template() {
    var _temp, _this, _ret;

    (0, _classCallCheck3["default"])(this, Template);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3["default"])(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.accounts = function (dispatch) {
      var name = decodeURI(_this.props.params.name);
      var account = getAccount(name, _this.props.accounts);

      if (!account) {
        var query = "\n        {\n          act: financialAccount(name: \"" + name + "\") {\n            description\n            name\n            id\n            summary\n            image\n            images {\n              fileName\n              fileType\n              fileLabel\n              s3\n              cloudfront\n            }\n          }\n        }\n      ";

        return _graphql.GraphQL.query(query).then(function (_ref4) {
          var _giveActions$setAccou2;

          var act = _ref4.act;

          var accounts = [act];
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

            var _account = _ref5;

            _account.formatedImage = {};
            if (_account.images && _account.images.length) {
              for (var _iterator4 = _account.images, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
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
                img || (img = _account.image);
                _account.formatedImage[image.fileLabel] = img;
              }
            }
            accts.push(_account);
          }

          accts = accts.filter(function (x) {
            return x.summary;
          });
          var obj = accts[0];
          dispatch(_store2.give.setAccounts((_giveActions$setAccou2 = {}, _giveActions$setAccou2[obj.id] = obj, _giveActions$setAccou2)));
        });
        // .then(result => {
        //   let obj = { [result.account.id]: result.account }
        //   dispatch(giveActions.setAccounts(obj))
        // })
      }
    }, _temp), (0, _possibleConstructorReturn3["default"])(_this, _ret);
  }

  Template.fetchData = function fetchData(getStore, dispatch, props) {
    var name = decodeURI(props.params.name);
    var store = getStore();

    if (!getAccount(name, store.give.accounts)) {
      return getAccounts(name, dispatch);
    }

    return;
  };

  Template.prototype.componentWillMount = function componentWillMount() {

    this.props.dispatch(_store.nav.setLevel("BASIC_CONTENT"));
  };

  Template.prototype.componentDidMount = function componentDidMount() {
    var dispatch = this.props.dispatch;


    return this.accounts(dispatch);
  };

  Template.prototype.componentWillUnmount = function componentWillUnmount() {
    this.props.dispatch(_store.nav.setLevel("TOP"));
  };

  Template.prototype.render = function render() {

    var account = getAccount(decodeURI(this.props.params.name), this.props.accounts);
    if (!account) {
      return React.createElement(_components.Loading, null);
    }

    return React.createElement(_Layout2["default"], { account: account });
  };

  return Template;
}(_react.Component)) || _class);
exports["default"] = Template;


var Routes = [{ path: "campaign/:name", component: Template }];

exports["default"] = {
  Template: Template,
  Routes: Routes
};
module.exports = exports['default'];