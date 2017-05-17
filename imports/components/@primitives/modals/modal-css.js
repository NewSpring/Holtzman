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
    top: 150,
    bottom: 0,

    width: "375px",
    overflowX: "hidden",
    overflowY: "auto",
    WebkitOverflowScrolling: "touch",

    "@media (max-width: 480px)": {
      width: "90%",
      right: "5%",
      bottom: "5%",
      top: "100px",
    },
  },
  interior: {
    overflowY: "auto !important",

    "@media (max-width: 480px)": {
      paddingBottom: "60px",
    },
  },
});
