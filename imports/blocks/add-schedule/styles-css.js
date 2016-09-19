import { StyleSheet } from "aphrodite";

export default StyleSheet.create({
  "select": { // eslint-disable-line
    ":after": {
      top: "15px !important",
    },
  },
  "show-placeholder": {
    "::-webkit-input-placeholder": {
      color: "#ddd!important",
    },
  },
});
