import { StyleSheet } from "aphrodite";

const keyframes = {
  "0%": {
    backgroundColor: "#6BAC43",
  },
  "50%": {
    backgroundColor: "#1c683e",
  },
  "100%": {
    backgroundColor: "#6BAC43",
  },
};

const animation = {
  animationDuration: "5s",
  animationIterationCount: "infinite",
  animationName: keyframes,
  animationTimingFunction: "cubic-bezier(0.66, 0.21, 0.49, 0.88)",
}

export default StyleSheet.create({
  "live-float": {
    position: "absolute",
    top: "45px",
    width: "100%",
    zIndex: 1,
  },
  "live-banner": {
    ...animation,
  },
});
