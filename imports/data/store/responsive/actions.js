
export default {
  setBreakpoints: breakpoints => ({ type: "@@RESPONSIVE.SET_BREAKPOINT", breakpoints }),
  setWidth: width => ({ type: "@@RESPONSIVE.SET_WIDTH", width }),
  setHeight: height => ({ type: "@@RESPONSIVE.SET_HEIGHT", height }),
};
