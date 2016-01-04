"use strict";

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _reactRouter = require("react-router");

var _reactRedux = require("react-redux");

var _velocityReact = require("velocity-react");

var _coreClientActions = require("../../../../core/client/actions");

var _coreClientComponents = require("../../../../core/client/components");

var _coreClientComponentsLoading = require("../../../../core/client/components/loading");

var _rockClientMethodsAuth = require("../../../../rock/client/methods/auth");

var ChangePassword = (function (_Component) {
  _inherits(ChangePassword, _Component);

  function ChangePassword() {
    var _this = this;

    _classCallCheck(this, _ChangePassword);

    _Component.apply(this, arguments);

    this.state = {
      current: null,
      newP: null,
      newPDup: null,
      state: "default"
    };

    this.submit = function (e) {
      e.preventDefault();
      _this.setState({ state: "loading" });

      _rockClientMethodsAuth.reset(_this.state.current, _this.state.newP, function (err, result) {
        if (err) {
          _this.setState({ state: "error", err: err });
          setTimeout(function () {
            _this.setState({ state: "default" });
          }, 5000);
          return;
        }

        _this.setState({ state: "success" });

        setTimeout(function () {
          _this.setState({ state: "default" });
        }, 5000);
      });
    };

    this.save = function (value, input) {
      var _setState;

      var id = input.id;

      if (id === "newPDup" && _this.state.newP && _this.state.newP != value) {
        return false;
      }

      if (id === "newP" && _this.state.newPDup && _this.state.newPDup != value) {
        return false;
      }

      _this.setState((_setState = {}, _setState[id] = value, _setState));

      return true;
    };
  }

  ChangePassword.prototype.componentWillMount = function componentWillMount() {
    this.props.dispatch(_coreClientActions.nav.setLevel("CONTENT"));
  };

  ChangePassword.prototype.componentWillUnmount = function componentWillUnmount() {
    this.props.dispatch(_coreClientActions.nav.setLevel("TOP"));
  };

  ChangePassword.prototype.render = function render() {
    var _this2 = this;

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
                "Updating your password..."
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
          "Your password has been updated!"
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
          submit: this.submit
        },
        React.createElement(
          "div",
          { className: "push-double" },
          React.createElement(
            "h4",
            { className: "text-center" },
            "Change Password"
          )
        ),
        React.createElement(_coreClientComponents.Forms.Input, {
          name: "current",
          label: "Current Password",
          validation: this.save,
          type: "password"
        }),
        React.createElement(_coreClientComponents.Forms.Input, {
          name: "newP",
          label: "New Password",
          validation: this.save,
          errorText: "New password does not match",
          type: "password"
        }),
        React.createElement(_coreClientComponents.Forms.Input, {
          name: "newPDup",
          label: "Repeat New Password",
          validation: this.save,
          errorText: "New password does not match",
          type: "password"
        }),
        React.createElement(
          _reactRouter.Link,
          { to: "/profile/settings", tabIndex: -1, className: "btn--small btn--dark-tertiary display-inline-block" },
          "Back"
        ),
        (function () {
          var btnClasses = ["push-left"];
          var _state = _this2.state;
          var current = _state.current;
          var newP = _state.newP;
          var newPDup = _state.newPDup;

          if (!current || !newP || !newPDup) {
            btnClasses.push("btn--disabled");
          } else {
            btnClasses.push("btn");
          }

          return React.createElement(
            "button",
            { className: btnClasses.join(" ") },
            "Enter"
          );
        })()
      )
    );
  };

  var _ChangePassword = ChangePassword;
  ChangePassword = _reactRedux.connect()(ChangePassword) || ChangePassword;
  return ChangePassword;
})(_react.Component);

exports["default"] = ChangePassword;
module.exports = exports["default"];