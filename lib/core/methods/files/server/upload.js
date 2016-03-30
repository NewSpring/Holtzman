"use strict";

var _utilities = require("../../../util/rock/utilities");

Meteor.methods({
  "file/upload": function fileUpload(file, id) {
    var _headers;

    var headers = (_headers = {}, _headers[_utilities.api._.tokenName] = _utilities.api._.token, _headers);

    var body = new Buffer(file, "base64");

    var options = {
      method: "POST",
      body: body,
      headers: headers
    };

    var url = (0, _utilities.parseEndpoint)("\n      ImageUploader.ashx?\n        isBinaryFile=True&\n        IsTemporary=False&\n        FileTypeGuid=03BD8476-8A9F-4078-B628-5B538F967AFC\n    ");

    if (id) {
      url += "&fileId=" + id;
    }

    url = _utilities.api._.baseURL + url;

    console.log(url);

    var promiseWrapper = function promiseWrapper(promise, callback) {
      promise.then(function (response) {
        callback(null, response);
      })["catch"](function (err) {
        callback(err);
      });
    };

    var sync = Meteor.wrapAsync(promiseWrapper);

    return sync(fetch(url, options).then(function (response) {
      console.log(response);
      return response;
    }));
  }
});
/*global Meteor, check */