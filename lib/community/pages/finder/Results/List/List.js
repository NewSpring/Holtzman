"use strict";

exports.__esModule = true;

var _react = require("react");

var _reactRouter = require("react-router");

var _SideBySide = require("../../../../../core/components/cards/SideBySide");

var _SideBySide2 = _interopRequireDefault(_SideBySide);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var List = function List(_ref) {
  var groups = _ref.groups;
  var onHover = _ref.onHover;
  var onClick = _ref.onClick;
  var hover = _ref.hover;
  var active = _ref.active;
  var showFilters = _ref.showFilters;
  var children = _ref.children;
  var filter = _ref.filter;
  var count = _ref.count;
  var showMore = _ref.showMore;
  var status = _ref.status;
  var done = _ref.done;
  return React.createElement(
    "div",
    null,
    React.createElement(
      "section",
      { className: "background--light-secondary soft-double-sides@lap-and-up hard-bottom" },
      React.createElement(
        "div",
        { className: "display-inline-block soft-ends one-whole" },
        React.createElement(
          "div",
          { className: "display-inline-block soft-bottom" },
          React.createElement(
            _reactRouter.Link,
            { to: "/groups/finder", className: "h7 text-dark-tertiary display-inline-block", style: {
                textDecoration: "underline"
              } },
            "Search Again"
          )
        ),
        React.createElement(
          "button",
          { className: "display-inline-block h7 text-dark-tertiary float-right", onClick: showFilters, style: {
              textDecoration: "underline",
              marginTop: "6px"
            } },
          !filter ? "Filter Results" : "Close Filter"
        ),
        React.createElement(
          "h5",
          { className: "text-dark-tertiary" },
          count,
          " Result",
          count != 1 ? "s" : "",
          " near your address"
        )
      )
    ),
    children,
    React.createElement(
      "section",
      { className: "background--light-secondary soft-double-sides@lap-and-up" },
      groups.map(function (group, key) {
        var leaders = group.members.filter(function (x) {
          return x.role.toLowerCase() === "leader";
        });
        return React.createElement(
          "button",
          {
            id: group.id,
            onClick: onClick,
            key: key,
            style: { position: "relative" },
            className: "one-whole push-bottom",
            onMouseOver: onHover
          },
          React.createElement(
            _SideBySide2["default"],
            {
              image: { url: group.photo ? group.photo : "//s3.amazonaws.com/ns.assets/apollos/group-profile-placeholder.png" },
              left: ["one-whole", "two-thirds@lap-and-up"],
              right: ["one-whole", "one-third@lap-and-up"]
            },
            React.createElement(
              "h4",
              { className: "push-half-top@portable push-top@anchored" },
              group.name
            ),
            React.createElement(
              "h6",
              { className: "text-dark-secondary" },
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
            ),
            React.createElement(
              "h6",
              { className: "text-dark-tertiary" },
              React.createElement(
                "em",
                null,
                group.schedule.scheduleText,
                " ",
                group.locations && group.locations.length && group.locations[0].location.distance ? "- " + group.locations[0].location.distance.toFixed(2) + " miles away" : ""
              )
            ),
            React.createElement(
              "p",
              { className: "flush-bottom" },
              React.createElement(
                "small",
                null,
                group.description
              )
            )
          )
        );
      }),
      React.createElement(
        "div",
        { className: "one-whole text-center soft-double-top soft-bottom" },
        React.createElement(
          "div",
          null,
          function () {
            var btnClasses = ["btn--dark-tertiary", "one-whole@handheld", "push-bottom"];

            if (done) {
              return React.createElement(
                "button",
                { className: "disabled one-whole@handheld btn", disabled: true },
                "No more groups"
              );
            }
            if (status === "partial-load") {
              return React.createElement(
                "button",
                { className: "disabled one-whole@handheld btn", disabled: true },
                "Loading..."
              );
            }
            return React.createElement(
              "button",
              { className: btnClasses.join(" "), onClick: showMore },
              "Load More Results"
            );
          }()
        ),
        React.createElement(
          "h6",
          { className: "soft-top" },
          React.createElement(
            "a",
            { href: Meteor.settings["public"].rock.baseURL + "Workflows/81", target: "_blank" },
            "Can't Find the Right Group?"
          )
        )
      )
    )
  );
};

List.propTypes = {
  markers: _react.PropTypes.array,
  onHover: _react.PropTypes.func,
  onClick: _react.PropTypes.func
};

// hover: PropTypes.number,
// active: PropTypes.number
exports["default"] = List;
module.exports = exports['default'];