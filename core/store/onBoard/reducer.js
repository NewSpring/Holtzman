/*


  Onboarding workflow state managment


*/
import { createReducer } from "../utilities"
import types from "./types"

const initial = {

  account: true,
  authorized: false,
  forgot: false,
  success: false,

  person: {
    Age: null, // Number
    BirthDate: null, // Date
    Campus: {
      Name: null, // String
      ShortCode: null // String
    },
    Email: null, // String
    Home: {
      City: null, // String
      Country: null, // String
      Id: null, // Number
      PostalCode: null, // String
      State: null, // String
      Street1: null, // String
      Street2: null // String
    },
    LastName: null, // String
    NickName: null, // String
    PhoneNumber: [],
    PhotoUrl: null // String
  },

  data: {
    email: null, // String
    password: null, // String (encrypted before launch)
    terms: true, // String,
    firstName: null, // String
    lastName: null // String
  },

  state: "default", // "submit", "loading", "signout"

  attempts: 0,
  errors: {
    // <id>: {
    //   message: "Email is required"
    // }
  }


}


export default createReducer(initial, {

  [types.SET_FORGOT](state, action) {

    if (typeof action.forgot != "boolean") {
      return state
    }

    return { ...state, ...{
      forgot: action.forgot
    } }
  },

  [types.SET_ACCOUNT_STATUS](state, action) {

    if (typeof action.account != "boolean") {
      return state
    }

    return { ...state, ...{
      account: action.account
    } }
  },

  [types.SET_DATA](state, action) {

    // @TODO validation on new data

    return { ...state, ...{
      data: { ...state.data, ...action.data }
    } }
  },

  [types.REMOVE_DATA](state, action) {

    if (!action.field || state.data[action.field]) {
      return state
    }

    return { ...state, ...{
      data: { ...state.data, ...{
        [state.data[action.field]]: null
      } }
    } }
  },

  [types.SET_STATE](state, action) {

    let stateName = action.state.trim()
    const stateTypes = [ "default", "loading", "submit", "signout" ]

    if (stateTypes.indexOf(stateName) === -1) {
      return state
    }

    if (stateName === "signout") {
      state.authorized = false
      stateName = "default"
      state.person = initial.person
    }

    return { ...state, ...{
      state: stateName
    } }

  },

  [types.SET_ERROR](state, action) {

    if (!action.error) {
      return state
    }

    return { ...state, ...{
      errors: { ...state.errors, ...action.error }
    } }

  },

  [types.REMOVE_ERROR](state, action) {

    if (!action.error || !state.errors[action.error]) {
      return state
    }

    const errors = { ...state.errors }

    delete errors[action.error]

    // update the state
    return { ...state, ...{
      errors: errors
    } }

  },

  [types.SET_ERRORS](state, action) {

    return { ...state, ...{
      errors: { ...state.errors, ...action.errors }
    } }

  },

  [types.REMOVE_ERRORS](state, action) {

    return { ...state, ...{
      errors: {}
    } }

  },

  [types.SET_SUCCESS](state, action) {

    if (typeof action.success != "boolean") {
      return state
    }

    return { ...state, ...{
      success: action.success
    } }

  },

  [types.IS_AUTHORIZED](state, action) {

    if (typeof action.authorized != "boolean") {
      return state
    }

    return { ...state, ...{
      authorized: action.authorized
    } }

  },

  [types.SET_PERSON](state, action) {

    if (!action.person) {
      return state
    }

    if (!action.person.Home) {
      action.person.Home = initial.person.Home
    }

    if (!action.person.Campus) {
      action.person.Campus = initial.person.Campus
    }

    return { ...state, ...{
      person: action.person,
      authorized: true
    } }

  }


})
