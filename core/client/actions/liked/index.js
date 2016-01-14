/*


  Liked action types

  LIKED.TOGGLE
    hide or show the modal on the page

  LIKED.SET
    used for loading likes from db

*/

export default {

  toggle: (props) => ({ type: "LIKED.TOGGLE", props }),

  set: (content) => ({ type: "LIKED.SET", content })

}
