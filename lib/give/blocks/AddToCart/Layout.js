"use strict";

exports.__esModule = true;
exports["default"] = undefined;

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require("react");

var _components = require("../../../core/components");

var _ActionButtons = require("../ActionButtons");

var _ActionButtons2 = _interopRequireDefault(_ActionButtons);

var _Subfund = require("./Subfund");

var _Subfund2 = _interopRequireDefault(_Subfund);

var _styles = {
  "show-placeholder": "styles__show-placeholder___gdvyn",
  "select": "styles__select___3YAtu"
};

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Layout = function (_Component) {
  (0, _inherits3["default"])(Layout, _Component);

  function Layout() {
    var _temp, _this, _ret;

    (0, _classCallCheck3["default"])(this, Layout);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3["default"])(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
      SubFundInstances: 1,
      instances: [
        // {
        //   id: Number,
        //   accountId: Number
        // }
      ]
    }, _this.update = function (key, value, amount) {

      var getInstance = function getInstance(id) {
        var instance = _this.state.instances.filter(function (x) {
          return x.id === key;
        });

        return instance && instance[0];
      };

      var instance = getInstance();

      if (instance) {
        var current = [].concat(_this.state.instances);
        var updated = current.map(function (x) {
          if (x.id === key) {
            return {
              id: key,
              accountId: Number(value),
              amount: amount
            };
          }

          return x;
        });

        _this.setState({
          SubFundInstances: updated.length + 1,
          instances: updated
        });
      } else {
        _this.setState({
          SubFundInstances: _this.state.SubFundInstances + 1,
          instances: [].concat(_this.state.instances, [{ id: key, accountId: Number(value), amount: amount }])
        });
      }
    }, _this.remove = function (key, value) {
      var newInstances = _this.state.instances.filter(function (x) {
        return x.id != key;
      });

      // if an instance is removed and that instance is not at the end
      if (key !== 0 && _this.state.instances.length > newInstances.length && _this.state.instances.length !== key + 1) {
        // currently no good way to reorder sub funds
        // so, force re-render and fill the data back in
        _this.setState({ SubFundInstances: 1 });

        // remap ids
        newInstances = newInstances.map(function (newInstance, i) {
          newInstance.id = i;
          return newInstance;
        });

        setTimeout(function () {
          _this.setState({
            SubFundInstances: newInstances.length + 1,
            instances: newInstances
          });
        }, 100);
        return;
      }

      _this.setState({
        SubFundInstances: newInstances.length + 1,
        instances: newInstances
      });
    }, _temp), (0, _possibleConstructorReturn3["default"])(_this, _ret);
  }

  Layout.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props;
    var accounts = _props.accounts;
    var save = _props.save;
    var format = _props.format;
    var preFill = _props.preFill;
    var total = _props.total;
    var transactions = _props.transactions;
    var monentize = _props.monentize;
    var donate = _props.donate;


    var accountsCount = [];
    for (var i = 0; i < this.state.SubFundInstances; i++) {
      accountsCount.push(i);
    }

    // console.log(this.state.instances.length, accountsCount.length)

    return React.createElement(
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
          "div",
          { className: "display-inline-block" },
          accountsCount.map(function (key) {

            // collect data for re-render on reorder
            var selectVal = void 0,
                inputVal = void 0;
            var existingInstance = _this2.state.instances[key];
            if (existingInstance) {
              selectVal = existingInstance.accountId;
              inputVal = existingInstance.amount;
            }

            var instanceAccounts = _this2.state.instances.map(function (x) {
              return x.accountId;
            });

            var copiedAccounts = [].concat(accounts).filter(function (x) {

              var alreadySelectedByThisInstance = _this2.state.instances.filter(function (y) {
                return y.id === key;
              });

              if (alreadySelectedByThisInstance.length && Number(alreadySelectedByThisInstance[0].accountId) === x.value) {
                return true;
              }

              return instanceAccounts.indexOf(x.value) === -1;
            });

            if (key === 0) {
              return React.createElement(_Subfund2["default"], {
                accounts: copiedAccounts,
                preFill: preFill,
                primary: true,
                key: key,
                update: _this2.update,
                remove: _this2.remove,
                instance: key,
                donate: donate,
                selectVal: selectVal,
                inputVal: inputVal
              });
            }

            return React.createElement(_Subfund2["default"], {
              accounts: copiedAccounts,
              preFill: preFill,
              key: key,
              update: _this2.update,
              remove: _this2.remove,
              instance: key,
              selectVal: selectVal,
              inputVal: inputVal
            });
          }),
          React.createElement(
            "h3",
            { className: "display-inline-block text-dark-tertiary push-half-bottom push-half-right" },
            "so my total is"
          ),
          React.createElement(
            "h3",
            { className: "display-inline-block text-brand push-half-bottom" },
            monentize(total, true)
          )
        ),
        React.createElement(
          "div",
          { className: "push-top" },
          React.createElement(_ActionButtons2["default"], {
            disabled: total <= 0
          })
        )
      )
    );
  };

  return Layout;
}(_react.Component);

// <h3 className="text-dark-tertiary display-inline-block push-half-bottom push-half-right">
//   I'd like to give
// </h3>
//
// <Forms.Input
//   id={primary.id}
//   name={primary.name}
//   type="tel"
//   hideLabel={true}
//   classes={["soft-bottom", "input--active", "display-inline-block"]}
//   inputClasses={`outlined--dotted outlined--light h3 hard-top flush-bottom text-dark-primary ${Styles["show-placeholder"]}`}
//   placeholder="$0.00"
//   validate={save}
//   format={format}
//   defaultValue={preFill(primary.id)}
//   style={{maxWidth: "150px"}}
// />
//
// <h3 className={`text-dark-tertiary display-inline-block push-half-bottom push-half-right`}>
//   to
// </h3>
//
// <Forms.Select
//   items={accounts}
//   name="select-account"
//   id={`primary_select`}
//   hideLabel={true}
//   classes={["soft-bottom", "display-inline-block"]}
//   inputClasses={`outlined--dotted outlined--light h3 hard-top flush-bottom`}
//   placeholder="select fund"
//   includeBlank={true}
// />

// {(() => {
// if ((accounts && accounts.length > 1) || !accounts.length) {
//   if (primary.id) {
//     delete transactions[primary.id]
//   } else {
//     delete transactions[-1]
//   }
//
//   return (
//     <div>
//       <SubFund accounts={otherAccounts} preFill={preFill} />
//       <div className="clearfix"></div>
//     </div>
//
//   )
// }
//
// return (
//   <h3 className="text-dark-tertiary display-inline-block push-half-bottom">
//     {`to ${accounts[0].name}`}&nbsp;
//   </h3>
// )

// })()}


exports["default"] = Layout;
module.exports = exports['default'];