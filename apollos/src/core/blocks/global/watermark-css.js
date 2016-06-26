import { StyleSheet } from "aphrodite";

export default StyleSheet.create({
  "global-watermark": {
    "@media (min-width: 769px)": {
      transform: "rotate(270deg)",
      position: "fixed",
      zIndex: 10,
      top: "auto",
      right: "20px",
      bottom: "20px",

      display: "block",
      overflow: "visible",

      width: 0,

      transformOrigin: "left bottom 0",

      textShadow: "0 0 10px #858585",

      fontWeight: 900,
    },
  },
  watermark: {
    letterSpacing: "1.7px",

    fontSize: "24px",
    fontWeight: 800,
  }
});
