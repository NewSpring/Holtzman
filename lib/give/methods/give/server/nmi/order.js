"use strict";

exports.__esModule = true;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _xml2js = require("xml2js");

var _util = require("../../../../../core/util");

var _language = require("./language");

var _language2 = _interopRequireDefault(_language);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var step2 = function step2(purchaseData, method, callback) {
  var _sale;

  method || (method = "sale");
  var _meteor_runtime_conf = __meteor_runtime_config__;
  var ROOT_URL = _meteor_runtime_conf.ROOT_URL;

  var url = ROOT_URL + "/give/now";

  var sale = (_sale = {}, _sale[method] = (0, _extends3["default"])({
    "api-key": Meteor.settings.nmi,
    "redirect-url": url,
    "order-description": "Online contributions from Apollos",
    "order-id": "apollos_" + Date.now() + "_" + Math.ceil(Math.random() * 100000) || purchaseData.orderId
  }, purchaseData), _sale);

  if (!purchaseData["customer-vault-id"] && method === "sale") {
    sale.sale["add-customer"] = "";
  }

  var instant = false;
  // if we are using a customer vault, no need for a redirect-url
  if (purchaseData["customer-vault-id"] && method === "add-subscription") {
    delete sale[method]["redirect-url"];
    instant = true;
  }

  var builder = new _xml2js.Builder();
  var xml = builder.buildObject(sale);
  function timeout(ms, promise) {
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        reject(new Error("The request to our payment process took longer than expected. For your saftey we have cancelled this action. You were not charged and should be able to try again!"));
      }, ms);
      promise.then(resolve, reject);
    });
  }

  return timeout(60000, fetch("https://secure.networkmerchants.com/api/v2/three-step", {
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

    // instant transaction
    if (instant) {

      if (data["result-code"] === "100") {
        callback(null, data);
        return;
      }

      var _number = Number(data["result-code"]);
      var _err = void 0;
      if (_language2["default"][_number] && _language2["default"][_number] != "result-text") {
        _err = _language2["default"][_number];
      } else if (_language2["default"][_number] === "result-text") {
        _err = data["result-text"];
      }

      callback(_err);
      return;
    }

    if (data["result-code"] === "100") {
      var response = {
        url: data["form-url"],
        transactionId: data["transaction-id"]
      };
      callback(null, response);
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
  })["catch"](callback));
}; /*global Meteor */

exports["default"] = step2;
module.exports = exports['default'];