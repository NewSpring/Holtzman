import { StyleSheet } from "aphrodite";

export default StyleSheet.create({
  "mini-player": {
    position: "fixed",
    maxHeight: "50px",
    opacity: ".95",
    zIndex: "101",
    // account for border on light version of nav
    // marginBottom: "52px",
    "@media (max-width: 767px)": {
      marginBottom: "50px",
    },
    "@media (min-width: 768px)": {
      paddingLeft: "90px",
    },
  },

  "mini-album-cover": {
    width: "32px",
  },

  "mini-player-stop": {
    position: "fixed",
    height: "50px",
    zIndex: "101",
    marginBottom: "50px",
  },

  "mini-player-stop-h6": {
    marginTop: "3px",
  },

  "mini-player-stop-h6-icon": {
    fontSize: "1.2em",
  },

  "mini-player-transition": {
    WebkitTransition: "left 300ms",
    transition: "left 300ms",
  },

  "mini-player-fade": {
    WebkitTransition: "opacity 300ms",
    transition: "opacity 300ms",
    opacity: 0,
  },
});
