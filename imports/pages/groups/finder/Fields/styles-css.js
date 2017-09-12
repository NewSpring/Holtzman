// @flow

import { StyleSheet } from "aphrodite";

export default StyleSheet.create({
  select: {
    // eslint-disable-line
    ":after": {
      top: "-15px",
    },
  },
  "show-placeholder": {
    "::-webkit-input-placeholder": {
      color: "#858585!important",
    },
  },
});
