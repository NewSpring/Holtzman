
import { addReducer } from "../utilities";
import types from "./types";
import reducer from "./reducer";
import actions from "./actions";

addReducer({ audio: reducer });

export default actions;

export {
  types,
  actions,
  reducer,
};
