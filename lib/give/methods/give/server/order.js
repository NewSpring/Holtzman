"use strict";

exports.__esModule = true;

var _rock = require("../../../../core/util/rock");

var _nmi = require("./nmi");

var _createSchedule = require("./createSchedule");

var _createSchedule2 = _interopRequireDefault(_createSchedule);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function order(orderData, instant, id) {

  var user = null;
  if (this.userId) {
    user = Meteor.users.findOne({ _id: this.userId });
  }

  // default to sale
  var method = "sale";

  // offline order using saved account
  if (orderData.savedAccount) {
    method = "sale";
  }

  if (orderData["start-date"]) {
    method = "add-subscription";
  }

  if (orderData.amount === 0) {
    method = "validate";
  }

  if (user && user.services.rock && method != "add-subscription") {
    orderData["customer-id"] = user.services.rock.PrimaryAliasId;
  }

  if (orderData.savedAccount) {
    var accountDetails = _rock.api.get.sync("FinancialPersonSavedAccounts/" + orderData.savedAccount);

    delete orderData.savedAccount;
    delete orderData.savedAccountName;
    if (accountDetails.ReferenceNumber) {
      delete orderData["customer-id"];
      orderData["customer-vault-id"] = accountDetails.ReferenceNumber;
    }
  }

  if (method != "add-subscription") {
    // add in IP address
    var connection = this.connection;

    var ip = connection.clientAddress;

    if (connection.httpHeaders && connection.httpHeaders["x-forwarded-for"]) {
      ip = connection.httpHeaders["x-forwarded-for"];
    }

    orderData["ip-address"] = ip;

    // strongly force CVV on acctions that aren't a saved account
    if (!orderData["customer-vault-id"]) {
      orderData["cvv-reject"] = "P|N|S|U";
    }
  }

  try {

    var response = Meteor.wrapAsync(_nmi.order)(orderData, method);
    if (instant) {
      response = (0, _createSchedule2["default"])(response, null, id, user);
    }
    return response;
  } catch (e) {
    throw new Meteor.Error(e.message);
  }
} /*global Meteor */


Meteor.methods({ "give/order": order });

exports["default"] = order;
module.exports = exports['default'];