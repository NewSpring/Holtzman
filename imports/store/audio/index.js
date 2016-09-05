
import { addReducer } from "../";
import types from "./types";
import reducer from "./reducer";
import actions from "./actions";

addReducer({ audio: reducer });

export {
  types,
  actions,
  reducer,
}
