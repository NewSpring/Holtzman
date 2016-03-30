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

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var _reactRouter = require("react-router");

var _loading = require("../../../../core/components/loading");

var _icons = require("../../../../core/components/icons");

var _AddSchedule = require("../../../blocks/AddSchedule");

var _AddSchedule2 = _interopRequireDefault(_AddSchedule);

var _split = require("../../../../core/blocks/split");

var _split2 = _interopRequireDefault(_split);

var _meta = require("../../../../core/components/meta");

var _meta2 = _interopRequireDefault(_meta);

var _ActionButtons = require("../../../blocks/ActionButtons");

var _ActionButtons2 = _interopRequireDefault(_ActionButtons);

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

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3["default"])(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
      expandedSchedule: null
    }, _this.expandSchedule = function (e) {
      e.preventDefault();

      var dataset = e.currentTarget.dataset;
      var id = dataset.id;


      if (_this.state.expandedSchedule === Number(id)) {
        _this.collapseSchedule();
        return;
      }

      _this.setState({
        expandedSchedule: Number(id)
      });
    }, _this.collapseSchedule = function () {
      _this.setState({
        expandedSchedule: null
      });
    }, _this.formatDate = function (date) {
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

  Layout.prototype.componentWillMount = function componentWillMount() {
    if (this.props.recoverableSchedules.length) {
      var id = this.props.recoverableSchedules[0].id;
      this.setState({
        expandedSchedule: Number(id)
      });
    }
  };

  Layout.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props;
    var schedules = _props.schedules;
    var accounts = _props.accounts;
    var ready = _props.ready;
    var recoverableSchedules = _props.recoverableSchedules;
    var cancelSchedule = _props.cancelSchedule;
    var confirm = _props.confirm;
    var person = _props.person;


    return React.createElement(
      "div",
      null,
      React.createElement(
        _split2["default"],
        { nav: true, classes: recoverableSchedules.length ? ["background--light-secondary"] : ["background--light-primary"] },
        React.createElement(_meta2["default"], { title: "Transfer Your Giving Schedule" }),
        React.createElement(_split.Right, {
          background: "//s3.amazonaws.com/ns.assets/apollos/29516.marketing.cen.webad.thebestisyettocome_1x2.png",
          mobile: false })
      ),
      React.createElement(
        _split.Left,
        { scroll: true, classes: recoverableSchedules.length ? ["background--light-secondary"] : ["background--light-primary"], ref: "container" },
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
        function () {
          var count = 0;
          if (recoverableSchedules.length) {
            return React.createElement(
              "div",
              null,
              React.createElement(
                "div",
                { className: "background--light-primary soft-half soft-sides@portable soft-double-sides@anchored soft-double-top" },
                React.createElement(
                  "div",
                  { className: "soft-ends soft-double-ends@lap-and-up push-top" },
                  React.createElement(
                    "h4",
                    { className: "soft-half-sides soft-half-bottom" },
                    "Hey ",
                    person.nickName || person.firstName,
                    "!"
                  ),
                  React.createElement(
                    "h5",
                    { className: "soft-half-sides" },
                    "We have found giving schedules from our previous giving system that need to be transferred! To transfer a schedule, click below and enter your payment details."
                  )
                )
              ),
              React.createElement(
                "div",
                { className: "soft-half soft-sides@portable soft-double-sides@anchored" },
                recoverableSchedules.map(function (schedule, i) {
                  count++;
                  if (!schedule.details || !schedule.details[0].account) {
                    return null;
                  }

                  var arrow = "icon-arrow-down";
                  if (Number(schedule.id) === _this2.state.expandedSchedule) {
                    arrow = "icon-arrow-up";
                  }
                  return React.createElement(
                    "div",
                    { key: i, className: "card" },
                    React.createElement(
                      "div",
                      { className: "soft", onClick: _this2.expandSchedule, "data-id": schedule.id, style: { cursor: "pointer" } },
                      React.createElement(
                        "div",
                        { className: "grid", style: { verticalAlign: "middle" }, key: i },
                        React.createElement(
                          "div",
                          { className: "grid__item two-thirds", style: { verticalAlign: "middle" } },
                          React.createElement(
                            "div",
                            { className: "display-inline-block", style: { verticalAlign: "middle" } },
                            React.createElement(
                              "h6",
                              { className: "text-dark-tertiary push-half-bottom" },
                              _this2.capitalizeFirstLetter(schedule.schedule.description.toLowerCase())
                            ),
                            React.createElement(
                              "h5",
                              { className: "flush text-dark" },
                              schedule.details[0].account.name
                            ),
                            React.createElement(
                              "p",
                              { className: "flush soft-half-top text-dark-tertiary" },
                              React.createElement(
                                "small",
                                null,
                                React.createElement(
                                  "em",
                                  null,
                                  "This began on ",
                                  _this2.formatDate(schedule.start)
                                )
                              )
                            )
                          )
                        ),
                        React.createElement(
                          "div",
                          { className: "grid__item one-third text-right", style: { verticalAlign: "middle" } },
                          React.createElement(
                            "div",
                            { className: "soft-half-right" },
                            React.createElement(
                              "h4",
                              { className: "text-dark-tertiary flush", style: { paddingRight: "25px" } },
                              _this2.monentize(schedule.details[0].amount),
                              React.createElement("span", { className: "text-dark-tertiary " + arrow + " locked", style: {
                                  right: "-3px",
                                  top: "1px"
                                } })
                            )
                          )
                        )
                      )
                    ),
                    function () {
                      if (Number(schedule.id) === _this2.state.expandedSchedule) {
                        return React.createElement(
                          "div",
                          { className: "text-light-primary soft outlined--light outlined--top flush one-whole" },
                          React.createElement(_AddSchedule2["default"], { accounts: accounts, existing: schedule, text: "Transfer", onClick: confirm, dataId: schedule.id }),
                          React.createElement(
                            "h6",
                            {
                              className: "outlined--light outlined--bottom display-inline-block text-dark-tertiary push-top",
                              style: { cursor: "pointer" },
                              onClick: cancelSchedule,
                              "data-id": schedule.id
                            },
                            "Stop Contribution"
                          )
                        );
                      }
                    }()
                  );
                }),
                React.createElement(
                  "div",
                  { className: "card" },
                  React.createElement(
                    "div",
                    { className: "card__item" },
                    React.createElement(
                      "p",
                      { className: "soft text-center soft-double-sides@lap-and-up" },
                      React.createElement(
                        "small",
                        null,
                        React.createElement(
                          "em",
                          null,
                          "Please be aware that your existing schedule will continue to charge the account on file until you transfer it to our new system."
                        )
                      )
                    )
                  )
                )
              )
            );
          }

          return React.createElement(
            "div",
            null,
            React.createElement(
              "div",
              { className: "background--light-primary soft-half soft-sides@portable soft-double-sides@anchored soft-double-ends" },
              React.createElement(
                "div",
                { className: "soft soft-double@lap-and-up push-top@lap-and-up" },
                React.createElement(
                  "h2",
                  { className: "soft-half-bottom" },
                  "Thank you ",
                  person.nickName || person.firstName || "so much",
                  "!"
                ),
                React.createElement(
                  "p",
                  null,
                  React.createElement(
                    "strong",
                    null,
                    "Your gift matters!"
                  )
                ),
                React.createElement(
                  "p",
                  null,
                  "We believe that every number has a name, every name has a story, and every story matters to God. Because you give, we are able to see thousands of life change stories every year at NewSpring Church. There is no organization with more potential to change the world than the local church. Thank you for being a difference maker!                      "
                ),
                React.createElement(
                  "p",
                  null,
                  React.createElement(
                    "em",
                    null,
                    "“Every number has a name, every name has a story, and every story matters to God.”"
                  )
                )
              )
            )
          );
        }()
      )
    );
  };

  return Layout;
}(_react.Component), _class.contextTypes = {
  shouldAnimate: _react.PropTypes.bool
}, _temp2);
exports["default"] = Layout;
module.exports = exports['default'];