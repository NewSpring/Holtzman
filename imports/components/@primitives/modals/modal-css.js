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
    top: 200,
    bottom: 0,

    width: "375px",
    overflowX: "hidden",
    overflowY: "auto",
    WebkitOverflowScrolling: "touch",

    "@media (max-width: 480px)": {
      bottom: 0,
      top: "auto",
      backgroundColor: "transparent",
      width: "calc(100% - 20px)",
      left: "10px",
    },
  },
  interior: {
    overflowY: "auto !important",

    "@media (max-width: 480px)": {
      paddingBottom: "60px",
    },
  },
});
