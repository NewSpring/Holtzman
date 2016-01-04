/*

  Modal store

*/

const initial = {

  content: {}, // Items to be rendered in section modal
  props: {
    classes: [], // classes to be added to modal
    theme: false, // string of classes to overwrite theme
    styles: {} // styles to be set on modal component
  }
}

export default function modal(state = initial, action) {
  switch (action.type) {
    case 'SECTIONS.SET_PROPS':
      return { ...state, ...{
        props: { ...state.props, ...action.props }
      } }
    case 'SECTIONS.SET_CONTENT':
      return { ...state, ...{
        content: { ...state.content, ...action.content }
      } }
    default:
      return state
  }
}
