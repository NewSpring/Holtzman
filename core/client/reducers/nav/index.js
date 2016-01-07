/*

  Navigation store

*/
import { modal as modalActions } from "../../actions/"
import { Sections } from "../../blocks"

const back = () => {
  window.history.back()
  return {
    type: "FALSY",
    payload: {}
  }
}


const showSections = (props) => {
  const { modal, dispatch } = props

  if (modal.visible && modal.props.keepNav) {
    return modalActions.hide()
  }

  return modalActions.render(Sections, { keepNav: true })
}

const links = {
  TOP:[
    { id: 1, label:"Home", link:"/", icon:"icon-logo" },
    { id: 2, label:"Sections", action: showSections, icon:"icon-sections" },
    { id: 3, label:"Discover", link:"/discover", icon:"icon-search" },
    { id: 4, label:"Profile", link:"/profile", icon:"icon-profile" }
  ],
  CONTENT: [
    { id: 1, action: back, icon:"icon-arrow-back" },
    { id: 2, action: showSections, icon:"icon-sections" },
    { id: 2, action: false, icon:"icon-like" },
    { id: 3, action: false, icon:"icon-share" }
  ],
  MODAL: [
    { id: 1, action: modalActions.hide, icon:"icon-close" }
  ]
}


const initial = { level: "TOP", visible: true, links: links.TOP }

export default function nav(state = initial, action) {
  switch (action.type) {
    case "NAV.SET_LEVEL":
      return { ...state, ...{
        level: action.level,
        links: links[action.level]
      } }
    case "NAV.SET_LINKS":
      return { ...state, ...{
        links: [ ...state.links, ...action.links ]
      } }
    case "NAV.SET_VISIBILITY":
      return { ...state, ...{
        visible: action.visible }
      }
    default:
      return state
  }
}
