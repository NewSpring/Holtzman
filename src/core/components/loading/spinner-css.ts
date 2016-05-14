import { StyleSheet } from "aphrodite";

const keyframes = {
  "from": {
    transform: "rotate(0deg)"
  },
  "to": {
    transform: "rotate(360deg)",
  },
};

export default StyleSheet.create({
  loader: {
    animationDuration: ".85s",
    animationIterationCount: "infinite",
    animationName: keyframes,
    animationTimingFunction: "linear",

    borderRadius: "50%",
    display: "inline-block",
    borderColor:" #6BAC43 transparent #6BAC43 #6BAC43",

    width: "60px",
    height: "60px",
    borderWidth: "5px",
    borderStyle: "solid",
  },
});
