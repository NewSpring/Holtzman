import reducer from "./reducer";
import { addReducer } from "../utilities";

addReducer({
  paging: reducer,
});

export default {
  increment: () => ({ type: "PAGING.INCREMENT" }),
  pause: () => ({ type: "PAGING.PAUSE" }),
  resume: () => ({ type: "PAGING.RESUME" }),
  reset: () => ({ type: "PAGING.RESET" })
}
