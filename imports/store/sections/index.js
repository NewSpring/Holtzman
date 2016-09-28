/*


  Sections action types

  SECTIONS.SET_PROPS
    hide or show the sections modal on the page

  SECTIONS.SET_CONTENT
    set the items to be rendered in section modal


*/
import reducer from "./reducer";
import "./saga";
import { addReducer } from "../utilities";

addReducer({
  sections: reducer,
});

export default {
  reducer,

  set: content => ({ type: "SECTIONS.SET_CONTENT", content }),
  style: props => ({ type: "SECTIONS.SET_PROPS", props }),

};
