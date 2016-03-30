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

var _collections = require("../../../core/collections");

var _components = require("../../../core/components");

var _Item = require("./Item");

var _Item2 = _interopRequireDefault(_Item);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var LikesContainer = (_dec = _reactMixin2["default"].decorate(ReactMeteorData), _dec(_class = function (_Component) {
  (0, _inherits3["default"])(LikesContainer, _Component);

  function LikesContainer() {
    (0, _classCallCheck3["default"])(this, LikesContainer);
    return (0, _possibleConstructorReturn3["default"])(this, _Component.apply(this, arguments));
  }

  LikesContainer.prototype.getMeteorData = function getMeteorData() {
    Meteor.subscribe("likes");
    var likes = _collections.Likes.find({
      userId: Meteor.userId()
    }, { sort: { dateLiked: -1 } }).fetch();

    var recentLikes = _collections.Likes.find({
      userId: {
        $not: Meteor.userId()
      }
    }, { sort: { dateLiked: -1 } }).fetch();

    return {
      likes: likes,
      recentLikes: recentLikes
    };
  };

  LikesContainer.prototype.render = function render() {

    if (!this.data.likes) {
      React.createElement(_components.Loading, null);
    }

    var _data = this.data;
    var likes = _data.likes;
    var recentLikes = _data.recentLikes;


    var ids = [];
    return React.createElement(
      "div",
      { className: "grid soft-top background--light-secondary soft-half-sides soft-double@lap-and-up ", style: { marginTop: "-20px" } },
      likes.map(function (like, i) {
        return React.createElement(_Item2["default"], { like: like, key: i });
      }),
      function () {

        if (!likes.length) {
          return React.createElement(
            "div",
            null,
            React.createElement(
              "p",
              { className: "soft-ends text-center" },
              React.createElement(
                "em",
                null,
                React.createElement(
                  "small",
                  null,
                  "Check out some of the latest things from NewSpring"
                )
              )
            ),
            recentLikes.map(function (like, i) {

              if (ids.indexOf(like.entryId) > -1) {
                return;
              }

              ids.push(like.entryId);
              return React.createElement(_Item2["default"], { like: like, key: i });
            })
          );
        }
      }()
    );
  };

  return LikesContainer;
}(_react.Component)) || _class);
exports["default"] = LikesContainer;
module.exports = exports['default'];