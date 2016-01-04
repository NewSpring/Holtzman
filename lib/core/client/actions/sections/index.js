/*


  Sections action types

  SECTIONS.SET_PROPS
    hide or show the sections modal on the page

  SECTIONS.SET_CONTENT
    set the items to be rendered in section modal


*/

"use strict";

exports.__esModule = true;
exports["default"] = {

  set: function set(content) {
    return { type: "SECTIONS.SET_CONTENT", content: content };
  },
  style: function style(props) {
    return { type: "SECTIONS.SET_PROPS", props: props };
  }

};
module.exports = exports["default"];