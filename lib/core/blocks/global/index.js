"use strict";

exports.__esModule = true;
exports["default"] = undefined;

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _dec, _class, _class2, _temp2;

var _react = require("react");

var _reactRedux = require("react-redux");

var _graphql = require("../../graphql");

var _nav = require("../nav");

var _nav2 = _interopRequireDefault(_nav);

var _modal = require("../modal");

var _modal2 = _interopRequireDefault(_modal);

var _collections = require("../../collections");

var _meta = require("../../components/meta");

var _meta2 = _interopRequireDefault(_meta);

var _store = require("../../store");

var _Styles = {
  "global-watermark": "Styles__global-watermark___2UC9o",
  "watermark": "Styles__watermark___1jj-1"
};

var _Styles2 = _interopRequireDefault(_Styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Watermark = function Watermark() {
  return React.createElement(
    "div",
    { className: _Styles2["default"]["global-watermark"] },
    React.createElement(
      "h4",
      { className: "soft-half flush text-light-primary uppercase watermark " + _Styles2["default"]["watermark"] + " visuallyhidden@handheld" },
      "NewSpring"
    )
  );
};

var App = function App(_ref) {
  var children = _ref.children;
  var className = _ref.className;
  return React.createElement(
    "div",
    { className: " push-double-bottom@handheld soft-bottom@handheld push-double-left@lap-and-up soft-double-left@lap-and-up "
    },
    React.createElement(
      "div",
      { className: className },
      React.createElement(_meta2["default"], null),
      children,
      React.createElement(_modal2["default"], null),
      React.createElement(_nav2["default"], null),
      React.createElement(Watermark, null)
    )
  );
};

// @TODO move to saga?
function getUser(id, dispatch) {

  // this is probably to heavy of a universal call?

  // @TODO figure out caching issues?
  var personQuery = "\n    {\n      person(mongoId: \"" + id + "\", cache: false) {\n        age\n        birthdate\n        birthDay\n        birthMonth\n        birthYear\n        campus {\n          name\n          shortCode\n          id\n        }\n        home {\n          city\n          country\n          id\n          zip\n          state\n          street1\n          street2\n        }\n        firstName\n        lastName\n        nickName\n        email\n        phoneNumbers {\n          number\n          formated\n        }\n        photo\n      }\n    }\n  ";

  return _graphql.GraphQL.query(personQuery).then(function (_ref2) {
    var person = _ref2.person;

    if (person) {
      dispatch(_store.accounts.person(person));
    }
  });
}

function bindLogout(dispatch) {
  var handle = {};

  Tracker.autorun(function (computation) {
    handle = computation;
    var user = Meteor.userId();

    if (user) {

      return getUser(user, dispatch);
    }

    dispatch(_store.accounts.signout());
  });

  return handle;
}

function prefillRedux(dispatch) {
  Tracker.autorun(function (computation) {

    Meteor.subscribe("recently-liked");

    if (Meteor.userId()) {
      Meteor.subscribe("userData");
      var topics = Meteor.user() ? Meteor.user().topics : [];
      if (topics && topics.length) {
        dispatch(_store.topics.set(topics));
      }

      Meteor.subscribe("likes");
      var likes = _collections.Likes.find({
        userId: Meteor.userId()
      }).fetch().map(function (like) {
        return like.entryId;
      });
      if (likes.length) {
        dispatch(_store.liked.set(likes));
      }
    }
  });
}

var Global = (_dec = (0, _reactRedux.connect)(), _dec(_class = (_temp2 = _class2 = function (_Component) {
  (0, _inherits3["default"])(Global, _Component);

  function Global() {
    var _temp, _this, _ret;

    (0, _classCallCheck3["default"])(this, Global);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3["default"])(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
      shouldAnimate: false
    }, _temp), (0, _possibleConstructorReturn3["default"])(_this, _ret);
  }

  Global.prototype.getChildContext = function getChildContext() {
    return {
      shouldAnimate: this.state.shouldAnimate
    };
  };

  Global.prototype.componentDidMount = function componentDidMount() {
    this.setState({ shouldAnimate: true });
    var dispatch = this.props.dispatch;

    var user = Meteor.userId();

    if (!this.handle) {
      this.handle = bindLogout(dispatch);
    }

    prefillRedux(dispatch);

    var query = "\n      {\n        campuses: allCampuses {\n          name\n          shortCode\n          id\n          locationId\n          guid\n        }\n      }\n    ";

    _graphql.GraphQL.query(query).then(function (_ref3) {
      var campuses = _ref3.campuses;


      var mappedObj = {};
      for (var _iterator = campuses, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref4;

        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref4 = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref4 = _i.value;
        }

        var campus = _ref4;

        mappedObj[campus.id] = campus;
      }

      dispatch(_store.campuses.add(mappedObj));
    });
  };

  Global.prototype.componentWillUnmount = function componentWillUnmount() {
    if (this.handle) {
      this.handle.stop();
    }
  };

  Global.prototype.render = function render() {
    return React.createElement(App, this.props);
  };

  return Global;
}(_react.Component), _class2.childContextTypes = {
  shouldAnimate: _react.PropTypes.bool
}, _temp2)) || _class);
exports["default"] = Global;
module.exports = exports['default'];