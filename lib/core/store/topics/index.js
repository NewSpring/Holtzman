"use strict";

exports.__esModule = true;

var _reducer = require("./reducer");

var _reducer2 = _interopRequireDefault(_reducer);

var _utilities = require("../utilities");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/*


  Topic action types

  TOPIC.TOGGLE
    toggle to the state of following a topic

  TOPIC.SET
    used for loading topics from the db

*/


(0, _utilities.addReducer)({
  topics: _reducer2["default"]
});

exports["default"] = {
  toggle: function toggle(props) {
    return { type: "TOPIC.TOGGLE", props: props };
  },

  set: function set(content) {
    return { type: "TOPIC.SET", content: content };
  }

};
module.exports = exports['default'];