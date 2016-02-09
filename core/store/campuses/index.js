
import { addReducer, createReducer } from "../utilities"


const initial = {
  campuses: {},
}

const reducer = createReducer(initial, {
  ["CAMPUSES.ADD"](state, action) {

    return {...state, ...{
      campuses: {...state.campuses, ...action.campuses}
    }}
  },
});

addReducer({
  campuses: reducer
})


export default {
  add: (campuses) => ({ type: "CAMPUSES.ADD", campuses }),

}
