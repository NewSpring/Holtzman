import PropTypes from "prop-types";
import { Component } from "react";
import { Link } from "react-router";
import { css } from "aphrodite";

import { ImageLoader } from "../@primitives/UI/loading";
import LoadingStyles from "../@primitives/UI/loading/FeedItemSkeleton-css";

import inAppLink from "../../util/inAppLink";

import Styles from "./styles-css";

export default class SearchItem extends Component {

  static propTypes = {
    item: PropTypes.object, // eslint-disable-line
  }

  cardClasses = () => {
    const classes = [
      "background--light-primary",
      "push-half-bottom@palm",
      "push-bottom@palm-wide-and-up",
      "card",
      "rounded",
      "text-dark-secondary",
      "display-block",
      "plain",
      css(Styles.card),
    ];

    return classes.join(" ");
  }

  gridClasses = () => (
    [
      "grid",
      "flush",
      css(Styles["height-100"]),
    ].join(" ")
  )

  gridItemClasses = () => (
    [
      "grid__item",
      "three-fifths",
      "soft-half",
      "floating--left",
      "one-whole",
      css(Styles["height-100"]),
    ].join(" ")
  )

  pClasses = () => (
    `small ${css(Styles["ellipsis-p"])}`
  )

  bgClasses = () => (
    [
      "grid__item",
      "two-fifths",
      "hard",
      "soft-half-left",
      "background--cover",
      css(Styles["height-100"]),
    ]
  )

  // context from ImageLoader
  preloader() {
    return (
      <div className={`${this.imageclasses.join(" ")} ${css(LoadingStyles["load-item"])}`}>
        <div className="ratio--square" />
      </div>
    );
  }

  // context from ImageLoader
  renderElement() {
    return (
      <div
        className={this.imageclasses.join(" ")}
        style={this.style}
      />
    );
  }

  render() {
    return (
      <Link to={this.props.item.link} className={this.cardClasses()} onClick={inAppLink}>
        <div className={this.gridClasses()}>

          <div className={this.gridItemClasses()}>
            <div className="floating__item one-whole soft-half-sides">
              <h6>{this.props.item.title}</h6>
              <p className={this.pClasses()}>
                {this.props.item.description}
              </p>
            </div>
          </div>

          {(() => {
            if (this.props.item.image === "null") {
              const classes = this.bgClasses();
              classes.push(css(Styles["placeholder-img"]));
              return (
                <div className={classes.join(" ")} />
              );
            }
            return (
              <ImageLoader
                src={this.props.item.image}
                force
                preloader={this.preloader}
                renderElement={this.renderElement}
                imageclasses={this.bgClasses()}
                style={{
                  backgroundImage: `url('${this.props.item.image}')`,
                }}
              />
            );
          })()}
        </div>
      </Link>
    );
  }

}
