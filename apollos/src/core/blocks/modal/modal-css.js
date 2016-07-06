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

    "@media (max-width: 767px)": {
      width: "100%",
    },
  },
  interior: {

    overflowY: "auto !important",

    "@media (max-width: 767px)": {
      paddingBottom: "60px",
    },

  }
});
