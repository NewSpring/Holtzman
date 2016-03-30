"use strict";

var _expect = require("expect");

var _expect2 = _interopRequireDefault(_expect);

var _index = require("../../core/store/modal/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

describe("modal actions", function () {
  it("hide: create an action to hide the modal", function () {

    var expectedAction = {
      type: "MODAL.SET_VISIBILITY",
      visible: false
    };

    (0, _expect2["default"])(_index2["default"].hide()).toEqual(expectedAction);
  });
});