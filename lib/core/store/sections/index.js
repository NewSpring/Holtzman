"use strict";

exports.__esModule = true;

var _reducer = require("./reducer");

var _reducer2 = _interopRequireDefault(_reducer);

var _saga = require("./saga");

var _saga2 = _interopRequireDefault(_saga);

var _utilities = require("../utilities");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

(0, _utilities.addReducer)({
  sections: _reducer2["default"]
}); /*
    
    
      Sections action types
    
      SECTIONS.SET_PROPS
        hide or show the sections modal on the page
    
      SECTIONS.SET_CONTENT
        set the items to be rendered in section modal
    
    
    */


exports["default"] = {
  reducer: _reducer2["default"],

  set: function set(content) {
    return { type: "SECTIONS.SET_CONTENT", content: content };
  },
  style: function style(props) {
    return { type: "SECTIONS.SET_PROPS", props: props };
  }

};
module.exports = exports['default'];