import { StyleSheet } from "aphrodite";

export default StyleSheet.create({
  "nav-bar": {
    zIndex: 102,

    "@media screen and (max-width: 768px)": {
      position: "fixed",
      maxHeight: "60px",
      display: "flex",
      justifyContent: "center",
      width: "100%",
    },

    "@media screen and (min-width: 769px)": {
      position: "fixed",
      maxWidth: "80px",
      top: 0,
      paddingLeft: "5px",
      borderRight: "1px solid #ddd",

      ":before": {
        content: "none",
      }
    },
  },

  "nav-bar-border": {
    "@media screen and (max-width: 768px)": {
      borderTop: "1px solid #ddd",
    },
  },

  "i": {
    fontSize: "1.4em",
    position: "relative",
  },

  "button": {
    flexGrow: 1,
    position: "relative",

    "@media screen and (min-width: 769px)": {
      display: "block",
      margin: "0 auto",
    },

  },

});
