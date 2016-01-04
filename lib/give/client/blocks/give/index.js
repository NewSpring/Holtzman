"use strict";

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRedux = require("react-redux");

var _reactMixin = require("react-mixin");

var _reactMixin2 = _interopRequireDefault(_reactMixin);

var _velocityReact = require("velocity-react");

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var _coreClientComponents = require("../../../../core/client/components");

var _coreClientComponentsLoading = require("../../../../core/client/components/loading");

var _rockLibCollections = require("../../../../rock/lib/collections");

var _actions = require("../../actions");

var _fieldsets = require("./fieldsets");

// We only care about the give state
var map = function map(state) {
  return { give: state.give };
};

var Give = (function (_Component) {
  _inherits(Give, _Component);

  function Give() {
    var _this = this;

    _classCallCheck(this, _Give);

    _Component.apply(this, arguments);

    this.state = {
      postUrl: null,
      transactionId: null,
      state: "default"
    };
    this.setData = false;

    this.updateInputs = function (person) {

      person || (person = _this.data.person);

      var _person = person;
      var Campus = _person.Campus;
      var Home = _person.Home;

      Campus || (Campus = {});
      Home || (Home = {});

      var mappedPerson = {
        firstName: person.FirstName,
        lastName: person.LastName,
        email: person.Email,
        campus: Campus.Name,
        streetAddress: Home.Street1,
        streetAddress2: Home.Street2,
        city: Home.City,
        state: Home.State,
        zip: Home.PostalCode
      };

      var inputs = _this.refs.inputs;
      if (inputs) {

        for (var ref in inputs.refs) {
          if (inputs.refs[ref].setValue && mappedPerson[ref]) {
            inputs.refs[ref].setValue(mappedPerson[ref]);
            inputs.refs[ref].validate();
          }
        }
      } else {
        setTimeout(function () {
          _this.updateInputs(person);
        }, 100);
      }
    };

    this.goBack = function (e) {
      e.preventDefault();
      window.history.back();
    };

    this.next = function (e) {
      e.preventDefault();

      if (_this.props.give.step === 2) {
        _this.submitPersonalDetails();
      }

      if (_this.props.give.step === 3) {
        _this.submitPaymentDetails();
      }

      _this.props.next();
    };

    this.back = function (e) {
      e.preventDefault();

      _this.props.previous();
    };

    this.submitPersonalDetails = function (callback) {
      var _props$give = _this.props.give;
      var data = _props$give.data;
      var transactions = _props$give.transactions;
      var total = _props$give.total;
      var schedule = _props$give.schedule;
      var savedAccount = _props$give.savedAccount;

      var method = "Give.order";

      var joinedData = {
        amount: total,
        billing: {
          "first-name": data.personal.firstName,
          "last-name": data.personal.lastName,
          email: data.personal.email,
          address1: data.billing.streetAddress,
          address2: data.billing.streetAddress2 || "",
          city: data.billing.city,
          state: data.billing.state,
          postal: data.billing.zip
        }

      };

      if (schedule.frequency) {
        method = "Give.schedule";
        joinedData["start-date"] = schedule.start || _moment2["default"]().add(1, 'days').format("YYYYMMDD");
        joinedData.plan = {
          payments: schedule.payments || 0,
          amount: total
        };
        delete joinedData.amount;

        switch (schedule.frequency) {
          case "One Time":
            joinedData.plan["day-of-month"] = schedule.start ? schedule.start : _moment2["default"]().date();
            break;
          case "Weekly":
            joinedData.plan["day-frequency"] = 7;
            break;
          case "Bi-Weekly":
            joinedData.plan["day-frequency"] = 14;
            break;
          // case "Twice a Month":
          //   joinedData.plan["month-frequency"] =
          //   break;
          case "Monthly":
            joinedData.plan["month-frequency"] = 1;
            joinedData.plan["day-of-month"] = schedule.start ? schedule.start : _moment2["default"]().date();
            break;
        }

        for (var transaction in transactions) {
          joinedData["merchant-defined-field-1"] = transaction;
          break;
        }
      } else {

        joinedData.product = [];

        for (var transaction in transactions) {
          joinedData.product.push({
            "quantity": 1,
            "product-code": transaction,
            description: transactions[transaction].label,
            "total-amount": transactions[transaction].value
          });
        }
      }

      if (savedAccount) {
        joinedData["customer-vault-id"] = savedAccount;
      }

      callback || (callback = function (err, data) {
        if (!err) {
          _this.setState({ postUrl: data.url, transactionId: data.transactionId });
        }
      });

      Meteor.call(method, joinedData, callback);
    };

    this.submitPaymentDetails = function () {
      var postUrl = _this.state.postUrl;

      var form = ReactDOM.findDOMNode(_this.refs["form"]);

      fetch(postUrl, {
        method: "POST",
        body: new FormData(form),
        mode: "no-cors"
      }).then(function (response) {
        // next()
      })["catch"](function (e) {
        console.log(e);
      });
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

    this.completePurchase = function (e) {
      e.preventDefault();
      var segments = _this.state.postUrl.split("/");
      var token = segments.pop();
      _this.setState({ state: "loading" });
      var method = "Give.charge";

      if (_this.props.give.schedule.frequency) {
        method = "Give.schedule.charge";
      }

      Meteor.call(method, token, _this.props.give.data.payment.name, function (err, response) {
        console.log(err, response);
        if (err) {
          _this.setState({ state: "error", err: err });
          return;
        }

        _this.setState({ state: "success" });
      });
    };
  }

  Give.prototype.componentWillMount = function componentWillMount() {
    var _this2 = this;

    var savedAccount = this.props.give.savedAccount;

    if (!savedAccount) {
      return;
    }

    this.props.setProgress(4);

    submitPersonalDetails(function (err, data) {
      if (!err) {
        _this2.setState({ postUrl: data.url, transactionId: data.transactionId });
        fetch(data.url, {
          method: "POST",
          body: new FormData(),
          mode: "no-cors"
        }).then(function (response) {
          // next()
        })["catch"](function (e) {
          console.log(e);
        });
      }
    });
  };

  Give.prototype.componentWillUnmount = function componentWillUnmount() {
    if (this.state != "default") {
      this.props.clearData();
      // if (this.state.transactionId) {
      //   Meteor.call("Give.void", this.state.transactionId, (err, response) => {
      //     console.log(err, reponse)
      //   })
      // }
    }
  };

  Give.prototype.getMeteorData = function getMeteorData() {

    var person = null;
    var user = Meteor.user();
    if (user) {
      Meteor.subscribe("people");
      person = _rockLibCollections.People.findOne();
    }

    if (person && this.setData === false) {
      this.setData = true;
      this.updateInputs(person);
    }

    return {
      person: person
    };
  };

  Give.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {

    if (this.props.give.step > prevProps.give.step) {
      this.updateInputs();
    }
  };

  Give.prototype.render = function render() {
    var _props$give2 = this.props.give;
    var data = _props$give2.data;
    var errors = _props$give2.errors;
    var step = _props$give2.step;
    var transactions = _props$give2.transactions;
    var total = _props$give2.total;
    var savedAccount = _props$give2.savedAccount;
    var _props = this.props;
    var save = _props.save;
    var clear = _props.clear;

    var Step = undefined;

    switch (step) {
      case 4:
        Step = _fieldsets.Confirm;
        break;
      case 3:
        Step = _fieldsets.Payment;
        break;
      case 2:
        Step = _fieldsets.Billing;
        break;
      default:
        Step = _fieldsets.Personal;
    }

    if (this.state.state === "loading") {
      return React.createElement(
        _velocityReact.VelocityComponent,
        {
          animation: "transition.fadeIn",
          runOnMount: true
        },
        React.createElement(
          _coreClientComponentsLoading.WindowLoading,
          { classes: ["background--primary"] },
          React.createElement(
            "div",
            { className: "soft soft-double-ends push-double-top one-whole text-center" },
            React.createElement(
              "div",
              { className: "push-double-top" },
              React.createElement(_coreClientComponentsLoading.Spinner, { styles: { borderColor: "#fff #6BAC43 #fff #fff", borderWidth: "7px" } }),
              React.createElement(
                "h3",
                { className: "text-light-primary push-top" },
                "We're Processing Your Gift"
              )
            )
          )
        )
      );
    }

    if (this.state.state === "error") {

      return React.createElement(
        "div",
        { className: "soft soft-double-ends push-double-top one-whole text-center" },
        React.createElement(
          "div",
          { className: "push-double-top" },
          React.createElement(_coreClientComponents.Icons.Error, null),
          React.createElement(
            "h3",
            { className: "text-alert push-ends" },
            "Uh Oh! Looks like there was a problem processing your gift!"
          ),
          React.createElement(
            "p",
            { className: "text-left" },
            "Donec ullamcorper nulla non metus auctor fringilla. Nullam id dolor id nibh ultricies vehicula ut id elit. Nulla vitae elit libero, a pharetra augue. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor."
          ),
          React.createElement(
            "p",
            { className: "test-dark-tertiary text-left" },
            React.createElement(
              "em",
              null,
              "If you would like a member of our customer support team to follow up with you regarding this error, click ",
              React.createElement(
                "a",
                { href: "#" },
                "here"
              )
            )
          )
        )
      );
    }

    if (this.state.state === "success") {
      return React.createElement(
        "div",
        { className: "soft soft-double-ends push-double-top one-whole text-center" },
        React.createElement(
          "div",
          { className: "push-double-top" },
          React.createElement(_coreClientComponents.Icons.Success, null),
          React.createElement(
            "h3",
            { className: "text-primary push-ends" },
            "Success!"
          ),
          React.createElement(
            "p",
            { className: "text-left" },
            "Thank you for your gift of ",
            this.monentize(total),
            " to NewSpring Church. We will email a reciept to ",
            data.personal.email
          ),
          React.createElement(
            "p",
            { className: "test-dark-tertiary text-left" },
            React.createElement(
              "em",
              null,
              "If you have any questions please call our Finance Team at 864-965-9000 or email us at ",
              React.createElement(
                "a",
                { href: "mailto:finance@newspring.cc" },
                "finance@newspring.cc"
              ),
              " and someone will be happy to assist you."
            )
          )
        )
      );
    }

    return React.createElement(
      _coreClientComponents.Forms.Form,
      {
        id: "give",
        theme: "hard",
        fieldsetTheme: "flush soft-top",
        ref: "form",
        method: "POST",
        action: this.state.postUrl,
        submit: this.completePurchase
      },
      React.createElement(
        Step,
        {
          data: data,
          savedAccount: savedAccount,
          transactions: transactions,
          save: save,
          errors: errors,
          clear: clear,
          next: this.next,
          back: this.back,
          ref: "inputs",
          total: total
        },
        React.createElement(_coreClientComponents.Controls.Progress, {
          steps: 4,
          active: step
        })
      )
    );
  };

  var _Give = Give;
  Give = _reactMixin2["default"].decorate(ReactMeteorData)(Give) || Give;
  Give = _reactRedux.connect(map, _actions.give)(Give) || Give;
  return Give;
})(_react.Component);

exports["default"] = Give;
module.exports = exports["default"];