import { StyleSheet } from "aphrodite";

const keyframes = {
  "from": {
    backgroundPosition: "100%",
  },
  "to": {
    backgroundPosition: "-100%",
  },
};

const animation = {
  animationDuration: "5s",
  animationIterationCount: "infinite",
  animationName: keyframes,
  animationTimingFunction: "cubic-bezier(0.66, 0.21, 0.49, 0.88)",
  background: "linear-gradient(270deg, #dddddd, #bcbcbc, #dddddd)",
  backgroundSize: "200%",
}

const borderRadius = "2px";

export default StyleSheet.create({
  "load-item": {
    backgroundColor: "#dddddd",
  },
  "fake-text": {
    ...animation,
    height: "15px",
    borderRadius,
  },
  "fake-text-small": {
    ...animation,
    height: "8px",
    borderRadius,
  },
});

// XXX
// :global(.imageloader > :first-child) {
//   opacity: 0.5;
// }
//
// :global(.imageloader.loaded > :first-child) {
//   /* force hardware acceleration */
//   -webkit-transform: translate3d(0, 0, 0);
//   -webkit-backface-visibility: hidden;
//   -webkit-perspective: 1000;
//
//   opacity: 1;
//   transition: opacity .5s ease-in-out;
//  -moz-transition: opacity .5s ease-in-out;
//  -webkit-transition: opacity .5s ease-in-out;
// }
