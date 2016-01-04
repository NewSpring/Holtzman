"use strict";

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _reactRouter = require("react-router");

var _reactRedux = require("react-redux");

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _velocityReact = require("velocity-react");

var _reduxSimpleRouter = require('redux-simple-router');

var _actions = require("../../actions");

var Item = (function (_Component) {
  _inherits(Item, _Component);

  function Item() {
    var _this = this;

    _classCallCheck(this, _Item);

    _Component.apply(this, arguments);

    this.state = {
      section: null
    };

    this.expandOrGo = function (e) {
      var id = e.target.id;

      for (var _iterator = _this.props.sections, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref = _i.value;
        }

        var section = _ref;

        if (section._id === id && section.children) {

          e.preventDefault();
          if (_this.state.section != null && _this.state.section._id === id) {
            _this.setState({ section: null });
          } else {
            _this.setState({ section: section });
          }

          return;
        }
      }
      // this.props.dispatch(pushPath())
      _this.props.dispatch(_actions.modal.hide());
    };

    this.item = function (section, i) {

      if (!section) {
        return React.createElement(
          "div",
          { className: "one-half grid__item", key: i },
          React.createElement(
            "div",
            { className: "rounded ratio--square" },
            React.createElement("div", { className: "ratio__item" })
          )
        );
      }

      return React.createElement(
        "div",
        { className: "one-half grid__item push-bottom", key: i },
        React.createElement(
          _reactRouter.Link,
          { to: section.path || section.offsite, className: "plain", onClick: _this.expandOrGo },
          React.createElement(
            "div",
            {
              id: section._id,
              className: "overlay--gradient background--fill background--dark-tertiary rounded ratio--square floating--bottom floating--left",
              style: { backgroundImage: "url(" + section.image + ")" }
            },
            React.createElement(
              "div",
              { className: "overlay__item floating__item ratio__item" },
              React.createElement(
                "h6",
                { className: "text-light-primary soft-left" },
                section.name
              )
            )
          )
        )
      );
    };

    this.children = function () {
      var section = _this.state.section;

      if (!section) {
        return null;
      }

      var children = [];

      for (var child in section.children) {
        children.push(section.children[child]);
      }

      return React.createElement(
        "div",
        { className: "soft-sides soft-top background--dark-primary push-bottom" },
        React.createElement(
          "h4",
          { className: "text-light-primary text-center" },
          section.name
        ),
        React.createElement(
          "div",
          { className: "grid " },
          children.map(function (sectionItem, i) {
            return _this.item(sectionItem, i);
          })
        )
      );
    };
  }

  Item.prototype.render = function render() {
    var sections = this.props.sections;

    return React.createElement(
      "div",
      null,
      React.createElement(
        "div",
        { className: "soft-sides" },
        React.createElement(
          "div",
          { className: "grid" },
          React.createElement(
            "div",
            { className: "grid__item one-whole" },
            React.createElement(
              "div",
              { className: "grid" },
              this.item(sections[0]),
              this.item(sections[1])
            )
          )
        )
      ),
      React.createElement(
        "div",
        { className: "one-whole" },
        React.createElement(
          _velocityReact.VelocityTransitionGroup,
          {
            enter: {
              animation: "slideDown", duration: 250
            },
            leave: {
              animation: "slideUp", duration: 250
            }
          },
          this.children()
        )
      )
    );
  };

  var _Item = Item;
  Item = _reactRedux.connect()(Item) || Item;
  return Item;
})(_react.Component);

exports["default"] = Item;
module.exports = exports["default"];