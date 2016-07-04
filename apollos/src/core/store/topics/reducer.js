/*
  Topic store
*/

import { createReducer } from "../utilities"

const initial = {
  topics: []
}

export default createReducer(initial, {

  ["TOPIC.TOGGLE"](state, action) {
    const topic = action.props.topic;
    const previousTopics = state.topics;
    const nextTopics = _.contains(previousTopics, topic) ?
      _.without(previousTopics, topic) :
      _.union(previousTopics, [topic]);

    return {...state,
      topics: nextTopics
    }
  },

  ["TOPIC.SET"](state, action) {
    return {...state,
      topics: action.content
    }
  }

});
