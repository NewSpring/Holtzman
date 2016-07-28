
import { addReducer } from "apollos-core/dist/core/store";
import types from "./types";
import reducer from "./reducer";
import actions from "./actions";

addReducer({ audio: reducer });

export {
  types,
  actions,
  reducer,
}
