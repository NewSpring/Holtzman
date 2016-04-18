/*


  accounts workflow state managment


*/
import { assign, cloneDeep } from "lodash";

import { createReducer, State, Action } from "../utilities";
import types from "./types";

export interface Campus {
  name: string;
  shortcode: string;
};

export interface Location {
  city: String;
  country: String;
  id: Number;
  zip: String;
  state: String;
  street1: String;
  street2: String;
};

export interface Person {
  age: number;
  birthdate: Date;
  campus: Campus;
  email: string;
  home: Location;
  firstName: string;
  lastName: string;
  nickName: string;
  phoneNumbers: Array<string>;
  photo: string;
};

export type EncryptedString = string;

export interface AccountData {
  email: string;
  password: EncryptedString;
  terms: boolean;
  firstName: string;
  lastName: string;
  personId: number;
};

export enum AccountStateEnum {
  default,
  submit,
  signout,
  loading,
};

export interface AccountState extends State {
  account: boolean;
  authorized: boolean;
  forgot: boolean;
  success: boolean;
  showWelcome: boolean;
  alternateAccounts: Array<number>;
  peopleWithoutAccountEmails: Array<{ email: string, id: Number }>;
  resettingAccount: boolean;
  hasPerson: boolean;
  person: Person;
  data: AccountData;
  state: AccountStateEnum;
  attempts: number;
  errors: { [key: number]: string };
};

const initial: AccountState = {

  account: true, // has an account
  authorized: false, // is logged in
  forgot: false, // ui state change (should move to component?)
  success: false, // form action result
  showWelcome: false, // show a welcome to your account message
  alternateAccounts: [], // used to let a user know they might have an account
  peopleWithoutAccountEmails: [],
  resettingAccount: false,
  hasPerson: false, // used to recommend account recovery to avoid duplicates

  person: {
    age: null, // Number
    birthdate: null, // Date
    campus: {
      name: null, // String
      shortcode: null, // String
    },
    email: null, // String
    home: {
      city: null, // String
      country: null, // String
      id: null, // Number
      zip: null, // String
      state: null, // String
      street1: null, // String
      street2: null, // String
    },
    firstName: null, // String
    lastName: null, // String
    nickName: null, // String
    phoneNumbers: [],
    photo: null, // String
  },

  data: {
    email: null, // String
    password: null, // String (encrypted before launch)
    terms: true, // String,
    firstName: null, // String
    lastName: null, // String
    personId: null, // Number
  },

  state: AccountStateEnum.default,

  attempts: 0,
  errors: {},
};


export default createReducer(initial, {

  [types.SET_FORGOT]: (state: AccountState, action: Action): AccountState => {

    if (typeof action.forgot !== "boolean") {
      return state;
    }

    return assign(cloneDeep(state), { forgot: action.forgot }) as AccountState;
  },

  [types.SET_ACCOUNT_STATUS]: (state: AccountState, action: Action): AccountState => {

    if (typeof action.account !== "boolean") {
      return state;
    }

    return assign(cloneDeep(state), { account: action.account }) as AccountState;
  },

  [types.SET_DATA]: (state: AccountState, action: Action): AccountState => {

    // @TODO validation on new data
    let clonedState = cloneDeep(state);
    return assign(clonedState, { data: assign(clonedState.data, action.data) }) as AccountState;
  },

  [types.REMOVE_DATA]: (state: AccountState, action: Action): AccountState => {

    if (!action.field || state.data[action.field]) {
      return state;
    }

    return assign(cloneDeep(state), { data: assign(state.data, { [state.data[action.field]]: null }) }) as AccountState;
  },

  [types.SET_STATE]: (state: AccountState, action: Action): AccountState => {

    let stateName = action.state.trim();
    const stateTypes = [ "default", "loading", "submit", "signout" ];

    if (stateTypes.indexOf(stateName) === -1) {
      return state;
    }

    if (stateName === "signout") {
      state.authorized = false;
      stateName = "default";
      state.person = initial.person;
    }

    return assign(cloneDeep(state), { state: stateName }) as AccountState;
  },

  [types.SET_ERROR]: (state: AccountState, action: Action): AccountState => {

    if (!action.error) {
      return state;
    }

    return assign(cloneDeep(state), { errors: assign( state.errors, action.errors )}) as AccountState;
  },

  [types.REMOVE_ERROR]: (state: AccountState, action: Action): AccountState => {

    if (!action.error || !state.errors[action.error]) {
      return state;
    }

    const errors = state.errors;

    delete errors[action.error];

    // update the state
    return assign(cloneDeep(state), { errors: errors }) as AccountState;
  },

  [types.SET_ERRORS]: (state: AccountState, action: Action): AccountState => {

    return assign(cloneDeep(state), {
      errors: assign(state.errors, action.errors),
    }) as AccountState;

  },

  [types.REMOVE_ERRORS]: (state: AccountState, action: Action): AccountState => {

    return assign(cloneDeep(state), {
      errors: {},
    }) as AccountState;

  },

  [types.SET_SUCCESS]: (state: AccountState, action: Action): AccountState => {

    if (typeof action.success !== "boolean") {
      return state;
    }

    return assign(cloneDeep(state), {
      success: action.success,
    }) as AccountState;

  },

  [types.IS_AUTHORIZED]: (state: AccountState, action: Action): AccountState => {

    if (typeof action.authorized !== "boolean") {
      return state;
    }

    return assign(cloneDeep(state), {
      authorized: action.authorized,
    }) as AccountState;

  },

  [types.SET_PERSON]: (state: AccountState, action: Action): AccountState => {

    if (!action.person) {
      return state;
    }

    if (!action.person.Home) {
      action.person.Home = initial.person.home;
    }

    if (!action.person.Campus) {
      action.person.Campus = initial.person.campus;
    }

    return assign(cloneDeep(state), {
      person: action.person,
      authorized: true,
    }) as AccountState;

  },

  [types.SHOW_WELCOME]: (state: AccountState, action: Action): AccountState => {

    return assign(cloneDeep(state), { showWelcome: true }) as AccountState;

  },

  [types.SET_ALTERNATE_ACCOUNTS]: (state: AccountState, action: Action): AccountState => {

    // @TODO validation on new data

    return assign(cloneDeep(state), { alternateAccounts: action.alternateAccounts }) as AccountState;
  },

  [types.SET_PEOPLE_WITHOUT_ACCOUNTS]: (state: AccountState, action: Action): AccountState => {

    // @TODO validation on new data

    return assign(cloneDeep(state), { peopleWithoutAccountEmails: action.peopleWithoutAccountEmails }) as AccountState;
  },

  [types.COMPLETE_ACCOUNT]: (state: AccountState, action: Action): AccountState => {

    return assign(cloneDeep(state), { resettingAccount: true }) as AccountState;
  },

  [types.RESET_ACCOUNT]: (state: AccountState, action: Action): AccountState => {

    return assign(cloneDeep(state), {
      resettingAccount: false,
      peopleWithoutAccountEmails: [],
      alternateAccounts: [],
      account: true,
    }) as AccountState;

  },

});
