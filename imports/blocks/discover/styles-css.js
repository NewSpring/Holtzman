import { StyleSheet } from "aphrodite";

export default StyleSheet.create({
  card: {
    height: "144px",
    transition: "all 250ms cubic-bezier(0.250, 0.250, 0.750, 0.750)",

    ":hover": {
      opacity: 0.8,
    },
  },
  "height-100": {
    height: "100%",
  },
  "ellipsis-p": {
    height: "1.75em",
    overflow: "hidden",
    textOverflow: "ellipsis",
    wordBreak: "break-word",
    whiteSpace: "nowrap",
    marginBottom: 0,
  },
  "placeholder-img": {
    backgroundImage: "url(data:image/png;base64,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)",
  },
});
