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

var _components = require("../../../../core/components");

var _store2 = require("../../../../give/store");

var _Layout = require("./Layout");

var _Layout2 = _interopRequireDefault(_Layout);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var GiveNow = (_dec = (0, _reactRedux.connect)(), _dec(_class = function (_Component) {
  (0, _inherits3["default"])(GiveNow, _Component);

  function GiveNow() {
    var _temp, _this, _ret;

    (0, _classCallCheck3["default"])(this, GiveNow);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3["default"])(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
      accounts: [],
      loaded: false
    }, _this.remove = function (e) {
      e.preventDefault();

      var id = e.target.id;


      var accounts = _this.state.accounts.filter(function (x) {
        return x.id != id;
      });

      _this.setState({ accounts: accounts });
      _this.props.dispatch(_store.collections["delete"]("savedAccounts", Number(id)));
      Meteor.call("PaymentAccounts.remove", id, function (err, response) {
        console.log(err, response);
      });
    }, _temp), (0, _possibleConstructorReturn3["default"])(_this, _ret);
  }

  GiveNow.prototype.componentWillMount = function componentWillMount() {
    this.props.dispatch(_store.nav.setLevel("BASIC_CONTENT"));
  };

  GiveNow.prototype.componentDidMount = function componentDidMount() {
    var _this2 = this;

    var query = "\n      query PaymentDetails($mongoId: String){\n        accounts: allSavedPaymentAccounts(mongoId: $mongoId, cache: false){\n          id\n          name\n          payment {\n            id\n            accountNumber\n            paymentType\n          }\n        }\n      }\n    ";

    return _graphql.GraphQL.query(query).then(function (_ref) {
      var accounts = _ref.accounts;

      _this2.setState({ accounts: accounts, loaded: true });
    });
  };

  GiveNow.prototype.componentWillUnmount = function componentWillUnmount() {
    this.props.dispatch(_store.nav.setLevel("TOP"));
  };

  GiveNow.prototype.render = function render() {

    return React.createElement(_Layout2["default"], { details: this.state.accounts, remove: this.remove });

    // if (!this.state.loaded) {
    //   return (
    //     <div className="locked-ends locked-sides floating">
    //       <div className="floating__item">
    //         <Loading/>
    //       </div>
    //     </div>
    //   )
    // }
    // console.log(this.state)
    // try {
    //   return <Layout details={this.state.accounts} remove={this.remove} />
    // } catch (e) {
    //   console.log(e)
    // }
  };

  return GiveNow;
}(_react.Component)) || _class);
exports["default"] = GiveNow;
module.exports = exports['default'];