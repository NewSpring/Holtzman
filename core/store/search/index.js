/*


  Search action types

  SEARCH.ADD
    add to the store of search items

  SEARCH.CLEAR
    clear the current items in the store

*/
import reducer from "./reducer"
import { addReducer } from "../utilities"

addReducer({
  search: reducer
})

export default {
  add: (items) => ({ type: "SEARCH.ADD", items}),
  clear: () => ({ type: "SEARCH.CLEAR" })
}
