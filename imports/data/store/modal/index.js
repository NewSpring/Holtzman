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
import reducer from "./reducer";
import { addReducer } from "../utilities";

addReducer({
  modal: reducer,
});

export default {
  reducer,

  hide: () => ({ type: "MODAL.SET_VISIBILITY", visible: false }),
  show: () => ({ type: "MODAL.SET_VISIBILITY", visible: true }),

  render: (content, props) => ({ type: "MODAL.SET_CONTENT", content, visible: true, props }),

  update: props => ({ type: "MODAL.SET_PROPS", props }),

  changeTo: state => ({ type: "MODAL.SET_TYPE", state }),

  setRetrigger: retrigger => ({ type: "MODAL.SET_RETRIGGER", retrigger }),

};
