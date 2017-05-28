import { StyleSheet } from "aphrodite";

export default StyleSheet.create({
  "side-panel": {
    position: "fixed",
    zIndex: 100,
    top: 0,
    bottom: 0,

    width: "375px",
    overflowX: "hidden",
    overflowY: "auto",
    WebkitOverflowScrolling: "touch",

    "@media (max-width: 480px)": {
      width: "100%",
    },
  },
  "prompt-panel": {
    position: "fixed",
    zIndex: 100,
    top: "auto",
    bottom: 0,

    overflowX: "hidden",
    overflowY: "auto",
    WebkitOverflowScrolling: "touch",

    "@media (max-width: 768px)": {
      bottom: 0,
      top: "auto",
      backgroundColor: "transparent",
      width: "calc(100% - 20px)",
      left: "10px",
      // maxWidth: "380px",
    },

    "@media (min-width: 481px)": {
      left: "50%",
      marginLeft: "-190px",
      maxWidth: "380px",
    },
  },
  interior: {
    overflowY: "auto !important",

    "@media (max-width: 480px)": {
      paddingBottom: "60px",
    },
  },
});
