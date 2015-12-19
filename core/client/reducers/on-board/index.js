/*


  Onboarding workflow state managment


*/
import { createReducer } from "../utilities"
import { types } from "../../actions/on-board"

const initial = {

  account: true,
  forgot: false,

  data: {
    email: null, // String
    password: null, // String (encrypted before launch)
    terms: true, // String
  },

  state: "default", // "submit", "loading"

  attempts: 0,
  errors: {
    // <id>: {
    //   message: "Email is required"
    // }
  },

  success: false

}

export default createReducer(initial, {

  [types.SET_FORGOT](state, action) {

    if (typeof action.forgot != "boolean") {
      return state
    }

    return {...state, ...{
      forgot: action.forgot
    }}
  },

  [types.SET_ACCOUNT_STATUS](state, action) {

    if (typeof action.account != "boolean") {
      return state
    }

    return {...state, ...{
      account: action.account
    }}
  },

  [types.SET_DATA](state, action) {

    // @TODO validation on new data

    return {...state, ...{
      data: {...state.data, ...action.data}
    }}
  },

  [types.REMOVE_DATA](state, action) {

    if (!action.feild || state.data[action.field]) {
      return state
    }



    return {...state, ...{
      data: {...state.data, ...{
        [data[action.field]]: null
      }}
    }}
  },

  [types.SET_STATE](state, action) {

    const stateName = action.state.trim()
    const stateTypes = [ "default", "loading", "submit" ]

    if (stateTypes.indexOf(stateName) === -1) {
      return state
    }

    return {...state, ...{
      state: stateName
    }}

  },

  [types.SET_ERROR](state, action) {

    if (!action.error) {
      return state
    }

    return {...state, ...{
      errors: {...state.errors, ...action.error}
    }}

  },

  [types.REMOVE_ERROR](state, action) {

    if (!action.error || !state.errors[action.error]) {
      return state
    }

    const errors = {...state.errors}

    delete errors[action.error]

    // update the state
    return {...state, ...{
      errors: errors
    }}

  },

  [types.SET_ERRORS](state, action) {

    return {...state, ...{
      errors: {...state.errors, ...action.errors}
    }}

  },

  [types.SET_SUCCESS](state, action) {

    if (typeof action.success != "boolean") {
      return state
    }

    return {...state, ...{
      success: action.success
    }}

  }


})
