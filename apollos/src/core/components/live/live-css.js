import { StyleSheet } from "aphrodite";

const keyframes = {
  "0%": {
    backgroundColor: "#5DA23D",
  },
  "50%": {
    backgroundColor: "#3F803C",
  },
  "100%": {
    backgroundColor: "#5DA23D",
  },
};

const animation = {
  animationDuration: "10s",
  animationIterationCount: "infinite",
  animationName: keyframes,
  animationTimingFunction: "cubic-bezier(0.66, 0.21, 0.49, 0.88)",
}

const phaders = {
  "from": {
    opacity: 0,
  }
}

const textAnimation = {
  animationDuration: "1.5s",
  animationIterationCount: "infinite",
  animationName: phaders,
  animationDirection: "alternate",
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
  "live-text": {
    ...textAnimation,
    color: "white",
  }
});
