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

var PersonalDetails = (function (_Component) {
  _inherits(PersonalDetails, _Component);

  function PersonalDetails() {
    var _this = this;

    _classCallCheck(this, _PersonalDetails);

    _Component.apply(this, arguments);

    this.state = {
      month: null,
      state: "default"
    };

    this.getDays = function () {

      var totalDays = _moment2["default"]("1", "M").daysInMonth();
      if (_this.state.month) {
        totalDays = _moment2["default"](_this.state.month, "M").daysInMonth();
      }

      var arr = [];
      for (var i = 0; i < totalDays; i++) {
        arr.push({ label: i + 1, value: i + 1 });
      }
      return arr;
    };

    this.getMonths = function () {
      return _moment2["default"].monthsShort().map(function (month, i) {
        return { label: month, value: i + 1 };
      });
    };

    this.getYears = function () {
      var now = new Date().getFullYear();

      var arr = [];
      for (var i = 0; i < 150; i++) {
        arr.push({ label: now - i, value: now - i });
      }

      return arr;
    };

    this.saveMonth = function (value) {
      _this.setState({ month: value });

      return true;
    };

    this.updatePerson = function (e) {
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
      _rockClientMethodsAuth.update(data, function (err, result) {

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

  PersonalDetails.prototype.componentWillMount = function componentWillMount() {
    this.props.dispatch(_coreClientActions.nav.setLevel("CONTENT"));
  };

  PersonalDetails.prototype.componentWillUnmount = function componentWillUnmount() {
    this.props.dispatch(_coreClientActions.nav.setLevel("TOP"));
  };

  PersonalDetails.prototype.getMeteorData = function getMeteorData() {
    Meteor.subscribe("campuses");
    return {
      campuses: _rockLibCollections.Campuses.find().fetch()
    };
  };

  PersonalDetails.prototype.render = function render() {
    var campuses = this.data.campuses;

    campuses || (campuses = []);
    campuses = campuses.map(function (campus) {
      return { label: campus.Name, value: campus.Id };
    });

    var _props$person = this.props.person;
    var Campus = _props$person.Campus;
    var FirstName = _props$person.FirstName;
    var LastName = _props$person.LastName;
    var NickName = _props$person.NickName;
    var BirthDay = _props$person.BirthDay;
    var BirthMonth = _props$person.BirthMonth;
    var BirthYear = _props$person.BirthYear;

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

    // console.log(this.props.person)
    return React.createElement(
      "div",
      { className: "one-whole text-center push-double-top@lap-and-up" },
      React.createElement(
        _coreClientComponents.Forms.Form,
        {
          id: "reset-password",
          classes: ["soft", "one-whole", "two-thirds@portable", "one-half@anchored", "display-inline-block"],
          submit: this.updatePerson
        },
        React.createElement(
          "div",
          { className: "push-double" },
          React.createElement(
            "h4",
            { className: "text-center" },
            "My Personal Details"
          )
        ),
        React.createElement(
          "h6",
          { className: "soft-bottom" },
          "Name"
        ),
        React.createElement(_coreClientComponents.Forms.Input, {
          name: "NickName",
          label: "Nickname",
          ref: "NickName",
          type: "text",
          defaultValue: NickName
        }),
        React.createElement(_coreClientComponents.Forms.Input, {
          name: "FirstName",
          label: "First Name",
          ref: "FirstName",
          type: "text",
          defaultValue: FirstName
        }),
        React.createElement(_coreClientComponents.Forms.Input, {
          name: "LastName",
          label: "Last Name",
          ref: "LastName",
          type: "text",
          defaultValue: LastName
        }),
        React.createElement(
          "h6",
          { className: "soft-bottom" },
          "Birthday"
        ),
        React.createElement(
          "div",
          { className: "grid" },
          React.createElement(
            "div",
            { className: "grid__item three-fifths" },
            React.createElement(
              "div",
              { className: "grid" },
              React.createElement(
                "div",
                { className: "grid__item one-half" },
                React.createElement(_coreClientComponents.Forms.Select, {
                  name: "BirthMonth",
                  label: "Month",
                  ref: "BirthMonth",
                  type: "text",
                  defaultValue: BirthMonth,
                  includeBlank: true,
                  items: this.getMonths(),
                  validation: this.saveMonth
                })
              ),
              React.createElement(
                "div",
                { className: "grid__item one-half" },
                React.createElement(_coreClientComponents.Forms.Select, {
                  name: "BirthDay",
                  label: "Day",
                  ref: "BirthDay",
                  type: "text",
                  defaultValue: BirthDay,
                  includeBlank: true,
                  items: this.getDays()
                })
              )
            )
          ),
          React.createElement(
            "div",
            { className: "grid__item two-fifths" },
            React.createElement(_coreClientComponents.Forms.Select, {
              name: "BirthYear",
              label: "Year",
              ref: "BirthYear",
              type: "text",
              defaultValue: BirthYear,
              includeBlank: true,
              items: this.getYears()
            })
          )
        ),
        React.createElement(
          "h6",
          { className: "soft-bottom" },
          "Campus"
        ),
        React.createElement(_coreClientComponents.Forms.Select, {
          name: "Campus",
          label: "Campus",
          type: "Campus",
          defaultValue: Campus.Id || false,
          ref: "Campus",
          includeBlank: true,
          items: campuses
        }),
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

  var _PersonalDetails = PersonalDetails;
  PersonalDetails = _reactMixin2["default"].decorate(ReactMeteorData)(PersonalDetails) || PersonalDetails;
  PersonalDetails = _reactRedux.connect(map)(PersonalDetails) || PersonalDetails;
  return PersonalDetails;
})(_react.Component);

exports["default"] = PersonalDetails;
module.exports = exports["default"];