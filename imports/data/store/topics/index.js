/*
  Topic action types
  TOPIC.TOGGLE
    toggle to the state of following a topic
  TOPIC.SET
    used for loading topics from the db
*/
import reducer from "./reducer";
import { addReducer } from "../utilities";
import "./saga";

addReducer({
  topics: reducer,
});

export default {
  toggle: props => ({ type: "TOPIC.TOGGLE", props }),

  set: content => ({ type: "TOPIC.SET", content }),

};
