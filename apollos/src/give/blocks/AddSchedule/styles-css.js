import { StyleSheet } from "aphrodite";

export default StyleSheet.create({
  "select": {
    ":after": {
      top: "15px !important",
    },
  },
  "show-placeholder": {
    "::-webkit-input-placeholder": {
      color: "#ddd!important",
    }
  }
});
