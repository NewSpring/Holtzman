/*


  Audio action types

  AUDIO.SET_VISIBILITY
    "default" // hide, dock, expand

  AUDIO.SET_ORDER
    "default" // "shuffle", "repeat", "repeat-one"

  AUDIO.SET_STATE
    "default", // "playing", "paused", "loading", "ready", "next", "previous"

  AUDIO.SET_PROGRESS
    0 // 0 - 100

  AUDIO.SET_PLAYING
    set track or album information of what is playing


*/

import types from "./types";

export default {
  types,

  setVisibility: visibility => ({ type: types.SET_VISIBILITY, visibility }),
  resetVisibility: () => ({ type: types.SET_VISIBILITY, visibility: "default" }),
  dock: () => ({ type: types.SET_VISIBILITY, visibility: "dock" }),
  fade: () => ({ type: types.SET_VISIBILITY, visibility: "fade" }),
  hide: () => ({ type: types.SET_VISIBILITY, visibility: "hide" }),

  setOrder: order => ({ type: types.SET_ORDER, order }),
  resetOrder: () => ({ type: types.SET_ORDER, order: "default" }),
  shuffle: () => ({ type: types.SET_ORDER, order: "shuffle" }),

  play: () => ({ type: types.SET_STATE, state: "playing" }),
  pause: () => ({ type: types.SET_STATE, state: "paused" }),
  next: () => ({ type: types.SET_STATE, state: "next" }),
  previous: () => ({ type: types.SET_STATE, state: "previous" }),
  ready: () => ({ type: types.SET_STATE, state: "ready" }),
  loading: () => ({ type: types.SET_STATE, state: "loading" }),
  stop: () => ({ type: types.SET_STATE, state: "default" }),

  reset: () => ({ type: types.RESET_ALL }),

  seek: seek => ({ type: types.SET_SEEK, seek }),
  restart: () => ({ type: types.SET_SEEK, seek: 0.01 }),
  end: () => ({ type: types.SET_SEEK, seek: 99.99 }),

  setProgress: (progress, time) => ({ type: types.SET_PROGRESS, progress, time }),

  setPlaylist: playlist => ({ type: types.SET_PLAYLIST, playlist }),

  setPlaying: playing => ({ type: types.SET_PLAYING, playing, state: "playing" }),

  repeat: () => ({ type: types.SET_REPEAT, repeat: "repeat" }),
  resetRepeat: () => ({ type: types.SET_REPEAT, repeat: "default" }),
  repeatOne: () => ({ type: types.SET_REPEAT, repeat: "repeat-one" }),
};
