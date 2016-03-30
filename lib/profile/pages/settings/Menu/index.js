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

var _reactRouter = require("react-router");

var _graphql = require("../../../../core/graphql");

var _store = require("../../../../core/store");

var _client = require("../../../../core/methods/files/client");

var _inAppLink = require("../../../../core/util/inAppLink");

var _inAppLink2 = _interopRequireDefault(_inAppLink);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function updateUser(id, dispatch) {
  var personQuery = "\n    {\n      person(mongoId: \"" + id + "\", cache: false) {\n        age\n        birthdate\n        birthDay\n        birthMonth\n        birthYear\n        campus {\n          name\n          shortCode\n          id\n        }\n        home {\n          city\n          country\n          id\n          zip\n          state\n          street1\n          street2\n        }\n        firstName\n        lastName\n        nickName\n        email\n        phoneNumbers {\n          number\n          formated\n        }\n        photo\n      }\n    }\n  ";

  return _graphql.GraphQL.query(personQuery).then(function (person) {
    dispatch(_store.accounts.person(person.person));
  });
}

var Header = function Header() {
  return React.createElement(
    "div",
    { className: "soft text-center background--light-primary outlined--light outlined--bottom", style: { position: "relative" } },
    React.createElement(
      "h5",
      { className: "soft-left display-inline-block flush" },
      "Settings"
    ),
    React.createElement(
      _reactRouter.Link,
      { to: "/profile", className: "visuallyhidden@lap-and-up soft locked-top locked-right floating" },
      React.createElement(
        "h6",
        { className: "plain floating__item flush" },
        "Done"
      )
    )
  );
};

var RenderCell = function RenderCell(_ref) {
  var name = _ref.name;
  var iconFunc = _ref.iconFunc;
  var last = _ref.last;
  var children = _ref.children;

  var icon = "icon-arrow-next";
  if (typeof iconFunc === "function") {
    icon = iconFunc();
  }
  if (Meteor.isCordova) {
    var classes = ["push-left", "soft-ends", "soft-right", "text-left"];
    if (!last) classes.push("outlined--light", "outlined--bottom");
    return React.createElement(
      "div",
      { className: classes.join(" ") },
      React.createElement(
        "h6",
        { className: "soft-half-left flush display-inline-block" },
        name
      ),
      React.createElement("i", { className: "float-right " + icon }),
      children
    );
  } else {
    return React.createElement(
      "div",
      { className: "card soft-ends soft-right text-left outlined--light" },
      React.createElement(
        "h6",
        { className: "soft-left flush display-inline-block" },
        name
      ),
      React.createElement("i", { className: "float-right " + icon }),
      children
    );
  }
};

