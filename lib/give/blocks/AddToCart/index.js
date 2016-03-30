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

var _dec, _class; /*global serverWatch */


var _react = require("react");

var _reactRedux = require("react-redux");

var _components = require("../../../core/components");

var _store = require("../../store");

var _Layout = require("./Layout");

var _Layout2 = _interopRequireDefault(_Layout);

var _Square = require("./Square");

var _Square2 = _interopRequireDefault(_Square);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// We only care about the give state
var map = function map(state) {
  return { give: state.give };
};

var CartContainer = (_dec = (0, _reactRedux.connect)(map, _store.give), _dec(_class = function (_Component) {
  (0, _inherits3["default"])(CartContainer, _Component);

  function CartContainer() {
    var _temp, _this, _ret;

    (0, _classCallCheck3["default"])(this, CartContainer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3["default"])(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.monentize = function (value, fixed) {

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
      var _this$props$addTransa;

      var id = target.id;
      var name = target.name;


      value = _this.monentize(value);

      _this.props.addTransactions((_this$props$addTransa = {}, _this$props$addTransa[id] = {
        value: Number(value.replace(/[^0-9\.]+/g, '')),
        label: name
      }, _this$props$addTransa));

      return value;
    }, _this.saveData = function (value, target) {
      var _this$props$addTransa2;

      var id = target.id;
      var name = target.name;


      value = _this.monentize(value);

      _this.props.addTransactions((_this$props$addTransa2 = {}, _this$props$addTransa2[id] = {
        value: Number(value.replace(/[^0-9\.]+/g, '')),
        label: name
      }, _this$props$addTransa2));

      return true;
    }, _this.preFillValue = function (id) {
      var _this$props$give = _this.props.give;
      var total = _this$props$give.total;
      var transactions = _this$props$give.transactions;


      if (transactions[id] && transactions[id].value) {
        return "$" + transactions[id].value;
      }

      return null;
    }, _temp), (0, _possibleConstructorReturn3["default"])(_this, _ret);
  }

  CartContainer.prototype.componentWillMount = function componentWillMount() {
    var _this2 = this;

    this.props.clearTransactions();

    if (typeof window != "undefined" && window != null) {
      (function () {
        var match = void 0,
            pl = /\+/g,
            // Regex for replacing addition symbol with a space
        search = /([^&=]+)=?([^&]*)/g,
            decode = function decode(s) {
          return decodeURIComponent(s.replace(pl, " "));
        },
            query = window.location.search.substring(1);

        var urlParams = {};
        while (match = search.exec(query)) {
          urlParams[decode(match[1])] = decode(match[2]);
        }for (var _iterator = _this2.props.accounts, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
          var _ref;

          if (_isArray) {
            if (_i >= _iterator.length) break;
            _ref = _iterator[_i++];
          } else {
            _i = _iterator.next();
            if (_i.done) break;
            _ref = _i.value;
          }

          var account = _ref;

          if (urlParams[account.name]) {
            var _this2$props$addTrans;

            var value = urlParams[account.name];
            var id = account.id;

            value = _this2.monentize(value);

            _this2.props.addTransactions((_this2$props$addTrans = {}, _this2$props$addTrans[id] = {
              value: Number(value.replace(/[^0-9\.]+/g, '')),
              label: account.name
            }, _this2$props$addTrans));
          }
        }
      })();
    }
  };

  CartContainer.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (nextProps.give.state === "success" && this.props.give.state === "success") {
      this.props.clearTransactions();
    }
  };

  CartContainer.prototype.render = function render() {
    var _props$give = this.props.give;
    var total = _props$give.total;
    var transactions = _props$give.transactions;


    var accounts = this.props.accounts.filter(function (x) {
      return x.description && x.image;
      // return true
    }).map(function (x) {
      return {
        label: x.name,
        value: x.id
      };
    });

    /*
       The primary instance of the subfund selector gets an overall copy of
      the entire accounts list. Then each new instance gets a copy of the
      previous list minus the selected account.
     */
    return React.createElement(_Layout2["default"], {
      accounts: accounts,
      save: this.saveData,
      monentize: this.monentize,
      format: this.format,
      preFill: this.preFillValue,
      total: total,
      transactions: (0, _extends3["default"])({}, this.props.give.transactions),
      donate: this.props.donate
    });
  };

  return CartContainer;
}(_react.Component)) || _class);
exports["default"] = CartContainer;
module.exports = exports['default'];