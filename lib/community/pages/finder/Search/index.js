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

var _Layout = require("./Layout");

var _Layout2 = _interopRequireDefault(_Layout);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var map = function map(state) {
  return {
    person: state.accounts.person,
    campuses: state.campuses.campuses,
    states: state.collections.states,
    map: state.map
  };
};

var Search = (_dec = (0, _reactRedux.connect)(map), _dec(_class = function (_Component) {
  (0, _inherits3["default"])(Search, _Component);

  function Search() {
    var _temp, _this, _ret;

    (0, _classCallCheck3["default"])(this, Search);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3["default"])(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
      streetAddress: null,
      streetAddress2: null,
      city: null,
      zip: null,
      state: null,
      status: "default",
      campus: null,
      name: null
    }, _this.geocodeAddress = function (e) {
      e.preventDefault();

      var currentTarget = e.currentTarget;
      var _this$state = _this.state;
      var streetAddress = _this$state.streetAddress;
      var city = _this$state.city;
      var zip = _this$state.zip;
      var state = _this$state.state;
      var campus = _this$state.campus;
      var name = _this$state.name;

      // the select component doesn't fire a blur when prefilled from start
      // so we mannualy check to see if it has a value

      state || (state = document.querySelectorAll("[name=\"state\"]")[0].value);

      _this.props.onLoaded(function (maps) {
        var _this$props = _this.props;
        var service = _this$props.service;
        var geocoder = _this$props.geocoder;

        _this.setState({ status: "default" });

        if (streetAddress || city || zip || state) {

          var address = "";
          if (streetAddress) {
            address += streetAddress + ",";
          }
          if (city) {
            address += " " + city + ",";
          }
          if (state) {
            address += " " + state + ",";
          }
          if (zip) {
            address += " " + zip + ",";
          }

          geocoder.geocode({ address: address }, function (results, status) {

            var query = {};
            if (status === "OK") {

              query.lat = results[0].geometry.location.lat(), query.lng = results[0].geometry.location.lng();
            }

            if (campus) {
              _this.props.dispatch(_store.filters.set({ filter: "campus", value: campus }));
              query.campus = campus;
            }

            if (name) {
              query.name = name;
            }

            // clean our previous search results
            _this.props.dispatch(_store.collections.clear("groups"));
            _this.props.search(query);
          });
        } else {

          var query = {};
          if (campus) {
            _this.props.dispatch(_store.filters.set({ filter: "campus", value: campus }));
            query.campus = campus;
          }

          if (name) {
            query.name = name;
          }

          // clean our previous search results
          _this.props.dispatch(_store.collections.clear("groups"));

          _this.props.search(query);
        }
      });
    }, _this.save = function (value, target) {
      var _this$setState;

      var name = target.name;


      _this.setState((_this$setState = {}, _this$setState[name] = value, _this$setState));

      return true;
    }, _temp), (0, _possibleConstructorReturn3["default"])(_this, _ret);
  }

  Search.prototype.componentWillMount = function componentWillMount() {
    this.props.dispatch(_store.nav.setLevel("TOP"));
  };

  Search.prototype.componentDidMount = function componentDidMount() {
    var dispatch = this.props.dispatch;


    var query = "\n      {\n        states: allDefinedValues(id: 28) {\n          name: description\n          value\n          id\n        }\n      }\n    ";

    _graphql.GraphQL.query(query).then(function (_ref) {
      var states = _ref.states;

      var stateObj = {};

      for (var _iterator = states, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref2;

        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref2 = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref2 = _i.value;
        }

        var state = _ref2;

        stateObj[state.id] = state;
      }

      dispatch(_store.collections.insert("states", stateObj));
    });
  };

  Search.prototype.render = function render() {

    var campuses = [];
    for (var campus in this.props.campuses) {
      campuses.push(this.props.campuses[campus]);
    }

    campuses = campuses.map(function (x) {
      return {
        label: x.name,
        value: x.id
      };
    });

    var states = [];
    for (var state in this.props.states) {
      states.push(this.props.states[state]);
    }

    states = states.map(function (x) {
      return {
        label: x.value,
        value: x.value
      };
    });

    // let ready = true
    // for (let key in this.state) {
    //   if (key === "streetAddress2" || key === "status") {
    //     continue
    //   }
    //   if (!this.state[key]) {
    //     ready = false
    //     break
    //   }
    //
    // }

    return React.createElement(_Layout2["default"], {
      geocode: this.geocodeAddress,
      home: this.props.person.home,
      ready: true,
      campuses: campuses,
      states: states,
      save: this.save,
      showError: this.state.status === "error"
    });
  };

  return Search;
}(_react.Component)) || _class);
exports["default"] = Search;
module.exports = exports['default'];