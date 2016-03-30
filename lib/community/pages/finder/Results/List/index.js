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
// import { VelocityComponent } from "velocity-react"

var _react = require("react");

var _reactRedux = require("react-redux");

var _store = require("../../../../../core/store");

var _meta = require("../../../../../core/components/meta");

var _meta2 = _interopRequireDefault(_meta);

var _List = require("./List");

var _List2 = _interopRequireDefault(_List);

var _Filter = require("./Filter");

var _Filter2 = _interopRequireDefault(_Filter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var map = function map(state) {
  return {
    campuses: state.campuses.campuses,
    defaultFilters: state.filters
  };
};

var ListView = (_dec = (0, _reactRedux.connect)(map), _dec(_class = (_temp2 = _class2 = function (_Component) {
  (0, _inherits3["default"])(ListView, _Component);

  function ListView() {
    var _temp, _this, _ret;

    (0, _classCallCheck3["default"])(this, ListView);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3["default"])(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
      showFilters: false
    }, _this.toggleFilters = function (e) {
      e.preventDefault();
      _this.setState({
        showFilters: !_this.state.showFilters
      });
    }, _temp), (0, _possibleConstructorReturn3["default"])(_this, _ret);
  }

  ListView.prototype.componentWillMount = function componentWillMount() {
    this.props.dispatch(_store.nav.setLevel("BASIC_CONTENT"));
  };

  ListView.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props;
    var topics = _props.topics;
    var filter = _props.filter;
    var onClick = _props.onClick;
    var groups = _props.groups;
    var hash = _props.hash;
    var count = _props.count;
    var showMore = _props.showMore;
    var status = _props.status;
    var onHover = _props.onHover;
    var done = _props.done;


    var campuses = [{
      id: -1,
      name: "All Campuses"
    }];

    for (var campus in this.props.campuses) {
      campuses.push(this.props.campuses[campus]);
    }

    campuses = campuses.map(function (x) {
      return {
        label: x.name,
        value: x.id
      };
    });

    return React.createElement(
      "div",
      null,
      React.createElement(_meta2["default"], { title: "Group Results" }),
      React.createElement(
        _List2["default"],
        {
          groups: groups,
          onClick: onClick,
          hash: hash,
          showFilters: this.toggleFilters,
          filter: this.state.showFilters,
          count: count,
          showMore: showMore,
          status: status,
          done: done,
          onHover: onHover
        },
        function () {
          if (_this2.state.showFilters) {
            return React.createElement(_Filter2["default"], {
              topics: topics,
              filter: filter,
              campuses: campuses,
              defaultFilters: _this2.props.defaultFilters
            });
          }
        }()
      )
    );
  };

  return ListView;
}(_react.Component), _class2.contextTypes = {
  shouldAnimate: _react.PropTypes.bool
}, _temp2)) || _class);
exports["default"] = ListView;
module.exports = exports['default'];