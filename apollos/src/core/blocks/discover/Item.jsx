import { Component, PropTypes } from "react"
import { Link } from "react-router"
import { css } from "aphrodite";

import { ImageLoader } from "../../components/loading"
import LoadingStyles from "../../components/loading/FeedItemSkeleton-css"

import inAppLink from "../../util/inAppLink"

import Styles from "./styles-css"

export default class SearchItem extends Component {

  cardClasses = () => {
    let classes = [
      "background--light-primary",
      "push-half-bottom@palm",
      "push-bottom@palm-wide-and-up",
      "card",
      "rounded",
      "text-dark-secondary",
      "display-block",
      "plain",
      css(Styles.card)
    ];

    return classes.join(" ");
  }

  gridClasses = () => {
    return [
      "grid",
      "flush",
      css(Styles["height-100"])
    ].join(" ")
  }

  gridItemClasses = () => {
    return [
      "grid__item",
      "three-fifths",
      "soft-half",
      "floating--left",
      "one-whole",
      css(Styles["height-100"])
    ].join(" ")
  }

  pClasses = () => {
    return `small ${css(Styles["ellipsis-p"])}`
  }

  bgClasses = () => {
    return [
      "grid__item",
      "two-fifths",
      "hard",
      "soft-half-left",
      "background--cover",
      css(Styles["height-100"])
    ]
  }

  // context from ImageLoader
  preloader() {
    return (
      <div className={`${this.imageclasses.join(" ")} ${css(LoadingStyles["load-item"])}`}>
        <div className="ratio--square"></div>
      </div>
    );
  }

  // context from ImageLoader
  renderElement() {
    return (
      <div
        className={this.imageclasses.join(" ")}
        style={this.style}
        >
      </div>
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
              let classes = this.bgClasses();
              classes.push(css(Styles["placeholder-img"]));
              return (
                <div className={classes.join(" ")}></div>
              );
            } else {
              return (
                <ImageLoader
                  src={this.props.item.image}
                  force={true}
                  preloader={this.preloader}
                  renderElement={this.renderElement}
                  imageclasses={this.bgClasses()}
                  style={{
                    backgroundImage: `url('${this.props.item.image}')`
                  }}
                />
              );
            }
          })()}

        </div>
      </Link>
    );

  }

}
