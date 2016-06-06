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
  show: () => ({ type: "HEADER.SHOW" }),
  hide: () => ({ type: "HEADER.HIDE" }),

  set: (content) => ({ type: "HEADER.SET", content }),
  color: (color) => ({ type: "HEADER.SET", content: { color } }),
  title: (title) => ({ type: "HEADER.SET", content: { title } }),
  light: (light) => ({ type: "HEADER.SET", content: { light } }),
}
