/*
  Share action types
*/
import reducer from "./reducer";
import "./saga";
import { addReducer } from "../utilities";

addReducer({
  header: reducer,
});

export default {
  show: (options = {}) => ({
    type: "HEADER.TOGGLE_VISIBILITY",
    visible: typeof options.visible === "undefined" ? true : options.visible,
    statusBar: options.statusBar,
  }),
  hide: (options = {}) => ({
    type: "HEADER.TOGGLE_VISIBILITY",
    visible: typeof options.visible === "undefined" ? false : options.visible,
    statusBar: options.statusBar,
  }),

  set: (content, requestee) => ({ type: "HEADER.SET", content, requestee }),
  color: color => ({ type: "HEADER.SET", content: { color } }),
  title: title => ({ type: "HEADER.SET", content: { title } }),
  light: light => ({ type: "HEADER.SET", content: { light } }),
  isSearch: (isSearch, searchSubmit) => ({
    type: "HEADER.SET",
    content: { isSearch, searchSubmit },
  }),

  lock: requestee => ({ type: "HEADER.LOCK", requestee }),
  unlock: () => ({ type: "HEADER.UNLOCK" }),

  // XXX this currently doesn't affect the store
  statusBarColor: color => ({ type: "STATUSBAR.SET", color }),
};
