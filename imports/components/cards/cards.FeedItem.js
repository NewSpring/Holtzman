import { Component, PropTypes } from "react";
import { Link } from "react-router";

import Card from "./index";
import styles from "../../util/styles";
import backgrounds from "../../util/backgrounds";
import content from "../../util/content";
import collections from "../../util/collections";
import categories from "../../util/categories";
import time from "../../util/time";

export default class FeedItem extends Component {

  static propTypes = {
    // item: PropTypes.object.isRequired
  }

  isSeriesItem = () => {
    const { channelName } = this.props.item;
    return (channelName === "series_newspring" || channelName === "sermons");
  }

  isLight = () => {
    if (!this.isSeriesItem()) return false;
    return this.props.item.content.isLight;
  }

  getImage = (item) => {
    if (item.channelName === "sermons" && item.parent) {
      if (item.content.images.length > 0) return backgrounds.image(item);
      return backgrounds.image(item.parent);
    }
    return backgrounds.image(item);
  }

  overlayStyles = (item) => {
    if (item.channelName === "sermons") {
      return styles.overlay(item.parent);
    }
    return styles.overlay(item);
  }

  cardClasses = (item) => {
    let classes = [];

    if (this.isSeriesItem()) {
      let collection;
      if (item.channelName === "sermons") {
        collection = this.props.item.parent;
      } else {
        collection = this.props.item;
      }

      if (collection) {
        const collectionClass = collections.classes(collection);
        if (collectionClass) classes.push(collections.classes(collection));
      }

      classes = classes.concat([
        "overlay--gradient",
        "rounded",
        "background--fill"
      ]);
    } else {
      classes.push("rounded-top");
    }

    return classes;
  }

  itemTheme = () => {
    let classes = [
      "card__item",
      "soft",
      "text-center",
      "soft-ends",
      "rounded-bottom"
    ];

    if (this.isSeriesItem()) {
      classes.push("overlay__item", "outlined--none");
    }
    return classes.join(" ");
  }

  h4Classes = () => {
    return [
      !this.isLight() ? "text-light-primary" : "text-dark-primary",
      "capitalize",
    ].join(" ");
  }

  categoryClasses = () => {
    return !this.isLight() ? "text-light-primary" : "text-dark-tertiary";
  }

  timeClasses = () => {
    let classes = ["text-right", "float-right", "flush-bottom"];
    if (!this.isLight()) {
      classes.push("text-light-primary");
    }
    else {
      classes.push("text-dark-tertiary");
    }
    return classes.join(" ");
  }

  iconClasses = () => {
    let classes = `soft-half-right ${categories.icon(this.props.item)} `;
    classes += !this.isLight() ? "text-light-primary" : "text-dark-tertiary";
    return classes;
  }


  render() {
    const item = this.props.item;
    return (
      <Card
          link={content.links(item)}
          classes={this.cardClasses(item)}
          imageclasses={["rounded-top"]}
          image={{ url: this.getImage(item), ratio: "square", full: this.isSeriesItem() }}
          itemTheme={this.itemTheme()}
          linkAll
      >
        <style>{this.overlayStyles(item)}</style>

        <div className="text-left">
          <h4 className={this.h4Classes()}>{item.title}</h4>
          <i className={this.iconClasses()} />
          <h7 className={this.categoryClasses()}>{categories.name(item)}</h7>
          <h7 style={{marginTop: "5px"}} className={this.timeClasses()}>{time.relative(item)}</h7>
        </div>
      </Card>
    );
  }
}
