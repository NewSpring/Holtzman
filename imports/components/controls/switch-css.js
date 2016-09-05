import { StyleSheet } from "aphrodite";

export default StyleSheet.create({
  "toggle-switch": {
    maxHeight: 0,
    maxWidth: 0,
    opacity: 0,
  },
  label: {
    display: "block",
    position: "relative",
    boxShadow: "inset 0 0 0px 2px #ddd",
    textIndent: "-5000px",
    height: "30px",
    width: "50px",
    borderRadius: "15px",

    ":before": {
      content: "",
      position: "absolute",
      display: "block",
      height: "30px",
      width: "30px",
      top: 0,
      left: 0,
      borderradius: "15px",
      background: "rgba(107, 172, 67, 0)",
      transition: ".25s ease-in-out",
    },

    ":after": {
      content: "",
      position: "absolute",
      display: "block",
      height: "30px",
      width: "30px",
      top: 0,
      left: "0px",
      borderRadius: "15px",
      background: "white",
      boxShadow: "inset 0 0 0 2px #ddd",
      transition: ".25s ease-in-out",
    }
  },
  "checked-label": {
    ":before": {
      width: "50px",
      background: "#6bac43",
    },

    ":after": {
      left: "20px",
      boxShadow: "inset 0 0 0 2px #6bac43",
    }
  },
});
