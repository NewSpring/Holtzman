/*

  Search store

*/

import { createReducer } from "../utilities";

const initial = {
  term: null,
  items: [],
  page: 0,
  pageSize: 10,
  loading: false,
  done: false,
  none: false,
  searching: false,
};

export default createReducer(initial, {

  ["SEARCH.SET_TERM"]: function (state, action) {
    return { ...state,
      term: action.term,
    };
  },

  ["SEARCH.ADD"]: function (state, action) {
    return { ...state,
      items: [...state.items, ...action.items],
    };
  },

  ["SEARCH.CLEAR"]: function (state, action) {
    return { ...state,
      items: [],
      page: 0,
      done: false,
      none: false,
    };
  },

  ["SEARCH.INCREMENT_PAGE"]: function (state, action) {
    return { ...state,
      page: state.page + 1,
    };
  },

  ["SEARCH.TOGGLE_LOADING"]: function (state, action) {
    return { ...state,
      loading: !state.loading,
    };
  },

  ["SEARCH.DONE"]: function (state, action) {
    return { ...state,
      done: action.done,
    };
  },

  ["SEARCH.NONE"]: function (state, action) {
    return { ...state,
      none: action.none,
    };
  },

  ["SEARCH.SEARCHING"]: function (state, action) {
    return { ...state,
      searching: action.searching,
      term: null,
    };
  },

});
