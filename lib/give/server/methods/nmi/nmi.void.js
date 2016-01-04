"use strict";

exports.__esModule = true;

var _xml2js = require("xml2js");

var _coreLibUtil = require("../../../../core/lib/util");

var voidTransaction = function voidTransaction(transactionId, callback) {

  var voidTransactionObj = {
    "void": {
      "api-key": Meteor.settings.nmi,
      "transaction-id": transactionId
    }
  };

  var builder = new _xml2js.Builder();
  var xml = builder.buildObject(voidTransactionObj);

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

exports["default"] = voidTransaction;
module.exports = exports["default"];