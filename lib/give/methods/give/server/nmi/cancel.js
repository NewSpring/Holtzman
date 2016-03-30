"use strict";

exports.__esModule = true;

var _xml2js = require("xml2js");

var _util = require("../../../../../core/util");

var _language = require("./language");

var _language2 = _interopRequireDefault(_language);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var cancelTransaction = function cancelTransaction(transactionId, callback) {

  var cancelTransactionObj = {
    "delete-subscription": {
      "api-key": Meteor.settings.nmi,
      "subscription-id": transactionId
    }
  };

  var builder = new _xml2js.Builder();
  var xml = builder.buildObject(cancelTransactionObj);

  return fetch("https://secure.networkmerchants.com/api/v2/three-step", {
    method: "POST",
    body: "" + xml,
    headers: {
      "Content-Type": "text/xml"
    }
  }).then(function (response) {
    return response.text();
  }).then(function (data) {

    try {
      data = (0, _util.parseXML)(data);
    } catch (e) {
      callback(e);
      return;
    }

    if (data["result-code"] === "100") {
      callback(null, data);
      return;
    }
    var number = Number(data["result-code"]);
    var err = void 0;
    if (_language2["default"][number] && _language2["default"][number] != "result-text") {
      err = _language2["default"][number];
    } else if (_language2["default"][number] === "result-text") {
      err = data["result-text"];
    }

    callback(err);
  })["catch"](callback);
}; /*global Meteor */

exports["default"] = cancelTransaction;
module.exports = exports['default'];