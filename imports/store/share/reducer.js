/*

  Shared store

*/

import { createReducer } from "../utilities";

const initial = {
  sharing: false,
  content: {
    subject: null,
    text: null,
    activityTypes: null,
    image: null,
    url: null,
  },

};

export default createReducer(initial, {

  "SHARE.SHARE": state => (
    { ...state,
      sharing: !state.sharing,
    }
  ),

  "SHARE.SET": (state, action) => (
    { ...state,
      content: { ...state.content, ...action.content },
    }
  ),

});
