"use strict";

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _reactRedux = require("react-redux");

var _reactRouter = require("react-router");

var _reactMixin = require("react-mixin");

var _reactMixin2 = _interopRequireDefault(_reactMixin);

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var _velocityReact = require("velocity-react");

var _coreClientComponents = require("../../../../core/client/components");

var _coreClientComponentsLoading = require("../../../../core/client/components/loading");

var _rockLibCollections = require("../../../../rock/lib/collections");

var _coreClientActions = require("../../../../core/client/actions");

var _rockClientMethodsAuth = require("../../../../rock/client/methods/auth");

var map = function map(state) {
  return { person: state.onBoard.person };
};

var HomeAddress = (function (_Component) {
  _inherits(HomeAddress, _Component);

  function HomeAddress() {
    var _this = this;

    _classCallCheck(this, _HomeAddress);

    _Component.apply(this, arguments);

    this.state = {
      state: "default"
    };

    this.updateAddress = function (e) {
      e.preventDefault();

      var data = {};
      for (var ref in _this.refs) {
        var value = _this.refs[ref].getValue();
        var number = Number(value);
        if (number) {
          value = number;
        }

        data[ref] = value;
      }

      _this.setState({ state: "loading" });

      var refs = _this.refs;
      _rockClientMethodsAuth.updateHome(data, function (err, result) {

        if (err) {
          _this.setState({ state: "error", err: err });
          setTimeout(function () {
            _this.setState({ state: "default" });
          }, 3000);
          return;
        }

        _this.setState({ state: "success" });

        setTimeout(function () {
          _this.setState({ state: "default" });
        }, 3000);
      });
    };
  }

  HomeAddress.prototype.componentWillMount = function componentWillMount() {
    this.props.dispatch(_coreClientActions.nav.setLevel("CONTENT"));
  };

  HomeAddress.prototype.componentWillUnmount = function componentWillUnmount() {
    this.props.dispatch(_coreClientActions.nav.setLevel("TOP"));
  };

  HomeAddress.prototype.render = function render() {
    var _props$person$Home = this.props.person.Home;
    var City = _props$person$Home.City;
    var Country = _props$person$Home.Country;
    var PostalCode = _props$person$Home.PostalCode;
    var State = _props$person$Home.State;
    var Street1 = _props$person$Home.Street1;
    var Street2 = _props$person$Home.Street2;

    if (this.state.state === "error") {

      return React.createElement(
        _velocityReact.VelocityComponent,
        {
          animation: "transition.fadeIn",
          runOnMount: true
        },
        React.createElement(
          _coreClientComponentsLoading.WindowLoading,
          { classes: ["background--alert"] },
          React.createElement(
            "div",
            { className: "locked-top locked-bottom one-whole floating" },
            React.createElement(
              "div",
              { className: "floating__item" },
              React.createElement(
                "h4",
                { className: "text-light-primary" },
                "Looks like there was a problem :("
              ),
              React.createElement(
                "p",
                { className: "text-light-primary" },
                this.state.err.error
              )
            )
          )
        )
      );
    }

    if (this.state.state === "loading") {
      return React.createElement(
        _velocityReact.VelocityComponent,
        {
          animation: "transition.fadeIn",
          runOnMount: true
        },
        React.createElement(
          _coreClientComponentsLoading.WindowLoading,
          { classes: ["background--primary"] },
          React.createElement(
            "div",
            { className: "locked-top locked-bottom one-whole floating" },
            React.createElement(
              "div",
              { className: "floating__item" },
              React.createElement(
                "h4",
                { className: "text-light-primary" },
                "Updating your information..."
              )
            )
          )
        )
      );
    }

    if (this.state.state === "success") {
      return React.createElement(
        "div",
        { className: "one-whole text-center push-double-top soft-double-top@lap-and-up" },
        React.createElement(
          "h4",
          null,
          "Your information has been updated!"
        )
      );
    }

    return React.createElement(
      "div",
      { className: "one-whole text-center push-double-top@lap-and-up" },
      React.createElement(
        _coreClientComponents.Forms.Form,
        {
          id: "reset-password",
          classes: ["soft", "one-whole", "two-thirds@portable", "one-half@anchored", "display-inline-block"],
          submit: this.updateAddress
        },
        React.createElement(
          "div",
          { className: "push-double" },
          React.createElement(
            "h4",
            { className: "text-center" },
            "My Home Address"
          )
        ),
        React.createElement(_coreClientComponents.Forms.Input, {
          name: "Street1",
          label: "Street",
          ref: "Street1",
          type: "text",
          defaultValue: Street1
        }),
        React.createElement(_coreClientComponents.Forms.Input, {
          name: "Street2",
          label: "Street 2 (Optional)",
          ref: "Street2",
          type: "text",
          defaultValue: Street2
        }),
        React.createElement(
          "div",
          { className: "grid" },
          React.createElement(
            "div",
            { className: "grid__item two-fifths" },
            React.createElement(_coreClientComponents.Forms.Input, {
              name: "City",
              label: "City",
              defaultValue: City,
              ref: "City"
            })
          ),
          React.createElement(
            "div",
            { className: "grid__item three-fifths" },
            React.createElement(
              "div",
              { className: "grid" },
              React.createElement(
                "div",
                { className: "grid__item one-half" },
                React.createElement(_coreClientComponents.Forms.Input, {
                  name: "State",
                  label: "State",
                  defaultValue: State,
                  ref: "State"
                })
              ),
              React.createElement(
                "div",
                { className: "grid__item one-half" },
                React.createElement(_coreClientComponents.Forms.Input, {
                  name: "PostalCode",
                  label: "Zip",
                  defaultValue: PostalCode,
                  ref: "PostalCode"
                })
              )
            )
          )
        ),
        React.createElement(
          _reactRouter.Link,
          { to: "/profile/settings", tabIndex: -1, className: "btn--small btn--dark-tertiary display-inline-block" },
          "Back"
        ),
        (function () {
          var btnClasses = ["push-left"];
          var ready = true;
          if (!ready) {
            btnClasses.push("btn--disabled");
          } else {
            btnClasses.push("btn");
          }

          return React.createElement(
            "button",
            { className: btnClasses.join(" ") },
            "Update"
          );
        })()
      )
    );
  };

  var _HomeAddress = HomeAddress;
  HomeAddress = _reactRedux.connect(map)(HomeAddress) || HomeAddress;
  return HomeAddress;
})(_react.Component);

exports["default"] = HomeAddress;
module.exports = exports["default"];