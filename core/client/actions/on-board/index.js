/*
  Onboarding action types

  ONBOARD.SET_DATA

  ONBOARD.SET_STATE

  ONBOARD.SET_ERROR

  ONBOARD.CLEAR_ERRORS

  ONBOARD.SET_SUCCESS


*/

const types = {
  SET_ACCOUNT_STATUS: "ONBOARD.SET_ACCOUNT_STATUS",
  SET_DATA: "ONBOARD.SET_DATA",
  REMOVE_DATA: "ONBOARD.REMOVE_DATA",
  SET_FORGOT: "ONBOARD.SET_FORGOT",
  SET_STATE: "ONBOARD.SET_STATE",
  SET_ERROR: "ONBOARD.SET_ERROR",
  REMOVE_ERROR: "ONBOARD.REMOVE_ERROR",
  SET_ERRORS: "ONBOARD.SET_ERRORS",
  SET_SUCCESS: "ONBOARD.SET_SUCCESS",
  IS_AUTHORIZED: "ONBOARD.IS_AUTHORIZED"
}

export default {
  types,

  setAccount: (account) => ({ type: types.SET_ACCOUNT_STATUS, account}),

  save: (data) => ({ type: types.SET_DATA, data }),
  clear: (field) => ({ type: types.REMOVE_DATA, field }),

  setState: (state) => ({ type: types.SET_STATE, state }),
  submit: () => ({ type: types.SET_STATE, state: "submit" }),
  loading: () => ({ type: types.SET_STATE, state: "loading" }),

  error: (error) => ({ type: types.SET_ERROR, error }),
  fix: (error) => ({ type: types.REMOVE_ERROR, error }),

  reset: () => ({ type: types.SET_ERRORS, errors: {}}),
  setErrors: (errors) => ({ type: types.SET_ERRORS, errors }),

  success: () => ({ type: types.SET_SUCCESS, success: true }),
  fail: () => ({ type: types.SET_SUCCESS, success: false }),

  forgot: () => ({ type: types.SET_FORGOT, forgot: true }),
  remember: () => ({ type: types.SET_FORGOT, forgot: false }),

  authorize: (authorized) => ({ type: types.IS_AUTHORIZED, authorized})


}