var Menu = (_dec = (0, _reactRedux.connect)(), _dec(_class = (_temp2 = _class2 = function (_Component) {
  (0, _inherits3["default"])(Menu, _Component);

  function Menu() {
    var _temp, _this, _ret;

    (0, _classCallCheck3["default"])(this, Menu);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3["default"])(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
      upload: "default"
    }, _this.signout = function (e) {
      e.preventDefault();

      Meteor.logout();
    }, _this.upload = function (e) {
      var _headers;

      e.preventDefault();

      var files = e.target.files;

      if (!Meteor.settings["public"].rock) {
        return;
      }

      _this.setState({
        upload: "loading"
      });
      var data = new FormData();
      data.append('file', files[0]);

      var _Meteor$settings$publ = Meteor.settings["public"].rock;
      var baseURL = _Meteor$settings$publ.baseURL;
      var token = _Meteor$settings$publ.token;
      var tokenName = _Meteor$settings$publ.tokenName;


      fetch(baseURL + "api/BinaryFiles/Upload?binaryFileTypeId=5", {
        method: 'POST',
        headers: (_headers = {}, _headers[tokenName] = token, _headers),
        body: data
      }).then(function (response) {
        return response.json();
      }).then(function (id) {
        (0, _client.avatar)(id, function (err, response) {
          updateUser(Meteor.userId(), _this.props.dispatch).then(function (result) {
            _this.setState({
              upload: "uploaded"
            });

            setTimeout(function () {
              _this.setState({
                upload: "default"
              });
            }, 2000);
          });
        });
      });
    }, _this.uploadIcon = function () {
      switch (_this.state.upload) {
        case "default":
          return "icon-arrow-next";
        case "loading":
          // @TODO replace with loading icon
          return "icon-leaf-outline";
        case "uploaded":
          // @TODO replace with loading icon
          return "icon-check-mark text-primary";
      }
    }, _this.sectionClasses = function () {
      if (Meteor.isCordova) {
        return "hard";
      }
    }, _this.dividerClasses = function () {
      var classes = ["push-double-ends"];

      if (Meteor.isCordova) classes.push("background--light-primary");

      return classes.join(" ");
    }, _this.outlineClasses = function () {
      if (Meteor.isCordova) {
        return "outlined--light one-whole";
      }
    }, _temp), (0, _possibleConstructorReturn3["default"])(_this, _ret);
  }

  Menu.prototype.render = function render() {
    return React.createElement(
      "div",
      { className: "background--light-secondary soft-double-bottom soft-double-sides@lap-and-up" },
      function () {
        if (Meteor.isCordova) {
          return React.createElement(Header, null);
        }
      }(),
      React.createElement(
        "section",
        { className: this.sectionClasses() },
        React.createElement(
          "div",
          { className: this.dividerClasses() },
          React.createElement(
            "div",
            { className: this.outlineClasses(), style: { borderLeft: 0, borderRight: 0 } },
            React.createElement(
              _reactRouter.Link,
              { to: "/profile/settings/personal-details", className: "plain text-dark-secondary" },
              React.createElement(RenderCell, { name: "Personal Details" })
            ),
            React.createElement(
              _reactRouter.Link,
              { to: "/profile/settings/home-address", className: "plain text-dark-secondary" },
              React.createElement(RenderCell, { name: "My Address" })
            ),
            React.createElement(
              "button",
              { className: "plain text-dark-secondary display-inline-block one-whole", style: { position: "relative" } },
              React.createElement(
                RenderCell,
                { name: "Change Profile Photo", iconFunc: this.uploadIcon },
                React.createElement("input", { onChange: this.upload, type: "file", className: "locked-ends locked-sides", style: { opacity: 0, zIndex: 1 } })
              )
            ),
            React.createElement(
              _reactRouter.Link,
              { to: "/profile/settings/change-password", className: "plain text-dark-secondary" },
              React.createElement(RenderCell, { name: "Change Password", last: true })
            )
          )
        ),
        React.createElement(
          "div",
          { className: this.dividerClasses() },
          React.createElement(
            "div",
            { className: this.outlineClasses(), style: { borderLeft: 0, borderRight: 0 } },
            React.createElement(
              _reactRouter.Link,
              { to: "/profile/settings/saved-accounts", className: "plain text-dark-secondary" },
              React.createElement(RenderCell, { name: "Saved Accounts" })
            ),
            React.createElement(
              _reactRouter.Link,
              { to: "/give/schedules", className: "plain text-dark-secondary" },
              React.createElement(RenderCell, { name: "Scheduled Contributions" })
            ),
            React.createElement(
              _reactRouter.Link,
              { to: "/give/history", className: "plain text-dark-secondary" },
              React.createElement(RenderCell, { name: "Giving History", last: true })
            )
          )
        ),
        React.createElement(
          "div",
          { className: this.dividerClasses() },
          React.createElement(
            "div",
            { className: this.outlineClasses(), style: { borderLeft: 0, borderRight: 0 } },
            React.createElement(
              "a",
              { href: "//newspring.cc/privacy", onClick: _inAppLink2["default"], target: "_blank", className: "plain text-dark-secondary" },
              React.createElement(RenderCell, { name: "Privacy Policy" })
            ),
            React.createElement(
              "a",
              { href: "//newspring.cc/terms", onClick: _inAppLink2["default"], target: "_blank", className: "plain text-dark-secondary" },
              React.createElement(RenderCell, { name: "Terms of Use", last: true })
            )
          )
        ),
        React.createElement(
          "div",
          { className: "one-whole text-center push-double-bottom" },
          React.createElement(
            "button",
            { onClick: this.signout, className: "btn--dark-tertiary push-top soft-half-ends" },
            "Sign Out"
          )
        )
      )
    );
  };

  return Menu;
}(_react.Component), _class2.contextTypes = {
  shouldAnimate: _react.PropTypes.bool
}, _temp2)) || _class);
exports["default"] = Menu;
module.exports = exports['default'];