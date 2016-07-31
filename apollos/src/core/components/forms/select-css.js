import { StyleSheet } from "aphrodite";

export default StyleSheet.create({
  "select": {
    ":after": {
      content: '""',
      borderColor: "#858585 transparent transparent transparent",
      borderStyle: "solid",
      borderWidth: "6px 6px 0 6px",
      height: 0,
      width: 0,
      position: "absolute",
      top: "5px",
      right: "5px",
    },
  },
});
