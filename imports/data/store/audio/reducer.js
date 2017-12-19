
/*

  Audio player state management


*/

import { createReducer } from "../utilities";
import types from "./types";

const initial = {
  visibility: "dock", // "hide", "dock", "expand"
  order: "default", // "shuffle"
  repeat: "default", // "repeat", "repeat-one"
  progress: 0, // 0 - 100,
  time: "", // "4:34"
  seek: null,
  state: "default", // "playing", "paused", "loading", "ready"

  // array of tracks with index used to set order
  playlist: [
    // {
    //   title: null, // String
    //   duration: null, // String (mins:seconds)
    //   file: null // String (url)
    // }
  ],

  // currently playing album / parent + track
  playing: {
    // parent container of content
    album: {
      title: null, // String
      image: null, // String (url)
      blurredImage: null, // String (url)
      artist: null, // String
      id: null, // String (of a Number) // probably should convert
    },

    // currently playing track
    track: {
      title: null, // String
      duration: null, // String (mins:seconds)
      file: null, // String (url)
      artist: null, // String
    },

  },
};

export default createReducer(initial, {

  [types.SET_VISIBILITY](state, action) {
    const visibility = action.visibility.trim();
    const visiblityTypes = ["default", "fade", "hide", "dock", "expand"];

    if (visiblityTypes.indexOf(visibility) === -1) {
      return state;
    }

    return {
      ...state,
      ...{
        visibility,
      },
    };
  },

  [types.SET_ORDER](state, action) {
    const order = action.order.trim();
    const orderTypes = ["default", "shuffle"];

    if (orderTypes.indexOf(order) === -1) {
      return state;
    }

    return {
      ...state,
      ...{
        order,
      },
    };
  },

  [types.SET_REPEAT](state, action) {
    const repeat = action.repeat.trim();
    const repeatTypes = ["default", "repeat", "repeat-one"];

    if (repeatTypes.indexOf(repeat) === -1) {
      return state;
    }

    return {
      ...state,
      ...{
        repeat,
      },
    };
  },

  [types.SET_STATE](state, action) {
    const playerState = action.state.trim();
    const playerStateTypes = [
      "default", "playing", "paused", "ready", "loading", "next", "previous",
    ];

    if (playerStateTypes.indexOf(playerState) === -1) {
      return state;
    }

    return {
      ...state,
      ...{
        state: playerState,
      },
    };
  },

  [types.SET_SEEK](state, action) {
    let number = action.seek;

    if (typeof number !== "number") {
      try {
        number = Number(number.trim());
      } catch (e) {
        return state;
      }
    }

    if ((number < 0) || (number > 100)) {
      return state;
    }

    return {
      ...state,
      ...{
        seek: number,
      },
    };
  },

  [types.SET_PROGRESS](state, action) {
    const time = action.time;
    let number = action.progress;

    if (typeof number !== "number") {
      try {
        number = Number(number.trim());
      } catch (e) {
        return state;
      }
    }

    if ((number < 0) || (number > 100)) {
      return state;
    }

    return {
      ...state,
      ...{
        progress: number,
        time,
      },
    };
  },

  [types.SET_PLAYLIST](state, action) {
    const playlist = action.playlist.map(x => {
      const { title, duration, file } = x;
      return { title, duration, file };
    });

    return {
      ...state,
      ...{
        playlist,
      },
    };
  },

  [types.SET_PLAYING](state, action) {
    return {
      ...state,
      ...{
        playing: {
          ...state.playing,
          ...action.playing,
        },
        state: action.state || state.state,
        visibility: state.visibility === "hide" ?
        "dock" : state.visibility,
      },
    };
  },

  [types.RESET_ALL]() {
    return initial;
  },

});
