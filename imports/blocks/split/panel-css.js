import { StyleSheet } from "aphrodite/no-important";

export default StyleSheet.create({
  panel: {
    "@media screen and (min-width: 481px) and (max-width: 768px)": {
      position: "relative",
    },
  },
  offset: {
    "@media screen and (min-width: 769px)": {
      marginLeft: "80px",
    },
  },
});
