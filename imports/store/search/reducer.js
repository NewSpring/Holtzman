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

  "SEARCH.SET_TERM": (state, action) => (
    { ...state,
      term: action.term,
    }
  ),

  "SEARCH.ADD": (state, action) => (
    { ...state,
      items: [...state.items, ...action.items],
    }
  ),

  "SEARCH.CLEAR": state => (
    { ...state,
      items: [],
      page: 0,
      done: false,
      none: false,
    }
  ),

  "SEARCH.INCREMENT_PAGE": state => (
    { ...state,
      page: state.page + 1,
    }
  ),

  "SEARCH.TOGGLE_LOADING": state => (
    { ...state,
      loading: !state.loading,
    }
  ),

  "SEARCH.DONE": (state, action) => (
    { ...state,
      done: action.done,
    }
  ),

  "SEARCH.NONE": (state, action) => (
    { ...state,
      none: action.none,
    }
  ),

  "SEARCH.SEARCHING": (state, action) => (
    { ...state,
      searching: action.searching,
      term: null,
    }
  ),

});
