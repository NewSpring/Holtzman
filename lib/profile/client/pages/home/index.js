"use strict";

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _reactRedux = require("react-redux");

var _reactMixin = require("react-mixin");

var _reactMixin2 = _interopRequireDefault(_reactMixin);

var _reactRouter = require("react-router");

var _coreClientLayoutsSplit = require("../../../../core/client/layouts/split");

var map = function map(state) {
  return { auth: state.onBoard.authorized, person: state.onBoard.person };
};

var Home = (function (_Component) {
  _inherits(Home, _Component);

  function Home() {
    _classCallCheck(this, _Home);

    _Component.apply(this, arguments);

    this.settings = function () {
      return React.createElement(
        _reactRouter.Link,
        { to: "/profile/settings", className: "text-light-primary plain soft overlay__item locked-top locked-right" },
        React.createElement("i", { className: "icon-settings h4" })
      );
    };
  }

  Home.prototype.render = function render() {
    var person = this.props.person;
    var PhotoUrl = person.PhotoUrl;

    var photo = PhotoUrl ? "//stock-rock.newspring.cc/" + PhotoUrl : null;
    return React.createElement(
      _coreClientLayoutsSplit.Split,
      { nav: true },
      React.createElement(
        _coreClientLayoutsSplit.Right,
        {
          mobile: true,
          classes: ["floating", "overlay--solid-dark"],
          ratioClasses: ["floating__item", "overlay__item", "one-whole", "text-center"],
          background: photo,
          blur: true,
          outsideRatio: this.settings
        },
        React.createElement(
          "div",
          { className: "soft one-whole" },
          React.createElement("div", {
            className: "background--fill ratio--square round two-fifths display-inline-block",
            style: { backgroundImage: "url(" + photo + ")" }
          }),
          React.createElement(
            "h4",
            { className: "text-light-primary soft-half-top flush-bottom" },
            person.FirstName,
            " ",
            person.LastName
          ),
          React.createElement(
            "p",
            { className: "text-light-primary flush" },
            React.createElement(
              "em",
              null,
              person.Home.City
            )
          )
        )
      ),
      React.createElement(
        _coreClientLayoutsSplit.Left,
        { scroll: true },
        React.createElement("div", { className: "soft soft-double@lap-and-up push-double@lap-wide-and-up" })
      )
    );
  };

  var _Home = Home;
  Home = _reactRedux.connect(map)(Home) || Home;
  return Home;
})(_react.Component);

exports["default"] = Home;
module.exports = exports["default"];