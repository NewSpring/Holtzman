/*
  Share action types
*/
import reducer from "./reducer"
import saga from "./saga"
import { addReducer } from "apollos/core/store/utilities"

addReducer({
  header: reducer
})

export default {
  show: (options = {}) => ({ type: "HEADER.TOGGLE_VISIBILITY", visible: true, statusBar: options.statusBar }),
  hide: (options = {}) => ({ type: "HEADER.TOGGLE_VISIBILITY", visible: false, statusBar: options.statusBar }),

  set: (content) => ({ type: "HEADER.SET", content }),
  color: (color) => ({ type: "HEADER.SET", content: { color } }),
  title: (title) => ({ type: "HEADER.SET", content: { title } }),
  light: (light) => ({ type: "HEADER.SET", content: { light } }),
  isSearch: (isSearch, searchSubmit) => ({ type: "HEADER.SET", content: { isSearch, searchSubmit } }),
}
