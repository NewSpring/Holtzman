"use strict";

exports.__esModule = true;
exports["default"] = undefined;

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _class, _temp2;
// import { VelocityComponent } from "velocity-react"

var _react = require("react");

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var _reactRouter = require("react-router");

var _loading = require("../../../../core/components/loading");

var _split = require("../../../../core/blocks/split");

var _split2 = _interopRequireDefault(_split);

var _SideBySide = require("../../../../core/components/cards/SideBySide");

var _SideBySide2 = _interopRequireDefault(_SideBySide);

var _meta = require("../../../../core/components/meta");

var _meta2 = _interopRequireDefault(_meta);

var _components = require("../../../components");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Layout = (_temp2 = _class = function (_Component) {
  (0, _inherits3["default"])(Layout, _Component);

  function Layout() {
    var _temp, _this, _ret;

    (0, _classCallCheck3["default"])(this, Layout);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3["default"])(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.formatDate = function (date) {
      return (0, _moment2["default"])(date).format("MMM D, YYYY");
    }, _this.monentize = function (value, fixed) {

      if (typeof value === "number") {
        value = "" + value;
      }

      if (!value.length) {
        return "$0.00";
      }

      value = value.replace(/[^\d.-]/g, "");

      var decimals = value.split(".")[1];
      if (decimals && decimals.length >= 2 || fixed) {
        value = Number(value).toFixed(2);
        value = String(value);
      }

      value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return "$" + value;
    }, _this.capitalizeFirstLetter = function (string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }, _temp), (0, _possibleConstructorReturn3["default"])(_this, _ret);
  }

  Layout.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props;
    var schedule = _props.schedule;
    var stop = _props.stop;
    var state = _props.state;
    var person = _props.person;
    var active = _props.active;
    var complete = _props.complete;


    return React.createElement(
      "div",
      null,
      React.createElement(
        _split2["default"],
        { nav: true, classes: ["background--light-primary"] },
        React.createElement(_meta2["default"], { title: "Giving Schedule" }),
        React.createElement(_split.Right, { background: "//dg0ddngxdz549.cloudfront.net/images/cached/images/remote/http_s3.amazonaws.com/ns.images/all/heroes/newspring/campuses/Florence.1.2x1_1700_850_90_c1.jpg",
          mobile: false })
      ),
      React.createElement(
        _split.Left,
        { scroll: true, classes: ["background--light-secondary"], ref: "container" },
        React.createElement(
          "div",
          { className: "soft-double-sides@lap-and-up soft-double-ends@lap-and-up soft background--light-primary" },
          React.createElement(
            _reactRouter.Link,
            { to: "/give/schedules", className: "locked-top locked-left soft-double@lap-and-up soft h7 text-dark-secondary plain" },
            React.createElement("i", { className: "icon-arrow-back soft-half-right display-inline-block", style: { verticalAlign: "middle" } }),
            React.createElement(
              "span",
              { className: "display-inline-block", style: { verticalAlign: "middle", marginBottom: "2px" } },
              "Back"
            )
          ),
          React.createElement(
            "div",
            { className: "text-left soft-double-top hard-left@lap-and-up soft-half-bottom soft@anchored " },
            React.createElement(
              "div",
              { className: "soft-double-ends@anchored" },
              function () {

                if (!schedule) {
                  // loading
                  return React.createElement(
                    "div",
                    { className: "text-center soft" },
                    React.createElement(_loading.Spinner, { styles: { width: "40px", height: "40px" } })
                  );
                }

                return React.createElement(
                  "div",
                  { className: "text-center" },
                  React.createElement(
                    "p",
                    { className: "push-half-bottom" },
                    React.createElement(
                      "em",
                      null,
                      "Started on ",
                      _this2.formatDate(schedule.start)
                    )
                  ),
                  React.createElement(
                    "h4",
                    { className: "text-dark-secondary flush-bottom" },
                    _this2.capitalizeFirstLetter(schedule.schedule.description.toLowerCase())
                  ),
                  React.createElement(
                    "h3",
                    { className: "text-primary" },
                    schedule.details[0].account.name
                  ),
                  React.createElement(
                    "h1",
                    { className: "text-dark-primary" },
                    _this2.monentize(schedule.details[0].amount)
                  ),
                  function () {
                    var detail = schedule.payment;
                    if (detail && detail.accountNumber) {
                      return React.createElement(
                        "h4",
                        { className: "text-dark-secondary soft-half-top" },
                        detail.accountNumber.slice(-4),
                        " ",
                        function () {
                          if (detail.paymentType && detail.paymentType === "ACH") {
                            return React.createElement(_components.AccountType, { width: "30px", height: "20px", type: "Bank" });
                          } else if (detail.paymentType) {
                            return React.createElement(_components.AccountType, { width: "30px", height: "20px", type: detail.paymentType });
                          }
                        }()
                      );
                    }
                  }(),
                  function () {

                    if (complete) {
                      return React.createElement(
                        "h6",
                        { className: "text-brand" },
                        "Schedule Completed"
                      );
                    }

                    if (active) {
                      return React.createElement(
                        "h6",
                        { className: "text-alert", onClick: stop, style: { cursor: "pointer" } },
                        "Stop Contribution"
                      );
                    }

                    return React.createElement(
                      "h6",
                      { className: "text-brand" },
                      "Contribution Stopped"
                    );
                  }(),
                  React.createElement(
                    "p",
                    { className: "text-center soft-ends soft-double@anchored flush-bottom soft-ends soft-sides@portable" },
                    "Thank you so much for your contributions! It is because of your generosity we are able to continue telling stories of the greatness of Jesus and seeing peoples lives changed."
                  )
                );
              }()
            )
          )
        ),
        React.createElement(
          "div",
          { className: "soft-half soft-sides@portable soft-double-sides@anchored" },
          React.createElement(
            "h4",
            { className: "soft soft-double-ends text-center@lap-and-up flush-bottom" },
            "Read Some Recent Stories"
          ),
          React.createElement(
            "div",
            { className: "grid" },
            React.createElement(
              "div",
              { className: "grid__item one-whole push-half-bottom push-bottom@portable hard-bottom" },
              React.createElement(
                _SideBySide2["default"],
                {
                  link: "https://newspring.cc/stories/jen-feagles",
                  image: {
                    url: "//dg0ddngxdz549.cloudfront.net/images/cached/images/remote/http_s3.amazonaws.com/ns.images/newspring/collection/stories/JenFeagles.hero_1700_723_90_c1.jpg"
                  }
                },
                React.createElement(
                  "h4",
                  { className: "push-half-top@portable push-top@anchored" },
                  "Jennifer Feagles Story"
                ),
                React.createElement(
                  "p",
                  null,
                  "Jennifer Feagles shares about how Jesus gave her more than she could have imagined when she put him first in her…"
                ),
                React.createElement(
                  _reactRouter.Link,
                  {
                    to: "https://newspring.cc/stories/jen-feagles",
                    className: "h6 btn--small btn--dark-tertiary soft-sides@portable one-whole@handheld"
                  },
                  "Watch Story"
                )
              )
            ),
            React.createElement(
              "div",
              { className: "grid__item one-whole push-half-bottom push-bottom@portable hard-bottom" },
              React.createElement(
                _SideBySide2["default"],
                {
                  link: "https://newspring.cc/stories/brooke-brissey",
                  image: {
                    url: "//dg0ddngxdz549.cloudfront.net/images/cached/images/remote/http_s3.amazonaws.com/ns.images/newspring/collection/stories/BrookeBrissey_Hero_1700_723_90_c1.jpg"
                  }
                },
                React.createElement(
                  "h4",
                  { className: "push-half-top@portable push-top@anchored" },
                  "Brooke Brissey's Story"
                ),
                React.createElement(
                  "p",
                  null,
                  "Brooke Brissey discovered the power of a financial plan to obey God's call on her life. This is her story in her own…                  "
                ),
                React.createElement(
                  _reactRouter.Link,
                  {
                    to: "https://newspring.cc/stories/brooke-brissey",
                    className: "h6 btn--small btn--dark-tertiary soft-sides@portable one-whole@handheld"
                  },
                  "Read Story"
                )
              )
            )
          )
        )
      )
    );
  };

  return Layout;
}(_react.Component), _class.contextTypes = {
  shouldAnimate: _react.PropTypes.bool
}, _temp2);

// <div className="soft-ends push-half-ends hard-sides constrain-mobile">
//
//
//   <h3 className="text-dark-tertiary" style={{lineHeight: "1.75"}}>
//     <span className="text-dark-secondary">
//       {this.capitalizeFirstLetter(schedule.schedule.description.toLowerCase())}
//
//
//     </span> using my <span className="text-dark-secondary">
//       {schedule.payment.paymentType.toLowerCase()}
//     </span> ending in <span className="text-dark-secondary">
//       {schedule.payment.accountNumber.slice(-4)}
//     </span>
//   </h3>
//   {(() => {
//     if (state.isActive) {
//       return (
//         <button className="btn--alert btn--thin btn--small" onClick={stop}>
//           Cancel gift
//         </button>
//       )
//     }
//   })()}
// </div>
//
// <p className="text-center soft-ends soft-double@anchored flush-bottom soft-ends soft-sides@portable">
//   Thank you so much for your gift! It is because of your generosity we are able to continue telling stories of the greatness of Jesus and seeing peoples lives changed.
// </p>

exports["default"] = Layout;
module.exports = exports['default'];