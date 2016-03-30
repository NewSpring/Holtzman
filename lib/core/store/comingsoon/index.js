"use strict";

exports.__esModule = true;

var _reducer = require("./reducer");

var _reducer2 = _interopRequireDefault(_reducer);

var _utilities = require("../utilities");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/*


  Coming soon action types

  COMINGSOON.TOGGLE
    hide or show the modal on the page

*/


(0, _utilities.addReducer)({
  comingsoon: _reducer2["default"]
});

exports["default"] = {
  toggle: function toggle(props) {
    return { type: "COMINGSOON.TOGGLE", props: props };
  }
};
module.exports = exports['default'];