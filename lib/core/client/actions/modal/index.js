/*


  Modal action types

  MODAL.SET_VISIBILITY
    hide or show the modal on the page

  MODAL.SET_CONTENT
    set the component to be rendered in modal

  MODAL.SET_PROPS
    update props to be passed to parent component

  MODAL.SET_TYPE
    change type of modal to render (default is side)

*/

"use strict";

exports.__esModule = true;
exports["default"] = {
  hide: function hide() {
    return { type: "MODAL.SET_VISIBILITY", visible: false };
  },
  show: function show() {
    return { type: "MODAL.SET_VISIBILITY", visible: true };
  },

  render: function render(content, props) {
    return { type: "MODAL.SET_CONTENT", content: content, visible: true, props: props };
  },

  update: function update(props) {
    return { type: "MODAL.SET_PROPS", props: props };
  },

  changeTo: function changeTo(state) {
    return { type: "MODAL.SET_TYPE", state: state };
  }

};
module.exports = exports["default"];