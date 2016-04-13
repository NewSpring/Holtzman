/*

  Shared store

*/
import { assign } from "lodash";
import { State, createReducer } from "../utilities";

export interface ShareState {
  sharing: boolean;
  content: ShareContent;
};

export interface ShareContent {
  subject: string;
  text: string;
  activityTypes: string;
  image: string;
  url: string;
};

const initial: ShareState = {
  sharing: false,
  content: {
    subject: null,
    text: null,
    activityTypes: null,
    image: null,
    url: null
  }
};

export default createReducer(initial, {

  ["SHARE.SHARE"]: (state: ShareState, action: any): ShareState => {
    return assign({}, state, { sharing: !state.sharing }) as ShareState;
  },
  ["SHARE.SET"]: (state: ShareState, action: any): ShareState => {
    return assign({}, state, { content: assign({}, state.content, action.content )}) as ShareState;
  }
});
