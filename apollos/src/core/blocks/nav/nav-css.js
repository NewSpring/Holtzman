import { StyleSheet } from "aphrodite";

export default StyleSheet.create({
  "nav-bar": {
    zIndex: 102,

    "@media screen and (max-width: 480px)": {
      position: "fixed",
      maxHeight: "50px",
      display: "flex",
      justifyContent: "center",
      width: "100%",
    },

    "@media screen and (max-height: 481px) and (min-width: 481px)": {
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      paddingTop: "0px",
    },

    "@media screen and (min-width: 481px)": {
      position: "fixed",
      maxWidth: "80px",
      top: 0,
      paddingLeft: "5px",
      // border for light nav
      // borderRight: "1px solid #ddd",

      ":before": {
        content: "none",
      }
    },
  },

  "nav-bar-border": {
    "@media screen and (max-width: 480px)": {
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

    "@media screen and (min-width: 481px)": {
      display: "block",
      margin: "0 auto",
    },

  },

});
