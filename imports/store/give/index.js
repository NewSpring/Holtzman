/*

  Give action types

*/
import "./saga";
import actions from "./actions";
import reducer from "./reducer";
import { addReducer } from "../utilities";

addReducer({
  give: reducer,
});

export default actions;
