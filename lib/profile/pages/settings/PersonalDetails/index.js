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

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var _graphql = require("../../../../core/graphql");

var _collections = require("../../../../core/collections");

var _store = require("../../../../core/store");

var _client = require("../../../../core/methods/accounts/client/");

var _states = require("../../../../core/components/states");

var _Success = require("../Success");

var _Success2 = _interopRequireDefault(_Success);

var _Layout = require("./Layout");

var _Layout2 = _interopRequireDefault(_Layout);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function getCampuses(dispatch) {
  var query = "\n    {\n      campuses: allCampuses {\n        name\n        shortCode\n        id\n        locationId\n      }\n    }\n  ";

  return _graphql.GraphQL.query(query).then(function (_ref) {
    var campuses = _ref.campuses;


    var mappedObj = {};
    for (var _iterator = campuses, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref2;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref2 = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref2 = _i.value;
      }

      var campus = _ref2;

      mappedObj[campus.id] = campus;
    }

    dispatch(_store.campuses.add(mappedObj));
  });
}

// @TODO move to saga?
function getUser(id, dispatch) {

  // this is probably to heavy of a universal call?

  // @TODO figure out caching issues?
  var personQuery = "\n    {\n      person(mongoId: \"" + id + "\", cache: false) {\n        age\n        birthdate\n        birthDay\n        birthMonth\n        birthYear\n        campus(cache: false) {\n          name\n          shortCode\n          id\n        }\n        home {\n          city\n          country\n          id\n          zip\n          state\n          street1\n          street2\n        }\n        firstName\n        lastName\n        nickName\n        email\n        phoneNumbers {\n          number\n          formated\n        }\n        photo\n      }\n    }\n  ";

  return _graphql.GraphQL.query(personQuery).then(function (_ref3) {
    var person = _ref3.person;

    if (person) {
      dispatch(_store.accounts.person(person));
    }
  });
}

var map = function map(state) {
  return {
    person: state.accounts.person
  };
};

var PersonalDetails = (_dec = (0, _reactRedux.connect)(map), _dec(_class = function (_Component) {
  (0, _inherits3["default"])(PersonalDetails, _Component);

  function PersonalDetails() {
    var _temp, _this, _ret;

    (0, _classCallCheck3["default"])(this, PersonalDetails);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3["default"])(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
      month: null,
      state: "default"
    }, _this.getDays = function () {

      var totalDays = (0, _moment2["default"])("1", "M").daysInMonth();
      if (_this.state.month) {
        totalDays = (0, _moment2["default"])(_this.state.month, "M").daysInMonth();
      }

      var arr = [];
      for (var i = 0; i < totalDays; i++) {
        arr.push({ label: i + 1, value: i + 1 });
      }
      return arr;
    }, _this.getMonths = function () {
      return _moment2["default"].monthsShort().map(function (month, i) {
        return { label: month, value: i + 1 };
      });
    }, _this.getYears = function () {
      var now = new Date().getFullYear();

      var arr = [];
      for (var i = 0; i < 150; i++) {
        arr.push({ label: now - i, value: now - i });
      }

      return arr;
    }, _this.saveMonth = function (value) {
      _this.setState({ month: value });

      return true;
    }, _this.updatePerson = function (data) {

      _this.setState({ state: "loading" });

      var refs = _this.refs;
      (0, _client.update)(data, function (err, result) {

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

  PersonalDetails.fetchData = function fetchData(getStore, dispatch) {
    return getCampuses(dispatch);
  };

  PersonalDetails.prototype.componentWillMount = function componentWillMount() {
    this.props.dispatch(_store.nav.setLevel("BASIC_CONTENT"));
  };

  PersonalDetails.prototype.componentDidMount = function componentDidMount() {
    var dispatch = this.props.dispatch;

    return getCampuses(dispatch);
  };

  PersonalDetails.prototype.componentWillUnmount = function componentWillUnmount() {
    this.props.dispatch(_store.nav.setLevel("TOP"));
  };

  PersonalDetails.prototype.render = function render() {
    var state = this.state.state;

    switch (state) {
      case "error":
        return React.createElement(_states.Error, { msg: "Looks like there was a problem" });
      case "loading":
        return React.createElement(_states.Loading, { msg: "Updating your information..." });
      case "success":
        return React.createElement(_Success2["default"], { msg: "Your information has been updated!" });
      default:
        return React.createElement(_Layout2["default"], {
          submit: this.updatePerson,
          months: this.getMonths(),
          saveMonth: this.saveMonth,
          days: this.getDays(),
          years: this.getYears(),
          person: this.props.person
        });
    }
  };

  return PersonalDetails;
}(_react.Component)) || _class);
exports["default"] = PersonalDetails;
module.exports = exports['default'];