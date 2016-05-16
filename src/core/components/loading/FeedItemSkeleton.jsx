import { Component } from "react"

import Styles from "./FeedItemSkeleton-css"

export default class FeedItemSkeleton extends Component {

  backgroundStyles = () => {
    let classes = [
      "rounded-top",
      "ratio--square",
      "background--light-tertiary",
      Styles["load-item"]
    ];

    return classes.join(" ")
  }

  titleStyles = () => {
    let classes = [
      "one-whole",
      "push-half-bottom",
      "background--light-tertiary",
      Styles["fake-text"]
    ];

    return classes.join(" ")
  }

  subtitleStyles = () => {
    let classes = [
      "two-thirds",
      "push-bottom",
      "background--lirght-tertiary",
      Styles["fake-text"]
    ];

    return classes.join(" ")
  }

  subsubtitleStyles = () => {
    let classes = [
      "one-fifth",
      "background--light-tertiary",
      Styles["fake-text-small"]
    ];

    return classes.join(" ")
  }

  render () {
    return (
      <div className="card">
        <div className={this.backgroundStyles()}></div>
        <div className="outlined--light soft card__item rounded-bottom">
          <div className={this.titleStyles()}></div>
          <div className={this.subtitleStyles()}></div>
          <div className={this.subsubtitleStyles()}></div>
        </div>
      </div>
    )

  }
}
