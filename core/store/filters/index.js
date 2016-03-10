/*


  Groups action types

  FILTERS.SET
    set filter state

*/
import reducer from "./reducer"
import { addReducer } from "../utilities"

addReducer({
  filters: reducer
})

export default {

  set: (content) => ({ type: "FILTERS.SET", content })

}
