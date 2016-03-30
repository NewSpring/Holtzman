"use strict";

exports.__esModule = true;
exports["default"] = undefined;

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _dec, _dec2, _class;

var _react = require("react");

var _reactRedux = require("react-redux");

var _reactMixin = require("react-mixin");

var _reactMixin2 = _interopRequireDefault(_reactMixin);

var _graphql = require("../../../graphql");

var _collections = require("../../../collections");

var _store = require("../../../store");

var _Layout = require("./Layout");

var _Layout2 = _interopRequireDefault(_Layout);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var map = function map(state) {
  return {
    discover: state.collections.discover
  };
};
var Discover = (_dec = (0, _reactRedux.connect)(map), _dec2 = _reactMixin2["default"].decorate(ReactMeteorData), _dec(_class = _dec2(_class = function (_Component) {
  (0, _inherits3["default"])(Discover, _Component);

  function Discover() {
    (0, _classCallCheck3["default"])(this, Discover);
    return (0, _possibleConstructorReturn3["default"])(this, _Component.apply(this, arguments));
  }

  Discover.prototype.componentDidMount = function componentDidMount() {
    var dispatch = this.props.dispatch;


    var query = "\n      {\n        discover: allLowReorderSets(setName: \"promotions_newspring\", ttl: 3600) {\n          title\n          id\n          status\n          meta {\n            urlTitle\n            date\n          }\n          content {\n            images {\n              cloudfront\n              fileName\n              fileLabel\n              s3\n            }\n          }\n        }\n      }\n    ";

    _graphql.GraphQL.query(query).then(function (_ref) {
      var discover = _ref.discover;


      var mappedObj = {};
      for (var _iterator = discover, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref2;

        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref2 = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref2 = _i.value;
        }

        var entry = _ref2;

        mappedObj[entry.id] = entry;
      }

      dispatch(_store.collections.insert("discover", mappedObj));
    });
  };

  Discover.prototype.getMeteorData = function getMeteorData() {
    Meteor.subscribe("recently-liked");
    var likes = _collections.Likes.find({
      userId: {
        $not: Meteor.userId()
      }
    }, { sort: { dateLiked: -1 } }).fetch();

    return {
      popularItems: likes
    };
  };

  Discover.prototype.render = function render() {
    var discover = this.props.discover;

    discover || (discover = {});
    var discoverArr = [];
    for (var dis in discover) {
      discoverArr.push(discover[dis]);
    }

    var featured = discoverArr.filter(function (x) {
      return x.status.toLowerCase() === "featured";
    });
    var open = discoverArr.filter(function (x) {
      return x.status.toLowerCase() === "open";
    });

    var featuredItem = featured[0];
    var recommendedItems = [].concat(featured.slice(1, featured.length - 1));
    var popular = this.data.popularItems;

    var popularItems = [];
    var uniqueIds = [];
    for (var _iterator2 = this.data.popularItems, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
      var _ref3;

      if (_isArray2) {
        if (_i2 >= _iterator2.length) break;
        _ref3 = _iterator2[_i2++];
      } else {
        _i2 = _iterator2.next();
        if (_i2.done) break;
        _ref3 = _i2.value;
      }

      var item = _ref3;

      if (uniqueIds.indexOf(item.entryId) > -1) {
        continue;
      }

      uniqueIds.push(item.entryId);
      popularItems.push(item);
    }

    return React.createElement(_Layout2["default"], {
      featuredItem: featuredItem,
      popularItems: popularItems.slice(0, 5),
      recommendedItems: recommendedItems,
      textItems: open
    });
  };

  return Discover;
}(_react.Component)) || _class) || _class);
exports["default"] = Discover;
module.exports = exports['default'];