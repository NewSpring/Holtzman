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

var _reactMixin = require("react-mixin");

var _reactMixin2 = _interopRequireDefault(_reactMixin);

var _graphql = require("../../../core/graphql");

var _modal = require("../../store/modal");

var _modal2 = _interopRequireDefault(_modal);

var _store = require("../../store");

var _Layout = require("./Layout");

var _Layout2 = _interopRequireDefault(_Layout);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var map = function map(state) {
  return { search: state.search };
};
var SearchContainer = (_dec = (0, _reactRedux.connect)(map), _dec(_class = function (_Component) {
  (0, _inherits3["default"])(SearchContainer, _Component);

  function SearchContainer() {
    var _temp, _this, _ret;

    (0, _classCallCheck3["default"])(this, SearchContainer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3["default"])(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.hide = function () {
      return _this.props.dispatch(_modal2["default"].hide());
    }, _this.searchSubmit = function (event) {
      event.preventDefault();
      var dispatch = _this.props.dispatch;

      var term = document.getElementById("search").value;

      // Promise.all([
      //   dispatch(searchActions.searching(true)),
      //   dispatch(searchActions.clear()),
      //   dispatch(searchActions.term(term)),
      //   dispatch(searchActions.toggleLoading()),
      // ]).then(() => {
      //   this.getSearch();
      // });
    }, _this.loadMore = function (event) {
      event.preventDefault();
      var dispatch = _this.props.dispatch;


      dispatch(_store.search.toggleLoading());
      _this.getSearch();
    }, _this.cancel = function (event) {
      event.preventDefault();
      var dispatch = _this.props.dispatch;


      dispatch(_store.search.searching(false));
      document.getElementById("search").value = "";
    }, _temp), (0, _possibleConstructorReturn3["default"])(_this, _ret);
  }

  SearchContainer.prototype.componentWillMount = function componentWillMount() {
    this.props.dispatch(_store.nav.setLevel("TOP"));
    this.props.dispatch(_modal2["default"].update({ keepNav: true }));
  };

  SearchContainer.prototype.componentDidMount = function componentDidMount() {
    var term = this.props.search.term;

    document.getElementById("search").value = term;
  };

  SearchContainer.prototype.componentWillUnmount = function componentWillUnmount() {
    this.props.dispatch(_modal2["default"].update({ keepNav: false, layoutOverride: [] }));
  };

  SearchContainer.prototype.getSearch = function getSearch() {
    var _this2 = this;

    var dispatch = this.props.dispatch;
    var _props$search = this.props.search;
    var page = _props$search.page;
    var pageSize = _props$search.pageSize;
    var term = _props$search.term;


    var query = "\n      {\n        search(query: \"" + term + "\", first: " + pageSize + ", after: " + page * pageSize + ", site: \"https://newspring.cc\") {\n          total\n          items {\n            id\n            title\n            htmlTitle\n            htmlDescription\n            link\n            image\n            displayLink\n            description\n            type\n            section\n          }\n        }\n      }\n    ";

    _graphql.GraphQL.query(query).then(function (_ref) {
      var search = _ref.search;

      dispatch(_store.search.toggleLoading());
      dispatch(_store.search.incrementPage());
      dispatch(_store.search.add(search.items));
      if (search.total === 0) {
        dispatch(_store.search.none(true));
      }
      if (_this2.props.search.items.length >= search.total) {
        dispatch(_store.search.done(true));
      }
    });
  };

  SearchContainer.prototype.render = function render() {
    var search = this.props.search;

    return React.createElement(_Layout2["default"], {
      searchSubmit: this.searchSubmit,
      loadMore: this.loadMore,
      cancel: this.cancel,
      search: search,
      hide: this.hide
    });
  };

  return SearchContainer;
}(_react.Component)) || _class);
exports["default"] = SearchContainer;
module.exports = exports['default'];