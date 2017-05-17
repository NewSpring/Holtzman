/*

  Modal store

*/

const initial = {
  visible: true,
  state: "default", // "full"
  content: null, // component to render within nav
  retrigger: null,
  props: {
    classes: [], // classes to be added to modal
    theme: false, // string of classes to overwrite theme
    styles: {}, // styles to be set on modal component
    keepNav: false,
    coverMiniPlayer: true,
    promptModal: true,
  },
};

export default function modal(state = initial, action) {
  switch (action.type) {
    case "MODAL.SET_PROPS":
      // eslint-disable-next-line no-param-reassign
      action.props.coverHeader = !!action.props.coverHeader;

      return {
        ...state,
        ...{
          props: { ...state.props, ...action.props },
        },
      };
    case "MODAL.SET_CONTENT":
      if (action.props) {
        // eslint-disable-next-line no-param-reassign
        action.props.coverMiniPlayer = !!action.props.coverMiniPlayer;
      }
      return {
        ...state,
        ...{
          content: action.content || state.content,
          visible: action.visible || state.visible,
          props: { ...state.props, ...action.props },
        },
      };
    case "MODAL.SET_VISIBILITY":
      return {
        ...state,
        ...{
          visible: action.visible,
        },
      };
    case "MODAL.SET_TYPE":
      return {
        ...state,
        ...{
          state: action.state || state.state,
        },
      };
    case "MODAL.SET_RETRIGGER":
      return {
        ...state,
        ...{
          retrigger: action.retrigger,
        },
      };
    default:
      return state;
  }
}
