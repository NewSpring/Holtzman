/*

  Modal store

*/

const initial = {
  visible: false,
  state: 'default', // "full"
  content: null, // component to render within nav
  props: {
    classes: [], // classes to be added to modal
    theme: false, // string of classes to overwrite theme
    styles: {}, // styles to be set on modal component
    keepNav: false
  }
}

export default function modal(state = initial, action) {
  switch (action.type) {
    case 'MODAL.SET_PROPS':
      return { ...state, ...{
        props: { ...state.props, ...action.props }
      } }
    case 'MODAL.SET_CONTENT':
      return { ...state, ...{
        content: action.content || state.content,
        visible: action.visible || state.visible,
        props: { ...state.props, ...action.props }
      } }
    case 'MODAL.SET_VISIBILITY':
      return { ...state, ...{
        visible: action.visible
      } }
    case 'MODAL.SET_TYPE':
      return { ...state, ...{
        state: action.state || state.state
      } }
    default:
      return state
  }
}
