"use strict";

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _reactRedux = require("react-redux");

var _coreClientComponents = require("../../../../core/client/components");

var _actionButtons = require("./../action-buttons");

var _actionButtons2 = _interopRequireDefault(_actionButtons);

var _addScheduleStylesCss = require("./add-schedule.styles.css");

var _addScheduleStylesCss2 = _interopRequireDefault(_addScheduleStylesCss);

var _actions = require("../../actions");

// We only care about the give state
function mapStateToProps(state) {
  return {
    give: state.give
  };
}

var CartContainer = (function (_Component) {
  _inherits(CartContainer, _Component);

  function CartContainer() {
    var _this = this;

    _classCallCheck(this, _CartContainer);

    _Component.apply(this, arguments);

    this.state = {
      fundId: false,
      fundLabel: null,
      frequency: null
    };

    this.monentize = function (value, fixed) {

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
    };

    this.format = function (value, target) {
      var _props$addTransactions;

      var id = target.id;
      var name = target.name;

      value = _this.monentize(value);

      _this.props.addTransactions((_props$addTransactions = {}, _props$addTransactions[id] = {
        value: Number(value.replace(/[^0-9\.]+/g, '')),
        label: name
      }, _props$addTransactions));

      return value;
    };

    this.saveData = function (value, target) {
      var _props$addTransactions2;

      var id = target.id;
      var name = target.name;

      value = _this.monentize(value);

      _this.props.addTransactions((_props$addTransactions2 = {}, _props$addTransactions2[id] = {
        value: Number(value.replace(/[^0-9\.]+/g, '')),
        label: name
      }, _props$addTransactions2));

      return true;
    };

    this.setFund = function (id) {
      var selectedFund = _this.props.accounts.filter(function (fund) {
        return fund.Id === Number(id);
      });

      var _selectedFund$0 = selectedFund[0];
      var PublicName = _selectedFund$0.PublicName;
      var Name = _selectedFund$0.Name;

      var fund = PublicName ? PublicName : Name;

      _this.setState({ fundId: id, fundLabel: fund });
    };

    this.setFrequency = function (value) {
      _this.setState({ frequency: value });
      _this.props.saveSchedule({ frequency: value });
    };
  }

  CartContainer.prototype.render = function render() {
    var _props$give = this.props.give;
    var total = _props$give.total;
    var transactions = _props$give.transactions;

    var schedules = [{
      label: "One Time",
      value: "One-Time"
    }, {
      label: "Every Week",
      value: "Weekly"
    }, {
      label: "Every Two Weeks",
      value: "Bi-Weekly"
    },
    // {
    //   label: "Twice a Month",
    //   value: "Twice a Month"
    // },
    {
      label: "Once a Month",
      value: "Monthly"
    }];

    var mappedAccounts = this.props.accounts.map(function (account) {
      return {
        value: account.Id,
        label: account.PublicName || account.Name
      };
    });

    if (!mappedAccounts.length) {
      return null;
    }

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

    return React.createElement(
      "div",
      { className: "push-top@handheld soft-half-top@lap-and-up" },
      React.createElement(
        _coreClientComponents.Forms.Form,
        {
          classes: ["text-left", "hard"],
          submit: function (e) {
            e.preventDefault();
          },
          id: "add-to-cart"
        },
        React.createElement(_coreClientComponents.Forms.Select, {
          items: schedules,
          name: "schedules",
          id: "schedules",
          hideLabel: true,
          ref: "schedules",
          classes: ["soft-bottom", "display-inline-block"],
          inputClasses: "outlined--dotted outlined--light h3 hard-top flush-bottom",
          includeBlank: true,
          onChange: this.setFrequency
        }),
        React.createElement(
          "h3",
          { className: "text-dark-tertiary display-inline-block push-half-bottom push-half-right" },
          " I'd like to give to "
        ),
        React.createElement(_coreClientComponents.Forms.Select, {
          items: mappedAccounts,
          name: "select-account",
          id: "select",
          hideLabel: true,
          ref: "select-account",
          classes: ["soft-bottom", "display-inline-block"],
          inputClasses: "outlined--dotted outlined--light h3 hard-top flush-bottom",
          placeholder: "select fund here",
          onChange: this.setFund
        }),
        React.createElement(
          "div",
          { className: "display-inline-block" },
          React.createElement(
            "h3",
            { className: "text-dark-tertiary display-inline-block push-half-bottom" },
            "with "
          ),
          React.createElement(_coreClientComponents.Forms.Input, {
            id: this.state.fundId || -1,
            name: this.state.fundLabel || "primary-account",
            hideLabel: true,
            ref: "primary-account",
            classes: ["soft-bottom", "input--active", "display-inline-block"],
            inputClasses: "outlined--dotted outlined--light h3 hard-top flush-bottom text-dark-primary " + _addScheduleStylesCss2["default"]["show-placeholder"],
            placeholder: "$0.00",
            validate: this.saveData,
            format: this.format,
            style: { width: "200px" },
            disabled: !this.state.fundId
          })
        ),
        React.createElement(
          "div",
          { className: "push-top" },
          React.createElement(_actionButtons2["default"], {
            disabled: total <= 0
          })
        )
      )
    );
  };

  var _CartContainer = CartContainer;
  CartContainer = _reactRedux.connect(mapStateToProps, _actions.give)(CartContainer) || CartContainer;
  return CartContainer;
})(_react.Component);

exports["default"] = CartContainer;
module.exports = exports["default"];