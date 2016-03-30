"use strict";

exports.__esModule = true;

var _reducer = require("./reducer");

var _reducer2 = _interopRequireDefault(_reducer);

var _utilities = require("../utilities");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/*


  Liked action types

  LIKED.TOGGLE
    hide or show the modal on the page

  LIKED.SET
    used for loading likes from db

*/


(0, _utilities.addReducer)({
  liked: _reducer2["default"]
});

exports["default"] = {
  toggle: function toggle(props) {
    return { type: "LIKED.TOGGLE", props: props };
  },

  set: function set(content) {
    return { type: "LIKED.SET", content: content };
  }

};
module.exports = exports['default'];