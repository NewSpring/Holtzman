"use strict";

exports.__esModule = true;

var _react = require("react");

var _reactRouter = require("react-router");

var _split = require("../../../core/blocks/split");

var _split2 = _interopRequireDefault(_split);

var _SideBySide = require("../../../core/components/cards/SideBySide");

var _SideBySide2 = _interopRequireDefault(_SideBySide);

var _loading = require("../../../core/components/loading");

var _meta = require("../../../core/components/meta");

var _meta2 = _interopRequireDefault(_meta);

var _status = require("../../components/status");

var _AddToCart = require("../../blocks/AddToCart");

var _AddToCart2 = _interopRequireDefault(_AddToCart);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import { VelocityComponent } from "velocity-react"

var Layout = function Layout(_ref, context) {
  var alive = _ref.alive;
  var accounts = _ref.accounts;
  return React.createElement(
    "div",
    null,
    React.createElement(_meta2["default"], { title: "Give", image: "//s3.amazonaws.com/ns.assets/apollos/you_cant_outgive_god2x1.jpg" }),
    React.createElement(
      _split2["default"],
      { nav: true, classes: ["background--light-primary"] },
      React.createElement(_split.Right, {
        background: "//s3.amazonaws.com/ns.assets/apollos/39616.perry.cen.web.scheduleyourgivingad_1x2.jpg",
        link: "/give/schedules"
      })
    ),
    React.createElement(
      _split.Left,
      { scroll: true, classes: ["background--light-secondary"] },
      React.createElement(
        "div",
        { className: "background--light-secondary soft-half soft-sides@portable soft-double-sides@anchored" },
        React.createElement(
          "div",
          { className: "soft-ends soft-double-ends@lap-and-up soft-side@lap-and-up" },
          React.createElement(
            "h5",
            { className: "soft-half-sides soft-half-bottom flush-bottom" },
            "Exciting Changes to Giving!"
          ),
          React.createElement(
            "p",
            { className: "soft-half-sides flush-bottom" },
            React.createElement(
              "em",
              null,
              React.createElement(
                "small",
                null,
                "You may notice our website looks a little different, but we’re confident our new site will make it easier and more enjoyable for you to give! If you want to know more, or are having problems giving, ",
                React.createElement(
                  "a",
                  { href: "//newspring.cc/news/exciting-changes-to-how-you-give", target: "blank" },
                  "click here to read more!"
                )
              )
            )
          )
        )
      ),
      React.createElement(
        "div",
        { className: "soft-double-sides@lap-and-up soft-double-ends@lap-and-up soft background--light-primary", style: { overflow: "visible" } },
        React.createElement(
          "div",
          { className: "text-left soft-double-top hard-left@lap-and-up soft-half-bottom soft@anchored " },
          React.createElement(
            "div",
            { className: "soft-double-ends@anchored" },
            function () {

              if (!alive) {
                return React.createElement(_status.Offline, null);
              }

              if (!accounts.length) {
                return React.createElement(
                  "div",
                  { className: "one-whole text-center soft-ends" },
                  React.createElement(_loading.Spinner, { styles: { width: "40px", height: "40px" } })
                );
              }

              return React.createElement(_AddToCart2["default"], { accounts: accounts });
            }()
          )
        )
      ),
      React.createElement(
        _reactRouter.Link,
        { to: "/give/schedules", className: "visually--hidden@lap-and-up" },
        React.createElement(
          "div",
          { className: "ratio--landscape@handheld background--fill", style: {
              backgroundImage: "url(//s3.amazonaws.com/ns.assets/apollos/39616.perry.cen.web.scheduleyourgivingad_2x1.jpg)"
            } },
          React.createElement("div", { className: "ratio__item" })
        )
      ),
      React.createElement(
        "div",
        { className: "soft-half soft-sides@portable soft-double-sides@anchored" },
        React.createElement(
          "h4",
          { className: "soft soft-double-ends text-center@lap-and-up flush-bottom" },
          "Learn more about our campaigns..."
        ),
        React.createElement(
          "div",
          { className: "grid" },
          function () {

            if (!alive) {
              return null;
            }

            if (!accounts.length) {
              return React.createElement(
                "div",
                { className: "one-whole text-center soft-ends" },
                React.createElement(_loading.Spinner, { styles: { width: "40px", height: "40px" } })
              );
            }
          }(),
          accounts.map(function (account, i) {

            if (!account.image || !account.description) {
              return null;
            }

            return React.createElement(
              "div",
              { key: i, className: "grid__item one-whole push-half-bottom flush-bottom@handheld hard-bottom" },
              React.createElement(
                _SideBySide2["default"],
                {
                  link: "/give/campaign/" + encodeURI(account.name),
                  image: {
                    "1:1": account.formatedImage && account.formatedImage["1:1"] ? account.formatedImage["1:1"] : account.image,
                    "2:1": account.formatedImage && account.formatedImage["2:1"] ? account.formatedImage["2:1"] : account.image,
                    "1:2": account.formatedImage && account.formatedImage["1:2"] ? account.formatedImage["1:2"] : account.image,
                    defaultImage: account.image
                  }
                },
                React.createElement(
                  "h4",
                  { className: "push-half-top@portable push-top@anchored" },
                  account.name
                ),
                React.createElement(
                  "p",
                  null,
                  React.createElement(
                    "small",
                    null,
                    account.summary
                  )
                ),
                React.createElement(
                  _reactRouter.Link,
                  {
                    to: "/give/campaign/" + encodeURI(account.name),
                    className: "h6 btn--small btn--dark-tertiary soft-sides@portable one-whole@handheld"
                  },
                  "Learn more"
                )
              )
            );
          })
        )
      )
    )
  );
};

Layout.contextTypes = { shouldAnimate: _react.PropTypes.bool };

exports["default"] = Layout;
module.exports = exports['default'];