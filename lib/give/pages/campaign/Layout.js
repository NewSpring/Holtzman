"use strict";

exports.__esModule = true;

var _react = require("react");

var _reactRouter = require("react-router");

var _split = require("../../../core/blocks/split");

var _split2 = _interopRequireDefault(_split);

var _meta = require("../../../core/components/meta");

var _meta2 = _interopRequireDefault(_meta);

var _AddToCart = require("../../blocks/AddToCart");

var _AddToCart2 = _interopRequireDefault(_AddToCart);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import { VelocityComponent } from "velocity-react"


var Layout = function Layout(_ref, context) {
  var account = _ref.account;
  return React.createElement(
    "div",
    null,
    React.createElement(
      _split2["default"],
      { nav: true, classes: ["background--light-primary"] },
      React.createElement(_meta2["default"], {
        title: account.name,
        description: account.summary,
        image: account.formatedImage["2:1"] ? account.formatedImage["2:1"] : account.image,
        meta: [{ "property": "og:type", "content": "article" }]
      }),
      React.createElement(_split.Right, { background: account.formatedImage["2:1"] ? account.formatedImage["2:1"] : account.image, mobile: true }),
      React.createElement(_split.Right, { background: account.formatedImage["1:2"] ? account.formatedImage["1:2"] : account.image, mobile: false })
    ),
    React.createElement(
      _split.Left,
      { scroll: true, classes: ["background--light-primary"] },
      React.createElement(
        _reactRouter.Link,
        { to: "/give/now", className: "locked-top locked-left soft-double@lap-and-up soft h7 text-dark-secondary plain visuallyhidden@handheld" },
        React.createElement("i", { className: "icon-arrow-back soft-half-right display-inline-block", style: { verticalAlign: "middle" } }),
        React.createElement(
          "span",
          { className: "display-inline-block", style: { verticalAlign: "middle", marginBottom: "2px" } },
          "Back"
        )
      ),
      React.createElement(
        "div",
        { className: "soft@lap-and-up soft-double-top@lap-and-up" },
        React.createElement(
          "div",
          { className: "soft soft-double-bottom soft-double-top@lap-and-up" },
          React.createElement(
            "h2",
            null,
            account.name
          ),
          React.createElement("div", { dangerouslySetInnerHTML: { __html: account.description } })
        )
      ),
      React.createElement(
        "div",
        { className: "background--light-secondary" },
        React.createElement(
          "div",
          { className: "constrain-copy soft-double@lap-and-up" },
          React.createElement(
            "div",
            { className: "soft soft-double-bottom soft-double-top@lap-and-up" },
            React.createElement(_AddToCart2["default"], { accounts: [account], donate: true })
          )
        )
      )
    )
  );
};

Layout.contextTypes = { shouldAnimate: _react.PropTypes.bool };

exports["default"] = Layout;
module.exports = exports['default'];