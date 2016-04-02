
import { addMiddleware } from "../utilities"
import Debouncer from "../../util/debounce"
import actions from "./actions"

let bound = false;
const responsiveBindings = store => next => action => {

  if (bound) { return next(action); }
  bound = true;


  // XXX figure out how to get width on the server
  if (typeof window != "undefined" && window != null) {
    return
  }

  const { dispatch, getState } = store;


  const getBreakpoints = (width) => {
    const { responsive } = getState();

    let breakpoints = [];
    for (let breakpoint in responsive._breakpoints) {
      let name = breakpoint
      let range = responsive._breakpoints[breakpoint]

      if (range.min && width < range.min) {
        continue
      }

      if (range.max && width > range.max) {
        continue
      }

      breakpoints.push(name)

    }

    return breakpoints;
  }

  const onBodyResize = () => {
    const { responsive } = getState();

    const w = window,
      d = document,
      e = d.documentElement,
      g = d.getElementsByTagName("body")[0],
      x = w.innerWidth || e.clientWidth || g.clientWidth,
      y = w.innerHeight|| e.clientHeight|| g.clientHeight;

    dispatch(actions.setWidth(x));
    dispatch(actions.setHeight(y));

    const breakpoints = getBreakpoints(x);

    if (!_.difference(responsive.breakpoints, breakpoints).length) {
      dispatch(actions.setBreakpoints(breakpoints))
    }
  }

  const deboncedResize = new Debouncer(onBodyResize);

  // this is a single run through since we are using a debounced
  // method to bind to the window's events
  window.addEventListener("resize", deboncedResize, false);

  return next(action);
};

addMiddleware(responsiveBindings);
