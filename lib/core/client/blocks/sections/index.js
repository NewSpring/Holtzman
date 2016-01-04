"use strict";

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _reactRedux = require("react-redux");

var _reactMixin = require("react-mixin");

var _reactMixin2 = _interopRequireDefault(_reactMixin);

var _libCollections = require("../../../lib/collections");

var _actions = require("../../actions");

var _onBoard = require("../on-board");

var _onBoard2 = _interopRequireDefault(_onBoard);

var _sectionsItem = require("./sections.Item");

var _sectionsItem2 = _interopRequireDefault(_sectionsItem);

var map = function map(state) {
  return { sections: state.sections };
};

var bindMeteorPerson = function bindMeteorPerson(props) {
  var set = props.set;

  var handle = {};
  Tracker.autorun(function (computation) {
    // return computation for dismount
    handle = computation;

    // subscribe to sections
    Meteor.subscribe("sections");

    // pull all the sections data
    var sections = _libCollections.Sections.find().fetch();

    var _sections = {};
    for (var _iterator = sections, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var _item = _ref;
      _sections[_item._id] = _item;
    }

    // persist in the store
    set(_sections);
  });

  return { handle: handle };
};

var SectionsContainer = (function (_Component) {
  _inherits(SectionsContainer, _Component);

  function SectionsContainer() {
    _classCallCheck(this, _SectionsContainer);

    _Component.apply(this, arguments);
  }

  SectionsContainer.prototype.componentWillMount = function componentWillMount() {
    var _bindMeteorPerson = bindMeteorPerson(this.props);

    var handle = _bindMeteorPerson.handle;

    this.handle = handle;
  };

  SectionsContainer.prototype.componentWillUnmount = function componentWillUnmount() {
    this.handle.stop();
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

    return React.createElement(
      "section",
      { className: "hard-sides soft-ends" },
      chunkedItems.map(function (sections, i) {
        return React.createElement(_sectionsItem2["default"], { sections: sections, key: i });
      })
    );
  };

  var _SectionsContainer = SectionsContainer;
  SectionsContainer = _reactRedux.connect(map, _actions.sections)(SectionsContainer) || SectionsContainer;
  return SectionsContainer;
})(_react.Component);

exports["default"] = SectionsContainer;
module.exports = exports["default"];