/*

  Modal store

*/
import { assign } from "lodash";
import { State, createReducer } from "../utilities";

export interface ModalState extends State {
  visible: boolean;
  state: string;
  content: string;
  props: Props;
}

export interface Props {
  classes: Array<any>;
  theme: boolean;
  styles: any;
  keepNav: boolean;
};

const initial: ModalState = {
  visible: false,
  state: "default", // "full"
  content: null, // component to render within nav
  props: {
    classes: [], // classes to be added to modal
    theme: false, // string of classes to overwrite theme
    styles: {}, // styles to be set on modal component
    keepNav: false,
  },
};

export default createReducer(initial, {
  ["MODAL.SET_PROPS"]: (state: ModalState, action: any): ModalState => {
    return assign(state, {
      props: assign({}, state.props, action. props),
    }) as ModalState;
  },
  ["MODAL.SET_CONTENT"]: (state: ModalState, action: any): ModalState => {
    return assign({}, state, {
      content: action.content || state.content,
      visible: action.visible || state.visible,
      props: assign(state.props, action.props),
    }) as ModalState;
  },
  ["MODAL.SET_VISIBILITY"]: (state: ModalState, action: any): ModalState => {
    return assign({}, state, {
      visible: action.visible,
    }) as ModalState;
  },
  ["MODAL.SET_TYPE"]: (state: ModalState, action: any): ModalState => {
    return assign({}, state, {
      state: action.state || state.state,
    }) as ModalState;
  },
});

// export default function modal(state = initial, action) {
//   switch (action.type) {
//     case "MODAL.SET_PROPS":
//       return { ...state, ...{
//         props: { ...state.props, ...action.props }
//       } }
//     case "MODAL.SET_CONTENT":
//       return { ...state, ...{
//         content: action.content || state.content,
//         visible: action.visible || state.visible,
//         props: { ...state.props, ...action.props }
//       } }
//     case "MODAL.SET_VISIBILITY":
//       return { ...state, ...{
//         visible: action.visible
//       } }
//     case "MODAL.SET_TYPE":
//       return { ...state, ...{
//         state: action.state || state.state
//       } }
//     default:
//       return state
//   }
// }
