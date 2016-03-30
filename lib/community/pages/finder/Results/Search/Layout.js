"use strict";

exports.__esModule = true;

var _react = require("react");

var _reactRouter = require("react-router");

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var _split = require("../../../../core/blocks/split");

var _split2 = _interopRequireDefault(_split);

var _components = require("../../../../core/components");

var _meta = require("../../../../core/components/meta");

var _meta2 = _interopRequireDefault(_meta);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Layout = function Layout(_ref, context) {
  var geocode = _ref.geocode;
  var home = _ref.home;
  var ready = _ref.ready;
  var save = _ref.save;
  var states = _ref.states;
  var showError = _ref.showError;
  var campuses = _ref.campuses;
  return React.createElement(
    "div",
    null,
    React.createElement(
      _split2["default"],
      { nav: true },
      React.createElement(_meta2["default"], { title: "Group Finder" }),
      React.createElement(
        _split.Right,
        {
          mobile: true,
          classes: ["floating", "overlay--solid-dark"],
          ratioClasses: ["floating", "floating__item", "overlay__item", "one-whole", "text-center"],
          background: "https://dg0ddngxdz549.cloudfront.net/images/cached/images/remote/http_s3.amazonaws.com/ns.images/newspring/fpo/fpo.groups-flipped_1700_850_90_c1.jpg"
        },
        React.createElement(
          "div",
          { className: "soft one-whole" },
          React.createElement(
            "h4",
            { className: "text-light-primary soft-half-top flush-bottom" },
            "Group Finder"
          ),
          React.createElement(
            "p",
            { className: "text-light-primary flush" },
            React.createElement(
              "em",
              null,
              "#TheseAreMyPeople"
            )
          )
        )
      )
    ),
    React.createElement(
      _split.Left,
      { scroll: true, classes: ["background--light-primary"] },
      React.createElement(
        "div",
        { className: "one-whole text-center push-double-top@lap-and-up push-double-bottom" },
        React.createElement(
          _components.Forms.Form,
          {
            id: "reset-password",
            classes: ["soft", "one-whole", "two-thirds@portable", "one-half@anchored", "display-inline-block"],
            submit: geocode
          },
          React.createElement(
            "div",
            { className: "push-double" },
            React.createElement(
              "h4",
              { className: "text-center flush-bottom" },
              "Find Your People"
            ),
            React.createElement(
              "p",
              null,
              React.createElement(
                "em",
                null,
                React.createElement(
                  "small",
                  null,
                  "Search for groups near you"
                )
              )
            )
          ),
          React.createElement(
            "h6",
            { className: "soft-bottom" },
            "Find by Name"
          ),
          React.createElement(_components.Forms.Input, {
            name: "name",
            label: "Group Name",
            onChange: save,
            onBlur: save,
            autofocus: true
          }),
          React.createElement(
            "h6",
            { className: "soft-bottom" },
            "Find by Location"
          ),
          React.createElement(_components.Forms.Input, {
            name: "streetAddress",
            label: "Street Address",
            errorText: "Please enter your address",
            defaultValue: home.street1,
            onChange: save,
            onBlur: save
          }),
          React.createElement(
            "div",
            { className: "grid" },
            React.createElement(
              "div",
              { className: "grid__item two-fifths" },
              React.createElement(_components.Forms.Input, {
                name: "city",
                label: "City",
                errorText: "Please enter your city",
                defaultValue: home.city,
                onChange: save,
                onBlur: save
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
                  React.createElement(_components.Forms.Select, {
                    name: "state",
                    label: "State",
                    errorText: "Please enter your state",
                    defaultValue: home.state,
                    onChange: save,
                    items: states,
                    includeBlank: true,
                    deselect: true
                  })
                ),
                React.createElement(
                  "div",
                  { className: "grid__item one-half" },
                  React.createElement(_components.Forms.Input, {
                    name: "zip",
                    label: "Zip",
                    type: "tel",
                    errorText: "Please enter your zip",
                    defaultValue: home.zip,
                    onChange: save,
                    onBlur: save
                  })
                )
              )
            )
          ),
          React.createElement(
            "h6",
            { className: "soft-bottom" },
            "Find by Campus"
          ),
          React.createElement(_components.Forms.Select, {
            name: "campus",
            label: "Campus",
            onChange: save,
            items: campuses,
            includeBlank: true,
            deselect: true
          }),
          function () {

            if (showError) {
              return React.createElement(
                "h6",
                { className: "text-alert soft-bottom" },
                React.createElement(
                  "em",
                  null,
                  "We were not able to find your location. Please try adding more information or a different address"
                )
              );
            }
          }(),
          function () {

            var btnClasses = ["one-whole"];
            if (!ready) {
              btnClasses.push("btn--disabled");
            } else {
              btnClasses.push("btn");
            }

            return React.createElement(
              "button",
              { className: btnClasses.join(" "), disabled: !ready },
              "Search"
            );
          }()
        )
      )
    )
  );
};
// import { VelocityComponent } from "velocity-react"

Layout.contextTypes = { shouldAnimate: _react.PropTypes.bool };

exports["default"] = Layout;
module.exports = exports['default'];