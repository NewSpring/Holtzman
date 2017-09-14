// @flow

import { StyleSheet } from "aphrodite";

export default StyleSheet.create({
  arrow: {
    ":after": {
      content: "\"\"",
      borderStyle: "solid",
      borderColor: "#505050",
      borderWidth: "0 2px 2px 0",
      borderRadius: "0 2px 2px 2px",
      padding: "7px",
      transform: "rotate(45deg)",
      height: 0,
      width: 0,
      position: "absolute",
      display: "inline-block",
      cursor: "pointer",
      top: "1px",
      right: "4px",
    },
  },
  arrowFocused: {
    ":after": {
      content: "\"\"",
      borderStyle: "solid",
      borderColor: "#6BAC43",
      borderWidth: "0 2px 2px 0",
      borderRadius: "0 2px 2px 2px",
      padding: "7px",
      transform: "rotate(225deg)",
      height: 0,
      width: 0,
      position: "absolute",
      display: "inline-block",
      cursor: "pointer",
      top: "8px",
      right: "4px",
    },
  },
  "show-placeholder": {
    "::-webkit-input-placeholder": {
      color: "#858585!important",
    },
  },
});
