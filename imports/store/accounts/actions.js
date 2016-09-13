import types from "./types";

export default {
  types,

  setAccount: account => ({ type: types.SET_ACCOUNT_STATUS, account }),

  save: data => ({ type: types.SET_DATA, data }),
  clear: field => ({ type: types.REMOVE_DATA, field }),

  setState: state => ({ type: types.SET_STATE, state }),
  submit: () => ({ type: types.SET_STATE, state: "submit" }),
  signin: () => ({ type: types.SET_STATE, state: "signin" }),
  loading: () => ({ type: types.SET_STATE, state: "loading" }),
  signout: () => ({ type: types.SET_STATE, state: "signout" }),

  error: error => ({ type: types.SET_ERROR, error }),
  fix: error => ({ type: types.REMOVE_ERROR, error }),

  reset: () => ({ type: types.REMOVE_ERRORS }),
  setErrors: errors => ({ type: types.SET_ERRORS, errors }),

  success: () => ({ type: types.SET_SUCCESS, success: true }),
  fail: () => ({ type: types.SET_SUCCESS, success: false }),

  forgot: () => ({ type: types.SET_FORGOT, forgot: true }),
  remember: () => ({ type: types.SET_FORGOT, forgot: false }),

  authorize: authorized => ({ type: types.IS_AUTHORIZED, authorized }),

  person: person => ({ type: types.SET_PERSON, person }),

  showWelcome: () => ({ type: types.SHOW_WELCOME }),

  setAlternateAccounts: alternateAccounts => ({
    type: types.SET_ALTERNATE_ACCOUNTS,
    alternateAccounts,
  }),

  peopleWithoutAccountEmails: peopleWithoutAccountEmails => ({
    type: types.SET_PEOPLE_WITHOUT_ACCOUNTS,
    peopleWithoutAccountEmails,
  }),

  completeAccount: () => ({ type: types.COMPLETE_ACCOUNT }),
  resetAccount: () => ({ type: types.RESET_ACCOUNT }),

};
