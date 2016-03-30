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

var _store = require("../../../../../core/store");

var _accounts = require("../../../../../core/blocks/accounts");

var _accounts2 = _interopRequireDefault(_accounts);

var _graphql = require("../../../../../core/graphql");

var _join = require("../../../../methods/join");

var _routing = require("../../../../../core/store/routing");

var _Layout = require("./Layout");

var _Layout2 = _interopRequireDefault(_Layout);

var _Join = require("./Join");

var _Join2 = _interopRequireDefault(_Join);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var map = function map(state) {
  return {
    person: state.accounts.person,
    authorized: state.accounts.authorized,
    previousLocations: state.routing.location.previous
  };
};
var Profile = (_dec = (0, _reactRedux.connect)(map), _dec(_class = function (_Component) {
  (0, _inherits3["default"])(Profile, _Component);

  function Profile() {
    var _temp, _this, _ret;

    (0, _classCallCheck3["default"])(this, Profile);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3["default"])(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
      profile: null
    }, _this.getProfile = function () {
      var groups = _this.props.groups;
      var groupId = _this.props.params.groupId;


      var profile = false;
      for (var _iterator = groups, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref = _i.value;
        }

        var group = _ref;

        if (Number(group.id) === Number(groupId)) {
          profile = group;
          break;
        }
      }
      return profile;
    }, _this.closeModal = function (e) {
      if (e && e.preventDefault) {
        e.preventDefault();
      }
      _this.props.dispatch(_store.modal.hide());
    }, _this.sendRequest = function (e, callback) {
      e.preventDefault();

      var currentTarget = e.currentTarget;

      var message = currentTarget.querySelectorAll("textarea")[0].value.replace(new RegExp("\\n", "gmi"), "<br/>");
      (0, _join.join)(Number(_this.props.params.groupId), message, callback);
    }, _this.join = function () {

      var join = function join() {
        var profile = _this.getProfile();
        _this.props.dispatch(_store.modal.render(_Join2["default"], {
          group: profile,
          onExit: _this.closeModal,
          onClick: _this.sendRequest,
          person: _this.props.person || {}
        }));
      };

      if (_this.props.authorized) {
        join();
      } else {
        _this.props.dispatch(_store.modal.render(_accounts2["default"], {
          onFinished: join
        }));
      }
    }, _this.handleBack = function (event) {
      var lastLocation = _this.props.previousLocations[_this.props.previousLocations.length - 1];

      if (lastLocation === "/groups/finder/list/" + _this.props.params.hash) {
        event.preventDefault();
        _this.props.dispatch(_routing.routeActions.goBack());
      }
    }, _temp), (0, _possibleConstructorReturn3["default"])(_this, _ret);
  }

  Profile.prototype.componentDidMount = function componentDidMount() {
    this.props.dispatch(_store.nav.setLevel("BASIC_CONTENT"));
  };

  // override view all results link if can go back
  // this preserves scroll state


  Profile.prototype.render = function render() {
    var profile = this.getProfile();

    if (!profile) {
      return null;
    }

    return React.createElement(_Layout2["default"], { group: profile, join: this.join, hash: this.props.params.hash, handleBack: this.handleBack });
  };

  return Profile;
}(_react.Component)) || _class);
exports["default"] = Profile;
module.exports = exports['default'];