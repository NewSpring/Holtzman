import { Component } from "react";
import { css } from "aphrodite";
import Styles from "./FeedItemSkeleton-css";

export default class FeedItemSkeleton extends Component {

  backgroundStyles = () => {
    const classes = [
      "rounded-top",
      "ratio--square",
      "background--light-tertiary",
      css(Styles["load-item"]),
    ];

    return classes.join(" ");
  }

  titleStyles = () => {
    const classes = [
      "one-whole",
      "push-half-bottom",
      "background--light-tertiary",
      css(Styles["fake-text"]),
    ];

    return classes.join(" ");
  }

  subtitleStyles = () => {
    const classes = [
      "two-thirds",
      "push-bottom",
      "background--lirght-tertiary",
      css(Styles["fake-text"]),
    ];

    return classes.join(" ");
  }

  subsubtitleStyles = () => {
    const classes = [
      "one-fifth",
      "background--light-tertiary",
      css(Styles["fake-text-small"]),
    ];

    return classes.join(" ");
  }

  render() {
    return (
      <div className="card">
        <div className={this.backgroundStyles()} />
        <div className="outlined--light soft card__item rounded-bottom">
          <div className={this.titleStyles()} />
          <div className={this.subtitleStyles()} />
          <div className={this.subsubtitleStyles()} />
        </div>
      </div>
    );
  }
}
