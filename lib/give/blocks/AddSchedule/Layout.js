"use strict";

exports.__esModule = true;
exports["default"] = undefined;

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _class, _temp;

var _react = require("react");

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var _velocityReact = require("velocity-react");

var _ActionButtons = require("../ActionButtons");

var _ActionButtons2 = _interopRequireDefault(_ActionButtons);

var _components = require("../../../core/components");

var _styles = {
  "show-placeholder": "styles__show-placeholder___mXXe2",
  "select": "styles__select___24J20"
};

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// <div className="display-inline-block">
//
//
//   <h3 className="text-dark-tertiary display-inline-block push-half-bottom">
//     I want this to start on&nbsp;
//   </h3>
//
//   <Forms.Input
//     name="date"
//     hideLabel={true}
//     ref="date"
//     classes={["soft-bottom", "input--active", "display-inline-block"]}
//     inputClasses={`outlined--dotted outlined--light h3 hard-top flush-bottom text-dark-primary ${Styles["show-placeholder"]}`}
//     placeholder="select date"
//     style={{width: "200px"}}
//   />
//
// </div>

var Layout = (_temp = _class = function (_Component) {
  (0, _inherits3["default"])(Layout, _Component);

  function Layout() {
    (0, _classCallCheck3["default"])(this, Layout);
    return (0, _possibleConstructorReturn3["default"])(this, _Component.apply(this, arguments));
  }

  Layout.prototype.render = function render() {
    var _props = this.props;
    var schedules = _props.schedules;
    var setFrequency = _props.setFrequency;
    var accounts = _props.accounts;
    var setFund = _props.setFund;
    var state = _props.state;
    var save = _props.save;
    var format = _props.format;
    var total = _props.total;
    var saveDate = _props.saveDate;
    var existing = _props.existing;
    var date = _props.date;
    var ready = _props.ready;


    total || (total = 0);

    var prefillFund = accounts[0].value;
    if (existing && existing.details && existing.details.length && existing.details[0].account) {
      prefillFund = existing.details[0].account.id;
    }

    // let defaultDate = Moment().add(1, "days")
    var defaultDate = void 0;
    if (existing && existing.next && new Date(existing.next) > new Date()) {
      defaultDate = new Date(existing.next);
    }

    return React.createElement(
      _velocityReact.VelocityComponent,
      {
        animation: "transition.fadeIn",
        duration: 750,
        runOnMount: this.context.shouldAnimate
      },
      React.createElement(
        "div",
        { className: "push-top@handheld soft-half-top@lap-and-up" },
        React.createElement(
          _components.Forms.Form,
          {
            classes: ["text-left", "hard"],
            submit: function submit(e) {
              e.preventDefault();
            },
            id: "add-to-cart"
          },
          React.createElement(
            "h3",
            { className: "text-dark-tertiary display-inline-block push-half-bottom push-half-right" },
            "I'd like to give  "
          ),
          React.createElement(_components.Forms.Input, {
            id: state.fundId || -1,
            name: state.fundLabel || "primary-account",
            hideLabel: true,
            ref: "primary-account",
            classes: ["soft-bottom", "input--active", "display-inline-block"],
            inputClasses: "outlined--dotted outlined--light h3 hard-top flush-bottom text-dark-primary " + _styles2["default"]["show-placeholder"],
            placeholder: "$0.00",
            validate: save,
            format: format,
            style: { width: "200px" },
            defaultValue: existing && existing.details && existing.details.length && existing.details[0].amount ? "$" + existing.details[0].amount : null

          }),
          React.createElement(
            "h3",
            { className: "text-dark-tertiary display-inline-block push-half-bottom" },
            "to "
          ),
          React.createElement(_components.Forms.Select, {
            items: accounts,
            name: "select-account",
            id: "select",
            hideLabel: true,
            ref: "select-account",
            classes: ["soft-bottom", "display-inline-block", _styles2["default"].select],
            inputClasses: "outlined--dotted outlined--light h3 hard-top flush-bottom text-light-tertiary",
            placeholder: "select fund here",
            onChange: setFund,
            defaultValue: prefillFund
          }),
          React.createElement(
            "h3",
            { className: "text-dark-tertiary display-inline-block push-half-bottom" },
            " "
          ),
          React.createElement(_components.Forms.Select, {
            items: schedules,
            name: "schedules",
            id: "schedules",
            hideLabel: true,
            ref: "schedules",
            classes: ["soft-bottom", "display-inline-block", _styles2["default"].select],
            inputClasses: "outlined--dotted outlined--light h3 hard-top flush-bottom text-light-tertiary",
            includeBlank: true,
            placeholder: "choose frequency",
            onChange: setFrequency,
            defaultValue: existing ? existing.frequency : null
          }),
          React.createElement(
            "h3",
            { className: "text-dark-tertiary display-inline-block push-half-bottom" },
            "  starting  "
          ),
          React.createElement(_components.Forms.Date, {
            id: "start-date",
            name: "start-date",
            hideLabel: true,
            ref: "start-date",
            classes: ["soft-bottom", "input--active", "display-inline-block"],
            inputClasses: "outlined--dotted outlined--light h3 hard-top flush-bottom text-dark-primary " + _styles2["default"]["show-placeholder"],
            placeholder: "select date",
            past: false,
            today: false,
            format: function format(value) {
              return (0, _moment2["default"])(value).format("MMM D, YYYY");
            },
            validation: saveDate,
            defaultValue: defaultDate
          }),
          React.createElement(
            "div",
            { className: "push-top" },
            React.createElement(_ActionButtons2["default"], {
              disabled: total <= 0 || !ready,
              disabledGuest: true,
              text: this.props.text || "Schedule Now",
              onClick: this.props.onSubmitSchedule,
              dataId: this.props.dataId
            })
          )
        )
      )
    );
  };

  return Layout;
}(_react.Component), _class.contextTypes = {
  shouldAnimate: _react.PropTypes.bool
}, _temp);
exports["default"] = Layout;
module.exports = exports['default'];