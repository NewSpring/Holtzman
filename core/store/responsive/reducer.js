/*

  responsive store

*/

const breakpoints = {
  "palm": {
    max: 480,
  },
  "palm-wide": {
    min: 481,
    max: 768,
  },
  "palm-wide-and-up": {
    min: 481,
  },
  "handheld": {
    max: 768,
  },
  "lap": {
    min: 769,
    max: 1024
  },
  "lap-and-up": {
    min: 769
  },
  "lap-wide": {
    min: 1025,
    max: 1280
  },
  "lap-wide-and-up": {
    min: 1025
  },
  "portable": {
    min: 769,
    max: 1280
  },
  "desk": {
    min: 1281,
    max: 1680
  },
  "desk-and-up": {
    min: 1281
  },
  "desk-wide": {
    min: 1681
  },
  "anchored": {
    min: 1281
  }
};

const initial = {
  width: null, // Number / screen width
  breakpoints: [], // array of stringified breakpoints
  _breakpoints: breakpoints, // object to test against
}

export default function modal(state = initial, action) {
  switch (action.type) {
    case "@@RESPONSIVE.SET_BREAKPOINT":
      return { ...state, ...{
        breakpoints: action.breakpoints
      } }
    case "@@RESPONSIVE.SET_WIDTH":
      return { ...state, ...{
        width: action.width
      } }
    case "@@RESPONSIVE.SET_HEIGHT":
    return { ...state, ...{
      height: action.height
    } }
    default:
      return state
  }
}
