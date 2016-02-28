import { Component, PropTypes } from "react"
import { Link } from "react-router"

import Styles from "./styles"

export default class SearchItem extends Component {

  cardClasses = () => {
    return [
      "background--light-primary",
      "push-half-bottom",
      "card",
      "rounded",
      "text-dark-secondary",
      "display-block",
      Styles.card
    ].join(" ")
  }

  gridClasses = () => {
    return [
      "grid",
      "flush",
      Styles["height-100"]
    ].join(" ")
  }

  gridItemClasses = () => {
    return [
      "grid__item",
      "three-fifths",
      "soft-half",
      "floating--left",
      "one-whole",
      Styles["height-100"]
    ].join(" ")
  }

  pClasses = () => {
    return `small ${Styles["ellipsis-p"]}`
  }

  bgClasses = () => {
    return [
      "grid__item",
      "two-fifths",
      "hard",
      "soft-half-left",
      "background--cover",
      Styles["height-100"]
    ].join(" ")
  }

  render() {

    return (
      <Link to={this.props.item.link} target="_blank" className={this.cardClasses()}>
        <div className={this.gridClasses()}>

          <div className={this.gridItemClasses()}>
            <div className="floating__item one-whole soft-half-sides">
              <h6>{this.props.item.title}</h6>
              <p className={this.pClasses()}>
                {this.props.item.description}
              </p>
            </div>
          </div>

          <div
            className={this.bgClasses()}
            style={{
              backgroundImage: `url(${this.props.item.image})`
            }}
            >
          </div>

        </div>
      </Link>
    );

  }

}
