"use strict";

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _reactRouter = require("react-router");

var _reactRedux = require("react-redux");

var _coreClientLayoutsSplit = require("../../../../core/client/layouts/split");

var _coreClientActions = require("../../../../core/client/actions");

var _settingsMenu = require("./settings.menu");

var _settingsMenu2 = _interopRequireDefault(_settingsMenu);

var _settingsChangePassword = require("./settings.change-password");

var _settingsChangePassword2 = _interopRequireDefault(_settingsChangePassword);

var _settingsPersonalDetails = require("./settings.personal-details");

var _settingsPersonalDetails2 = _interopRequireDefault(_settingsPersonalDetails);

var _settingsHomeAddress = require("./settings.home-address");

var _settingsHomeAddress2 = _interopRequireDefault(_settingsHomeAddress);

var _settingsPayments = require("./settings.payments");

var _settingsPayments2 = _interopRequireDefault(_settingsPayments);

var _settingsPrivacyPolicy = require("./settings.privacy-policy");

var _settingsPrivacyPolicy2 = _interopRequireDefault(_settingsPrivacyPolicy);

var map = function map(state) {
  return { person: state.onBoard.person };
};

var Template = (function (_Component) {
  _inherits(Template, _Component);

  function Template() {
    _classCallCheck(this, _Template);

    _Component.apply(this, arguments);

    this.close = function () {
      return React.createElement(
        _reactRouter.Link,
        { to: "/profile", className: "text-light-primary plain soft overlay__item locked-top locked-right" },
        React.createElement("i", { className: "icon-close h4" })
      );
    };
  }

  Template.prototype.render = function render() {
    var person = this.props.person;
    var PhotoUrl = person.PhotoUrl;

    var photo = PhotoUrl ? "//stock-rock.newspring.cc/" + PhotoUrl : null;
    return React.createElement(
      _coreClientLayoutsSplit.Split,
      { nav: true },
      React.createElement(
        _coreClientLayoutsSplit.Right,
        {
          mobile: false,
          classes: ["floating", "overlay--solid-dark"],
          ratioClasses: ["floating__item", "overlay__item", "one-whole", "text-center"],
          background: photo,
          blur: true,
          outsideRatio: this.close
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
            person.NickName || person.FirstName,
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
        { scroll: true, classes: ["locked-ends locked-sides"] },
        this.props.children
      )
    );
  };

  var _Template = Template;
  Template = _reactRedux.connect(map)(Template) || Template;
  return Template;
})(_react.Component);

var Routes = [{
  path: "settings",
  component: Template,
  indexRoute: {
    component: _settingsMenu2["default"]
  },
  childRoutes: [{ path: "change-password", component: _settingsChangePassword2["default"] }, { path: "personal-details", component: _settingsPersonalDetails2["default"] }, { path: "home-address", component: _settingsHomeAddress2["default"] }, { path: "saved-accounts", component: _settingsPayments2["default"] }, { path: "privacy-policy", component: _settingsPrivacyPolicy2["default"] }]
}];

exports["default"] = {
  Template: Template,
  Routes: Routes
};
module.exports = exports["default"];