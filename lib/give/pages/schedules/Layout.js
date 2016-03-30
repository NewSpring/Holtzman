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

var _loading = require("../../../core/components/loading");

var _icons = require("../../../core/components/icons");

var _meta = require("../../../core/components/meta");

var _meta2 = _interopRequireDefault(_meta);

var _AddSchedule = require("../../blocks/AddSchedule");

var _AddSchedule2 = _interopRequireDefault(_AddSchedule);

var _split = require("../../../core/blocks/split");

var _split2 = _interopRequireDefault(_split);

var _ActionButtons = require("../../blocks/ActionButtons");

var _ActionButtons2 = _interopRequireDefault(_ActionButtons);

var _components = require("../../components");

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


    var photo = "//s3.amazonaws.com/ns.assets/apollos/39616.perry.cen.web.scheduleyourgivingad_1x2.jpg";
    return React.createElement(
      "div",
      null,
      React.createElement(
        _split2["default"],
        { nav: true, classes: ["background--light-primary"] },
        React.createElement(_meta2["default"], { title: "Schedule Your Giving", image: photo }),
        React.createElement(_split.Right, {
          background: photo,
          mobile: false })
      ),
      React.createElement(
        _split.Left,
        { scroll: true, classes: ["background--light-secondary"], ref: "container" },
        function () {
          if (recoverableSchedules.length) {
            return React.createElement(
              "div",
              { className: "background--primary soft-half soft-sides@portable soft-double-sides@anchored" },
              React.createElement(
                "div",
                { className: "soft-ends soft-double-ends@lap-and-up soft-side@lap-and-up" },
                React.createElement(
                  "h4",
                  { className: "text-light-primary soft-half-sides soft-half-bottom" },
                  "Hey ",
                  person.nickName || person.firstName,
                  "!"
                ),
                React.createElement(
                  "h5",
                  { className: "text-light-primary soft-half-sides soft-bottom" },
                  "We have found giving schedules from our previous system that need to be transferred! To transfer a schedule, click below."
                ),
                React.createElement(
                  _reactRouter.Link,
                  { to: "/give/schedules/transfer", className: "btn--light" },
                  "Transfer Schedules"
                )
              )
            );
          }
        }(),
        React.createElement(
          "div",
          { className: "soft-double-sides@lap-and-up soft-double-ends@lap-and-up soft background--light-primary" },
          React.createElement(
            "div",
            { className: "text-left soft-double-top hard-left@lap-and-up soft-half-bottom soft@anchored " },
            React.createElement(
              "div",
              { className: "soft-double-ends@anchored" },
              React.createElement(_AddSchedule2["default"], { accounts: accounts })
            )
          )
        ),
        React.createElement(
          "div",
          { id: "active-schedules", className: "soft-half soft-sides@portable soft-double-sides@anchored soft-double-bottom@anchored soft-bottom@portable" },
          React.createElement(
            "h4",
            { className: "soft soft-double-ends text-center flush-bottom" },
            "My Schedules"
          ),
          function () {

            if (!Meteor.user()) {
              return React.createElement(
                "div",
                { className: "text-center soft-sides" },
                React.createElement(
                  "p",
                  null,
                  React.createElement(
                    "em",
                    null,
                    "Please sign in or create an account to setup or view your scheduled contributions!"
                  )
                )
              );
            }

            if (!schedules.length && !ready) {
              // loading
              return React.createElement(
                "div",
                { className: "text-center soft" },
                React.createElement(_loading.Spinner, { styles: { width: "40px", height: "40px" } })
              );
            }

            if (!schedules.length && ready) {
              return React.createElement(
                "div",
                { className: "text-center soft-sides" },
                React.createElement(
                  "p",
                  null,
                  React.createElement(
                    "em",
                    null,
                    "You don't have any active scheduled contributions. If you created a new schedule, it may take a few minutes to be reflected here"
                  )
                )
              );
            }

            return React.createElement(
              "div",
              null,
              schedules.map(function (schedule, i) {

                if (!schedule.details || !schedule.details[0].account) {
                  return null;
                }

                var complete = false;
                if (new Date(schedule.next) < new Date() && schedule.schedule.value === "One-Time") {
                  complete = true;
                }

                return React.createElement(
                  "div",
                  { key: i, className: "soft card" },
                  React.createElement(
                    _reactRouter.Link,
                    { to: "/give/schedules/" + schedule.id },
                    React.createElement(
                      "div",
                      { className: "grid", style: { verticalAlign: "middle" }, key: i },
                      React.createElement(
                        "div",
                        { className: "grid__item one-half", style: { verticalAlign: "middle" } },
                        React.createElement(
                          "h6",
                          { className: "text-dark-tertiary push-half-bottom" },
                          _this2.capitalizeFirstLetter(schedule.schedule.description.toLowerCase()),
                          React.createElement(
                            "span",
                            { className: "text-dark-secondary" },
                            complete ? " - Complete" : ""
                          )
                        ),
                        React.createElement(
                          "h5",
                          { className: "flush one-whole", style: {
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap"
                            } },
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
                              _this2.formatDate(schedule.start)
                            )
                          )
                        )
                      ),
                      React.createElement(
                        "div",
                        { className: "grid__item one-half text-right", style: { verticalAlign: "middle" } },
                        React.createElement(
                          "div",
                          { className: "soft-half-right" },
                          React.createElement(
                            "h4",
                            { className: "text-dark-tertiary one-whole flush soft-right@handheld soft-double-right@lap-and-up", style: {
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap"
                              } },
                            _this2.monentize(schedule.details[0].amount),
                            React.createElement("span", { className: "text-primary icon-arrow-next locked", style: {
                                right: "-5px",
                                top: "1px"
                              } })
                          )
                        )
                      )
                    )
                  )
                );
              }),
              React.createElement(
                "p",
                { className: "soft text-center" },
                React.createElement(
                  "small",
                  null,
                  React.createElement(
                    "em",
                    null,
                    "Changes to schedules may take a few minutes to be reflected here."
                  )
                )
              )
            );
          }()
        )
      )
    );
  };

  return Layout;
}(_react.Component), _class.contextTypes = {
  shouldAnimate: _react.PropTypes.bool
}, _temp2);
exports["default"] = Layout;
module.exports = exports['default'];