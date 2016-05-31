/*


  Coming soon action types

  COMINGSOON.TOGGLE
    hide or show the modal on the page

*/
import reducer from "./reducer"
import { addReducer } from "../utilities"

addReducer({
  comingsoon: reducer
})

export default {
  toggle: (props) => ({ type: "COMINGSOON.TOGGLE", props }),
}
