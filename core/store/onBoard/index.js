
import { addReducer, addMiddleware } from "../utilities"

import types from "./types"
import reducer from "./reducer"
import middleware from "./middleware"


addReducer({
  onBoard: reducer
})

addMiddleware(middleware)

export default {
  types,

  setAccount: (account) => ({ type: types.SET_ACCOUNT_STATUS, account }),

  save: (data) => ({ type: types.SET_DATA, data }),
  clear: (field) => ({ type: types.REMOVE_DATA, field }),

  setState: (state) => ({ type: types.SET_STATE, state }),
  submit: () => ({ type: types.SET_STATE, state: "submit" }),
  signin: () => ({ type: types.SET_STATE, state: "signin" }),
  loading: () => ({ type: types.SET_STATE, state: "loading" }),
  signout: () => ({ type: types.SET_STATE, state: "signout" }),

  error: (error) => ({ type: types.SET_ERROR, error }),
  fix: (error) => ({ type: types.REMOVE_ERROR, error }),

  reset: () => ({ type: types.SET_ERRORS, errors: {} }),
  setErrors: (errors) => ({ type: types.SET_ERRORS, errors }),

  success: () => ({ type: types.SET_SUCCESS, success: true }),
  fail: () => ({ type: types.SET_SUCCESS, success: false }),

  forgot: () => ({ type: types.SET_FORGOT, forgot: true }),
  remember: () => ({ type: types.SET_FORGOT, forgot: false }),

  authorize: (authorized) => ({ type: types.IS_AUTHORIZED, authorized }),

  person: (person) => ({ type: types.SET_PERSON, person }),

}
