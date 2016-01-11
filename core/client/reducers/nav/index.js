/*

  Navigation store

*/
import { modal as modalActions } from "../../actions/"
import { Sections } from "../../blocks"

const back = () => {
  if (typeof window != undefined && window != null) {
    window.history.back()
  }
  return {
    type: "FALSY",
    payload: {}
  }
}

let sectionsVisible = false
const showSections = (props) => {
  const { modal, dispatch } = props

  if (modal.visible) {
    sectionsVisible = false
    return modalActions.hide()
  }

  console.log("rendering nav...")
  sectionsVisible = true
  return modalActions.render(Sections, { keepNav: true })
}



const links = {
  TOP:[
    {
      id: 1,
      label: "Home",
      link: "/",
      icon: "icon-logo",
      isActive: (props) => (window.location.pathname === "/" && !props.modal.visible)
    },
    {
      id: 2,
      label: "Sections",
      action: showSections,
      icon: "icon-sections",
      isActive: (props) => (sectionsVisible && props.modal.visible)
    },
    {
      id: 3,
      label:"Discover",
      link:"/discover",
      icon:"icon-search",
      isActive: (props) => (window.location.pathname === "/discover" && !props.modal.visible)
    },
    {
      id: 4,
      label: "Profile",
      link: "/profile",
      icon: "icon-profile",
      isActive: (props) => (window.location.pathname === "/profile" && !props.modal.visible)
    }
  ],
  CONTENT: [
    { id: 1, action: back, icon:"icon-arrow-back" },
    { id: 2, action: showSections, icon:"icon-sections" },
    { id: 3, action: false, icon:"icon-like" },
    { id: 4, action: false, icon:"icon-share" }
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
