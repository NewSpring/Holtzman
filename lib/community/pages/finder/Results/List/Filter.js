"use strict";

exports.__esModule = true;

var _react = require("react");

var _components = require("../../../../../core/components");

var days = [{ label: "Sunday", value: 0 }, { label: "Monday", value: 1 }, { label: "Tuesday", value: 2 }, { label: "Wednesday", value: 3 }, { label: "Thursday", value: 4 }, { label: "Friday", value: 5 }, { label: "Saturday", value: 6 }];

var Filter = function Filter(_ref) {
  var topics = _ref.topics;
  var filter = _ref.filter;
  var campuses = _ref.campuses;
  var defaultFilters = _ref.defaultFilters;
  return React.createElement(
    "section",
    { className: "background--light-primary soft-double@lap-and-up soft-double-top" },
    React.createElement(
      "div",
      { className: "grid" },
      React.createElement(
        "div",
        { className: "grid__item one-third@lap-and-up" },
        React.createElement(_components.Forms.Select, {
          name: "campus",
          label: "Campus",
          classes: ["hard-bottom@lap-and-up"],
          items: campuses,
          includeBlank: false,
          defaultValue: defaultFilters.campus || -1,
          onChange: filter
        })
      ),
      React.createElement(
        "div",
        { className: "grid__item one-third@lap-and-up" },
        React.createElement(_components.Forms.Select, {
          name: "topic",
          label: "Topic",
          classes: ["hard-bottom@lap-and-up"],
          items: topics,
          includeBlank: false,
          defaultValue: -1,
          onChange: filter
        })
      ),
      React.createElement(
        "div",
        { className: "grid__item one-third@lap-and-up" },
        React.createElement(_components.Forms.Select, {
          name: "childCare",
          label: "Children",
          classes: ["hard-bottom@lap-and-up"],
          items: [{ value: -1, label: "Either" }, { value: 1, label: "Yes" }, { value: 0, label: "No" }],
          defaultValue: -1,
          includeBlank: false,
          onChange: filter
        })
      )
    ),
    React.createElement(
      "div",
      { className: "grid soft-top" },
      days.map(function (day, i) {
        return React.createElement(
          "div",
          { className: "grid__item one-half one-quarter@lap-wide-and-up one-third@lap", key: i },
          React.createElement(
            _components.Forms.Checkbox,
            {
              name: "days",
              id: "days_" + day.value,
              defaultValue: true,
              value: day.value,
              clicked: filter,
              classes: ["hard-bottom@lap-and-up", "push-half-bottom@lap-and-up"]
            },
            day.label
          )
        );
      })
    )
  );
};

exports["default"] = Filter;
module.exports = exports['default'];