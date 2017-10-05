
import { addMiddleware } from "../utilities";
import Debouncer from "../../../util/debounce";
import actions from "./actions";

let bound = false;
const responsiveBindings = store => next => action => {
  if (bound) { return next(action); }
  bound = true;


  // XXX figure out how to get width on the server
  if (typeof window === "undefined" || window === null) {
    return null;
  }

  const { dispatch, getState } = store;


  const getBreakpoints = width => {
    const { responsive } = getState();

    const breakpoints = [];
    // eslint-disable-next-line
    for (const breakpoint in responsive._breakpoints) {
      const name = breakpoint;
      // eslint-disable-next-line no-underscore-dangle
      const range = responsive._breakpoints[breakpoint];

      if (range.min && width < range.min) {
        continue; // eslint-disable-line no-continue
      }

      if (range.max && width > range.max) {
        continue; // eslint-disable-line no-continue
      }

      breakpoints.push(name);
    }

    return breakpoints;
  };

  const onBodyResize = () => {
    const { responsive } = getState();

    const w = window;
    const d = document;
    const e = d.documentElement;
    const g = d.getElementsByTagName("body")[0];
    const x = w.innerWidth || e.clientWidth || g.clientWidth;
    const y = w.innerHeight || e.clientHeight || g.clientHeight;

    dispatch(actions.setWidth(x));
    dispatch(actions.setHeight(y));

    const breakpoints = getBreakpoints(x);
    const diff = _.difference(responsive.breakpoints, breakpoints);
    if (!responsive.breakpoints.length) {
      dispatch(actions.setBreakpoints(breakpoints));
    }
    if (diff.length) {
      dispatch(actions.setBreakpoints(breakpoints));
    }
  };

  const deboncedResize = new Debouncer(onBodyResize);
  onBodyResize();

  // this is a single run through since we are using a debounced
  // method to bind to the window's events
  window.addEventListener("resize", deboncedResize, false);


  return next(action);
};

addMiddleware(responsiveBindings);
