"use strict";

exports.__esModule = true;

var _xml2js = require("xml2js");

var _coreLibUtil = require("../../../../core/lib/util");

var step1 = function step1(token, callback) {

  var complete = {
    "complete-action": {
      "api-key": Meteor.settings.nmi, // replace with settings file
      "token-id": token
    }
  };

  var builder = new _xml2js.Builder();
  var xml = builder.buildObject(complete);

  fetch("https://secure.networkmerchants.com/api/v2/three-step", {
    method: "POST",
    body: "" + xml,
    headers: {
      'Content-Type': 'text/xml'
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
        console.log("INVALID", match);
        var matchRegex = new RegExp(match, "gmi");
        data = data.replace(matchRegex, match.replace(/,/gmi, ""));
      }
    }

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

exports["default"] = step1;
module.exports = exports["default"];