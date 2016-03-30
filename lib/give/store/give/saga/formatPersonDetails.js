"use strict";

exports.__esModule = true;

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var formatPersonDetails = function formatPersonDetails(give, _ref) {
  var campuses = _ref.campuses;
  var data = give.data;
  var transactions = give.transactions;
  var total = give.total;
  var schedules = give.schedules;
  var savedAccount = give.savedAccount;

  // here we format data for the NMI processing

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

  var campusId = void 0;
  for (var campus in campuses) {
    if (campuses[campus].name === data.personal.campus) {
      campusId = campuses[campus].id;
      break;
    }
  }

  joinedData["merchant-defined-field-2"] = campusId;

  if (schedules && Object.keys(schedules).length) {
    // // @TODO allow custom start dates
    // joinedData["start-date"] = Moment().format("YYYYMMDD")
    // @TODO allow number of payments
    joinedData.plan = {
      payments: 0,
      amount: total
    };

    delete joinedData.amount;
    for (var key in schedules) {
      var schedule = schedules[key];
      switch (schedule.frequency) {
        case "One-Time":
          joinedData.plan.payments = 1;
          joinedData.plan["month-frequency"] = 12;
          joinedData.plan["day-of-month"] = schedule.start ? (0, _moment2["default"])(schedule.start).date() : (0, _moment2["default"])().date();
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
          joinedData.plan["day-of-month"] = schedule.start ? (0, _moment2["default"])(schedule.start).date() : (0, _moment2["default"])().date();
          break;
      }

      joinedData["start-date"] = schedule.start ? (0, _moment2["default"])(schedule.start).format("YYYYMMDD") : (0, _moment2["default"])().add(1, "days").format("YYYYMMDD");
      joinedData["merchant-defined-field-3"] = joinedData["start-date"];

      for (var transaction in transactions) {
        joinedData["merchant-defined-field-1"] = transaction;
        break;
      }

      // @TODO support multiple accounts at once
      break;
    }
  } else if (transactions && Object.keys(transactions).length) {

    joinedData.product = [];
    for (var _transaction in transactions) {
      joinedData.product.push({
        "quantity": 1,
        "product-code": _transaction,
        description: transactions[_transaction].label,
        "total-amount": transactions[_transaction].value
      });
    }
  }

  if (savedAccount.id) {
    joinedData.savedAccount = savedAccount.id;
    joinedData.savedAccountName = savedAccount.name;
  }

  return joinedData;
};

exports["default"] = formatPersonDetails;
module.exports = exports['default'];