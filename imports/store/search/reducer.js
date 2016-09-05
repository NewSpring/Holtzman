/*

  Search store

*/

import { createReducer } from "../utilities"

const initial = {
  term: null,
  items: [],
  page: 0,
  pageSize: 10,
  loading: false,
  done: false,
  none: false,
  searching: false
}

export default createReducer(initial, {

  ["SEARCH.SET_TERM"](state, action) {
    return {...state,
      term: action.term
    }
  },

  ["SEARCH.ADD"](state, action) {
    return {...state,
      items: [ ...state.items, ...action.items ]
    }
  },

  ["SEARCH.CLEAR"](state, action) {
    return {...state,
      items: [],
      page: 0,
      done: false,
      none: false
    }
  },

  ["SEARCH.INCREMENT_PAGE"](state, action) {
    return {...state,
      page: state.page + 1
    }
  },

  ["SEARCH.TOGGLE_LOADING"](state, action) {
    return {...state,
      loading: !state.loading
    }
  },

  ["SEARCH.DONE"](state, action) {
    return {...state,
      done: action.done
    }
  },

  ["SEARCH.NONE"](state, action) {
    return {...state,
      none: action.none
    }
  },

  ["SEARCH.SEARCHING"](state, action) {
    return {...state,
      searching: action.searching,
      term: null
    }
  }

});
