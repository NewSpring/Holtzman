/*

  Modal store

*/

const initial = {

  content: {}, // Items to be rendered in section modal
  props: {
    classes: [], // classes to be added to modal
    theme: false, // string of classes to overwrite theme
    styles: {}, // styles to be set on modal component
  },
};

export default function modal(state = initial, action) {
  switch (action.type) {
    case "SECTIONS.SET_PROPS":
      return {
        ...state,
        ...{
          props: { ...state.props, ...action.props },
        },
      };
    case "SECTIONS.SET_CONTENT":

      // deep merge

      // eslint-disable-next-line
      for (const section in action.content) {
        if (state.content[section]) {
          // eslint-disable-next-line
          action.content[section] = { ...state.content[section], ...action.content[section] };
        }
      }


      return {
        ...state,
        ...{
          content: { ...state.content, ...action.content },
        },
      };
    default:
      return state;
  }
}
