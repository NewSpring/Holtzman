"use strict";

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _reactRedux = require("react-redux");

var _coreClientComponents = require("../../../../core/client/components");

var _actions = require("../../actions");

var _addToCartStylesCss = require("./add-to-cart.styles.css");

var _addToCartStylesCss2 = _interopRequireDefault(_addToCartStylesCss);

// We only care about the give state
function mapStateToProps(state) {
  return {
    give: state.give
  };
}

var SubFund = (function (_Component) {
  _inherits(SubFund, _Component);

  function SubFund() {
    var _this = this;

    _classCallCheck(this, _SubFund);

    _Component.apply(this, arguments);

    this.state = {
      active: false,
      focused: false,
      fund: false,
      id: "select-account_" + Date.now() + "_" + Math.floor(Math.random() * 100)
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
      var id = target.id;
      var name = target.name;

      value = _this.monentize(value);

      var numberValue = Number(value.replace(/[^\d.-]/g, ""));

      if (numberValue > 0) {
        var _props$addTransactions;

        _this.setState({ active: true });
        _this.props.addTransactions((_props$addTransactions = {}, _props$addTransactions[id] = {
          value: Number(value.replace(/[^0-9\.]+/g, '')),
          label: name
        }, _props$addTransactions));
      } else {
        _this.setState({
          active: false,
          fund: false,
          id: "select-account_" + Date.now() + "_" + Math.floor(Math.random() * 100)
        });
        _this.props.clearTransactions(id);
      }

      return value;
    };

    this.showInputs = function (id) {

      var selectedFund = _this.props.accounts.filter(function (fund) {
        return fund.Id === Number(id);
      });

      var _selectedFund$0 = selectedFund[0];
      var PublicName = _selectedFund$0.PublicName;
      var Name = _selectedFund$0.Name;

      var fund = PublicName ? PublicName : Name;

      var updatedState = { fund: fund };

      if (id != _this.state.id) {
        updatedState = _extends({}, updatedState, { id: id });
      }

      _this.setState(updatedState);
    };

    this.statusClass = function () {
      if (_this.state.fund) {
        return "text-dark-tertiary";
      } else {
        return "text-light-tertiary";
      }
    };
  }

  SubFund.prototype.render = function render() {
    var _this2 = this;

    var mappedAccounts = this.props.accounts.map(function (account) {
      return {
        value: account.Id,
        label: account.PublicName || account.Name
      };
    });

    if (!mappedAccounts.length) {
      return null;
    }

    return React.createElement(
      "div",
      null,
      React.createElement(
        "div",
        {
          className: "display-inline-block push-half-bottom h3 push-half-right " + this.statusClass() },
        "and give to"
      ),
      React.createElement(_coreClientComponents.Forms.Select, {
        items: mappedAccounts,
        name: "select-account",
        id: this.state.id + "_select",
        hideLabel: true,
        ref: "select-account",
        classes: ["soft-bottom", "display-inline-block"],
        inputClasses: this.statusClass() + " outlined--dotted outlined--light h3 hard-top flush-bottom",
        placeholder: "select fund here",
        onChange: this.showInputs
      }),
      (function () {
        if (_this2.state.fund) {
          return React.createElement(
            "div",
            { className: "display-block" },
            React.createElement(
              "h3",
              { className: _this2.statusClass() + " push-half-bottom push-half-right display-inline-block" },
              "with"
            ),
            React.createElement(_coreClientComponents.Forms.Input, {
              id: _this2.state.id,
              name: _this2.state.fund || "secondary-account",
              hideLabel: true,
              type: "tel",
              ref: "secondary-account",
              classes: ["soft-bottom", "input--active", "display-inline-block"],
              inputClasses: "outlined--dotted outlined--light h3 hard-top flush-bottom text-dark-primary " + _addToCartStylesCss2["default"]["show-placeholder"],
              placeholder: "$0.00",
              format: _this2.format
            })
          );
        }
      })()
    );
  };

  var _SubFund = SubFund;
  SubFund = _reactRedux.connect(mapStateToProps, _actions.give)(SubFund) || SubFund;
  return SubFund;
})(_react.Component);

exports["default"] = SubFund;
module.exports = exports["default"];