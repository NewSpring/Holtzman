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

var _collections = require("../../collections");

var _modal = require("../../store/modal");

var _modal2 = _interopRequireDefault(_modal);

var _store = require("../../store");

var _Groups = require("./Groups");

var _Groups2 = _interopRequireDefault(_Groups);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var map = function map(state) {
  return { sections: state.sections };
};

var SectionsContainer = (_dec = (0, _reactRedux.connect)(map), _dec(_class = function (_Component) {
  (0, _inherits3["default"])(SectionsContainer, _Component);

  function SectionsContainer() {
    var _temp, _this, _ret;

    (0, _classCallCheck3["default"])(this, SectionsContainer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3["default"])(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.hide = function () {
      return _this.props.dispatch(_modal2["default"].hide());
    }, _temp), (0, _possibleConstructorReturn3["default"])(_this, _ret);
  }

  SectionsContainer.prototype.componentDidMount = function componentDidMount() {
    this.props.dispatch(_store.nav.setLevel("TOP"));
    this.props.dispatch(_modal2["default"].update({ keepNav: true }));
  };

  SectionsContainer.prototype.componentWillUnmount = function componentWillUnmount() {
    this.props.dispatch(_modal2["default"].update({ keepNav: false }));
  };

  SectionsContainer.prototype.render = function render() {
    var count = 0;
    var content = this.props.sections.content;


    var items = [];

    for (var section in content) {
      items.push(content[section]);
    }

    var chunkedItems = [];
    while (items.length) {
      chunkedItems.push(items.splice(0, 2));
    }

    return React.createElement(_Groups2["default"], { items: chunkedItems, hide: this.hide });
  };

  return SectionsContainer;
}(_react.Component)) || _class);
exports["default"] = SectionsContainer;
module.exports = exports['default'];