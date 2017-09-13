import { StyleSheet } from "aphrodite";

export default StyleSheet.create({
  select: {
    ":after": {
      content: "\"\"",
      border: "solid #505050",
      borderStyle: "solid",
      borderWidth: "0 2px 2px 0",
      borderRadius: "0 2px 2px 2px",
      padding: "7px",
      transform: "rotate(45deg)",
      height: 0,
      width: 0,
      position: "absolute",
      display: "inline-block",
      cursor: "pointer",
      pointerEvents: "none",
      top: "-4px",
      right: "4px",
    },
  },
});
