import reducer from "./reducer";
import "./middleware";
import { addReducer } from "../utilities";
import actions from "./actions";

addReducer({
  responsive: reducer,
});

export default {
  reducer,
  actions,
};
