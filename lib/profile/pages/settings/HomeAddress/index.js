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

var _client = require("../../../../core/methods/accounts/client");

var _states = require("../../../../core/components/states");

var _Success = require("../Success");

var _Success2 = _interopRequireDefault(_Success);

var _Layout = require("./Layout");

var _Layout2 = _interopRequireDefault(_Layout);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// @TODO move to saga?
function getUser(id, dispatch) {

  // this is probably to heavy of a universal call?

  // @TODO figure out caching issues?
  var personQuery = "\n    {\n      person(mongoId: \"" + id + "\", cache: false) {\n        age\n        birthdate\n        birthDay\n        birthMonth\n        birthYear\n        campus {\n          name\n          shortCode\n          id\n        }\n        home {\n          city\n          country\n          id\n          zip\n          state\n          street1\n          street2\n        }\n        firstName\n        lastName\n        nickName\n        email\n        phoneNumbers {\n          number\n          formated\n        }\n        photo\n      }\n    }\n  ";

  return _graphql.GraphQL.query(personQuery).then(function (_ref) {
    var person = _ref.person;

    if (person) {
      dispatch(_store.accounts.person(person));
    }
  });
}

var map = function map(state) {
  return {
    person: state.accounts.person,
    campuses: state.campuses.campuses
  };
};
var HomeAddress = (_dec = (0, _reactRedux.connect)(map), _dec(_class = function (_Component) {
  (0, _inherits3["default"])(HomeAddress, _Component);

  function HomeAddress() {
    var _temp, _this, _ret;

    (0, _classCallCheck3["default"])(this, HomeAddress);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3["default"])(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
      state: "default"
    }, _this.updateAddress = function (data) {

      _this.setState({ state: "loading" });

      (0, _client.updateHome)(data, function (err, result) {

        if (err) {
          _this.setState({ state: "error", err: err });
          setTimeout(function () {
            _this.setState({ state: "default" });
          }, 3000);
          return;
        }

        _this.setState({ state: "success" });
        getUser(Meteor.userId(), _this.props.dispatch).then(function () {
          _this.setState({ state: "default" });
        });
      });
    }, _temp), (0, _possibleConstructorReturn3["default"])(_this, _ret);
  }

  HomeAddress.prototype.componentWillMount = function componentWillMount() {
    this.props.dispatch(_store.nav.setLevel("BASIC_CONTENT"));
  };

  HomeAddress.prototype.componentWillUnmount = function componentWillUnmount() {
    this.props.dispatch(_store.nav.setLevel("TOP"));
  };

  HomeAddress.prototype.render = function render() {
    var _props$person = this.props.person;
    var home = _props$person.home;
    var campus = _props$person.campus;
    var state = this.state.state;


    var campuses = [];
    for (var _campus in this.props.campuses) {
      campuses.push(this.props.campuses[_campus]);
    }

    campuses || (campuses = []);
    campuses = campuses.map(function (campus) {
      return { label: campus.name, value: campus.id };
    });

    switch (state) {
      case "error":
        return React.createElement(Err, { msg: "Looks like there was a problem", error: error });
      case "loading":
        return React.createElement(_states.Loading, { msg: "Updating your information..." });
      case "success":
        return React.createElement(_Success2["default"], { msg: "Your information has been updated!" });
      default:
        return React.createElement(_Layout2["default"], { home: home, update: this.updateAddress, campuses: campuses, campus: this.props.person.campus });
    }
  };

  return HomeAddress;
}(_react.Component)) || _class);
exports["default"] = HomeAddress;
module.exports = exports['default'];