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

var _reactMixin = require("react-mixin");

var _reactMixin2 = _interopRequireDefault(_reactMixin);

var _reactRedux = require("react-redux");

var _Item = require("./Item");

var _Item2 = _interopRequireDefault(_Item);

var _store = require("../../../core/store");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var map = function map(state) {
  return { state: state.topics };
};

var FollowingContainer = (_dec = (0, _reactRedux.connect)(map), _dec(_class = function (_Component) {
  (0, _inherits3["default"])(FollowingContainer, _Component);

  function FollowingContainer() {
    var _temp, _this, _ret;

    (0, _classCallCheck3["default"])(this, FollowingContainer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3["default"])(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.topics = ["Articles", "Devotions", "Stories", "Series", "Sermons", "Music"], _this.h7Classes = "flush outlined--light outlined--bottom display-block soft-sides soft-half-top soft-bottom text-center soft-double-sides@lap-and-up soft-double-bottom@lap-and-up", _this.containerClasses = "cell-wrapper push-half-bottom background--light-primary outlined--light outlined--bottom text-dark-secondary", _this.changed = function (id) {
      var topic = _this.topics[id];
      _this.props.dispatch(_store.topics.toggle({ topic: topic }));
      Meteor.call("toggleTopic", topic);
    }, _this.active = function (item) {
      if (_this.props.state.topics) {
        return _this.props.state.topics.indexOf(item) === -1;
      } else {
        return true;
      }
    }, _temp), (0, _possibleConstructorReturn3["default"])(_this, _ret);
  }

  FollowingContainer.prototype.render = function render() {
    var _this2 = this;

    return React.createElement(
      "section",
      { className: "background--light-secondary hard-sides", style: { marginTop: "-20px" } },
      React.createElement(
        "h7",
        { className: this.h7Classes },
        "Personalize your NewSpring Home and follow the types of content you care about."
      ),
      React.createElement(
        "div",
        { className: this.containerClasses },
        this.topics.map(function (contentItem, i) {
          return React.createElement(_Item2["default"], { item: contentItem, switchId: i, key: i, changed: _this2.changed, active: _this2.active(contentItem) });
        })
      )
    );
  };

  return FollowingContainer;
}(_react.Component)) || _class);
exports["default"] = FollowingContainer;
module.exports = exports['default'];