"use strict";

exports.__esModule = true;

var _xml2js = require("xml2js");

var _util = require("../../../../../core/util");

var _language = require("./language");

var _language2 = _interopRequireDefault(_language);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var step1 = function step1(token, callback) {

  var complete = {
    "complete-action": {
      "api-key": Meteor.settings.nmi, // replace with settings file
      "token-id": token
    }
  };

  var builder = new _xml2js.Builder();
  var xml = builder.buildObject(complete);

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

    // clean all tags to make sure they are parseable
    var matches = data.match(/<([^>]+)>/gmi);

    for (var _iterator = matches, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var match = _ref;

      if (match.indexOf(",") > -1) {
        var matchRegex = new RegExp(match, "gmi");
        data = data.replace(matchRegex, match.replace(/,/gmi, ""));
      }
    }

    try {
      data = (0, _util.parseXML)(data);
    } catch (e) {
      callback(e);
      return;
    }

    // AVS mismatch can be sucessful transactions but some merchants
    // will keep holds on peoples accounts even if the transacton failed.
    // Here we send a void for  any transactions with an AVS
    // mismatch IF there was a failure
    if (data["result-code"] === "100") {
      callback(null, data);
      return;
    }

    var number = Number(data["result-code"]);
    var err = void 0;

    // special mapping to ensure duplicates
    if (data["result-text"].indexOf("Duplicate") > -1) {
      number = 430;
    }

    if (_language2["default"][number] && _language2["default"][number] != "result-text") {
      err = _language2["default"][number];
    } else if (_language2["default"][number] === "result-text") {
      err = data["result-text"];
    }

    console.error("@@CHARGE_ERROR", data, xml);
    callback(err);
  })["catch"](callback));
}; /*global Meteor */

exports["default"] = step1;
module.exports = exports['default'];