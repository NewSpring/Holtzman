"use strict";

exports.__esModule = true;

var _react = require("react");

var _reactRouter = require("react-router");

var _meta = require("../../../../../core/components/meta");

var _meta2 = _interopRequireDefault(_meta);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Layout = function Layout(_ref, context) {
  var group = _ref.group;
  var join = _ref.join;
  var hash = _ref.hash;
  var handleBack = _ref.handleBack;


  var leaders = group.members.filter(function (x) {
    return x.role.toLowerCase() === "leader";
  });
  var photo = group.photo ? group.photo : "//s3.amazonaws.com/ns.assets/apollos/group-profile-placeholder.png";
  return React.createElement(
    "section",
    { className: "background--light-secondary hard" },
    React.createElement(_meta2["default"], { title: group.name, image: photo, description: group.description }),
    React.createElement(
      "div",
      { className: "ratio--landscape@lap-wide-and-up ratio--square background--fill overlay--gradient", style: {
          overflow: "visible",
          backgroundImage: "url(" + photo + ")",
          zIndex: 10
        } },
      React.createElement(
        "div",
        { className: "soft-sides@anchored ratio__item one-whole floating--bottom" },
        React.createElement(
          "div",
          { className: "floating__item text-left one-whole soft-double-sides soft-double-bottom" },
          React.createElement(
            "h3",
            { className: "text-light-primary push-half-bottom" },
            group.name
          ),
          function () {
            if (leaders.length) {
              return React.createElement(
                "div",
                null,
                React.createElement(
                  "div",
                  { className: "locked" },
                  leaders.map(function (leader, i) {
                    return React.createElement(
                      "div",
                      { className: "ratio--square round display-inline-block push-right background--fill", key: i, style: {
                          backgroundImage: "url(" + leader.person.photo + ")",
                          width: "80px",
                          height: "80px"
                        } },
                      React.createElement("div", { className: "ratio__item" })
                    );
                  })
                )
              );
            }
          }()
        )
      )
    ),
    React.createElement(
      "div",
      { className: "push-double-sides@anchored push-sides soft-double-top flush-ends card outlined outlined--light" },
      React.createElement(
        "div",
        { className: "card__item soft" },
        React.createElement(
          "h7",
          { className: "text-dark-tertiary" },
          React.createElement(
            "small",
            null,
            "Group Leaders"
          )
        ),
        React.createElement(
          "h5",
          { className: "text-dark-tertiary soft-half-top" },
          leaders.map(function (x, i) {
            var string = (x.person.nickName || x.person.firstName) + " " + x.person.lastName;

            if (leaders.length - 1 != i) {
              string += ", ";
            }

            return React.createElement(
              "span",
              { key: i },
              string
            );
          })
        )
      )
    ),
    React.createElement(
      "section",
      { className: "soft-double-sides@anchored soft-half-ends flush-sides" },
      React.createElement(
        "div",
        { className: "card outlined outlined--light" },
        React.createElement(
          "div",
          { className: "grid card__item soft " },
          React.createElement(
            "h5",
            { className: "flush-bottom push-half-bottom@handheld push-half-bottom@lap push-half-top grid__item one-half@lap-wide-and-up one-whole text-center@handheld text-center@lap text-dark-secondary" },
            "#TheseAreMyPeople"
          ),
          React.createElement(
            "div",
            { className: "grid__item text-right@lap-wide-and-up text-center one-whole one-half@lap-wide-and-up" },
            React.createElement(
              "button",
              { className: "flush-bottom push-half-bottom@handheld btn", onClick: join },
              "Join Group"
            )
          )
        )
      ),
      React.createElement(
        "div",
        { className: "card outlined outlined--light hard one-whole" },
        React.createElement(
          "div",
          { className: "card__item push-half-top@handheld" },
          React.createElement(
            "div",
            { className: "soft-left@lap-wide-and-up soft soft-double-bottom soft-half-bottom@handheld" },
            React.createElement(
              "div",
              { className: "soft-double-bottom@lap-wide-and-up soft-bottom" },
              React.createElement(
                "h7",
                { className: "text-dark-tertiary" },
                "Time"
              ),
              React.createElement(
                "h5",
                { className: "text-dark-tertiary soft-half-top flush-bottom" },
                group.schedule.scheduleText
              )
            ),
            function () {
              if (group.locations && group.locations.length) {
                var loc = group.locations[0];
                return React.createElement(
                  "div",
                  { className: "soft-double-bottom@lap-wide-and-up soft-bottom" },
                  React.createElement(
                    "h7",
                    { className: "text-dark-tertiary" },
                    "Address ",
                    loc.location.distance ? "- " + loc.location.distance.toFixed(2) + " miles away" : ""
                  ),
                  React.createElement(
                    "h5",
                    { className: "text-dark-tertiary soft-half-top flush-bottom" },
                    loc.location.city,
                    ", ",
                    loc.location.state
                  )
                );
              }
            }(),
            React.createElement(
              "div",
              { className: "soft-double-bottom@lap-wide-and-up soft-bottom" },
              React.createElement(
                "h7",
                { className: "text-dark-tertiary" },
                "Information"
              ),
              React.createElement(
                "h5",
                { className: "text-dark-tertiary soft-half-top flush-bottom" },
                group.childCare ? "Children Welcome" : "Adults Only",
                group.age ? "," + group.age[0] + " - " + group.age[1] : ""
              )
            ),
            React.createElement(
              "div",
              { className: "soft-double-bottom@lap-wide-and-up soft-bottom" },
              React.createElement(
                "h7",
                { className: "text-dark-tertiary" },
                "Description"
              ),
              React.createElement(
                "h5",
                { className: "text-dark-tertiary soft-half-top flush-bottom" },
                group.description
              )
            ),
            React.createElement(
              "div",
              { className: "soft-double-bottom@lap-wide-and-up soft-bottom" },
              React.createElement(
                "h7",
                { className: "text-dark-tertiary" },
                "Members"
              ),
              React.createElement(
                "div",
                { className: "soft-half-top flush-bottom" },
                group.members.map(function (member, i) {
                  return React.createElement(
                    "div",
                    { className: "ratio--square round display-inline-block push-half-right background--fill", key: i, style: {
                        backgroundImage: "url(" + member.person.photo + ")",
                        width: "40px",
                        height: "40px"
                      } },
                    React.createElement("div", { className: "ratio__item" })
                  );
                })
              )
            )
          )
        )
      ),
      React.createElement(
        "div",
        { className: "one-whole push-top text-center soft@handheld soft-sides" },
        React.createElement(
          _reactRouter.Link,
          { to: "/groups/finder/list/" + hash, onClick: handleBack, className: "btn--small btn--dark-tertiary display-inline-block" },
          "View All Results"
        )
      )
    )
  );
};
// import { VelocityComponent } from "velocity-react"

Layout.contextTypes = { shouldAnimate: _react.PropTypes.bool };

exports["default"] = Layout;
module.exports = exports['default'];