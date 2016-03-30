"use strict";

exports.__esModule = true;

var _react = require("react");

var _split = require("../../../core/blocks/split");

var _split2 = _interopRequireDefault(_split);

var _meta = require("../../../core/components/meta");

var _meta2 = _interopRequireDefault(_meta);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import { VelocityComponent } from "velocity-react"

var Layout = function Layout(_ref, context) {
  var classes = _ref.classes;
  var childClasses = _ref.childClasses;
  var photo = _ref.photo;
  var markers = _ref.markers;
  var children = _ref.children;
  var right = _ref.right;
  return React.createElement(
    "div",
    null,
    React.createElement(
      _split2["default"],
      { nav: true, classes: ["background--light-primary"] },
      React.createElement(_meta2["default"], { title: "Group Finder" }),
      React.createElement(
        _split.Right,
        {
          mobile: true,
          classes: classes,
          ratioClasses: childClasses,
          background: photo
        },
        right()
      )
    ),
    React.createElement(
      _split.Left,
      { scroll: true, classes: ["background--light-primary"] },
      children
    )
  );
};

Layout.propTypes = {
  classes: _react.PropTypes.array,
  childClasses: _react.PropTypes.array,
  photo: _react.PropTypes.string,
  hash: _react.PropTypes.string,
  markers: _react.PropTypes.array
};

Layout.contextTypes = { shouldAnimate: _react.PropTypes.bool };

exports["default"] = Layout;
module.exports = exports['default'];