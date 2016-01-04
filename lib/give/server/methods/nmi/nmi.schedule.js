"use strict";

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _xml2js = require("xml2js");

var _coreLibUtil = require("../../../../core/lib/util");

var schedule = function schedule(purchaseData, callback) {
  // let url = process.env.ROOT_URL ? `process.env.ROOT_URL/give` : "http://localhost:3000/give"
  var url = "https://alpha.newspring.io/give";

  var subscription = {
    "add-subscription": _extends({
      "api-key": Meteor.settings.nmi,
      "redirect-url": url,
      "order-description": "Online schedule from Apollos",
      "order-id": "apollos_" + Date.now() + "_" + Math.ceil(Math.random() * 100000) || purchaseData.orderId
    }, purchaseData)
  };

  // if (!purchaseData["customer-vault-id"] && !purchaseData["customer-id"]) {
  //   subscription.subscription["add-customer"] = ""
  // }

  var builder = new _xml2js.Builder();
  var xml = builder.buildObject(subscription);

  return fetch("https://secure.networkmerchants.com/api/v2/three-step", {
    method: "POST",
    body: "" + xml,
    headers: {
      'Content-Type': 'text/xml'
    }
  }).then(function (response) {
    return response.text();
  }).then(function (data) {

    try {
      data = _coreLibUtil.parseXML(data);
    } catch (e) {
      console.log("PARSE ERROR", e, data);
      callback(e);
      return;
    }

    if (data["result-code"] === "100") {
      callback(null, data);
      return;
    }

    callback(data["result-text"]);
  })["catch"](callback);
};

exports["default"] = schedule;
module.exports = exports["default"];