/*


  Search action types

  SEARCH.SET_TERM
    set the term to search for

  SEARCH.ADD
    add to the store of search items

  SEARCH.CLEAR
    clear the current items in the store and the page

  SEARCH.INCREMENT_PAGE
    set the current page

  SEARCH.TOGGLE_LOADING
    toggle loading state

  SEARCH.DONE
    set paging is done

  SEARCH.NONE
    set status to no items

  SEARCHING.SEARCHING
    toggle between discover topics and search results

*/
import reducer from "./reducer";
import { addReducer } from "../utilities";

addReducer({
  search: reducer,
});

export default {
  term: term => ({ type: "SEARCH.SET_TERM", term }),

  add: items => ({ type: "SEARCH.ADD", items }),
  clear: () => ({ type: "SEARCH.CLEAR" }),

  incrementPage: () => ({ type: "SEARCH.INCREMENT_PAGE" }),

  toggleLoading: () => ({ type: "SEARCH.TOGGLE_LOADING" }),

  done: done => ({ type: "SEARCH.DONE", done }),
  none: none => ({ type: "SEARCH.NONE", none }),

  searching: searching => ({ type: "SEARCH.SEARCHING", searching }),
};
