/*


  Share action types


*/
import reducer from "./reducer";
import "./saga";
import { addReducer } from "../utilities";

addReducer({
  share: reducer,
});

export default {
  set: content => ({ type: "SHARE.SET", content }),

  share: () => ({ type: "SHARE.SHARE" }),
};
