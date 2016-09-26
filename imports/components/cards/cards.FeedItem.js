import { Component, PropTypes } from "react";
// import { Link } from "react-router";

import Card from "./index";
import styles from "../../util/styles";
import backgrounds from "../../util/backgrounds";
import content from "../../util/content";
import collections from "../../util/collections";
import categories from "../../util/categories";
import time from "../../util/time";

export default class FeedItem extends Component {

  static propTypes = {
    item: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.object,
    ]).isRequired, // eslint-disable-line
  }

  getImage = (item) => {
    if (item.channelName === "sermons" && item.parent) {
      if (item.content.images.length > 0) return backgrounds.image(item);
      return backgrounds.image(item.parent);
    }
    return backgrounds.image(item);
  }

  isLight = () => {
    if (!this.isSeriesItem()) return true;
    if (this.props.item.channelName === "sermons") {
      return this.props.item.parent.content.isLight;
    }
    return this.props.item.content.isLight;
  }

  isSeriesItem = () => {
    const { channelName } = this.props.item;
    return (channelName === "series_newspring" || channelName === "sermons");
  }

  overlayStyles = (item) => {
    if (item.channelName === "sermons") {
      return styles.overlay(item.parent);
    }
    return styles.overlay(item);
  }

  cardClasses = () => {
    let classes = [];

    if (this.isSeriesItem()) {
      classes = classes.concat([
        "rounded",
      ]);
    } else {
      classes.push("rounded-top");
    }

    return classes;
  }

  itemTheme = () => {
    const classes = [
      "card__item",
      "soft",
      "text-center",
      "soft-bottom",
      "rounded-bottom",
    ];

    if (this.isSeriesItem()) {
      classes.push("overlay__item", "outlined--none", "soft-half-top");
    } else {
      classes.push("soft-top");
    }
    return classes.join(" ");
  }

  h4Classes = () => ([
    !this.isLight() ? "text-light-primary" : "text-dark-primary",
    "capitalize",
  ].join(" "))

  categoryClasses = () => (
    !this.isLight() ? "text-light-primary" : "text-dark-secondary"
  );

  timeClasses = () => {
    const classes = ["text-right", "float-right", "flush-bottom"];
    if (!this.isLight()) {
      classes.push("text-light-primary");
    } else {
      classes.push("text-dark-secondary");
    }
    return classes.join(" ");
  }

  iconClasses = () => {
    let classes = `soft-half-right ${categories.icon(this.props.item)} `;
    classes += !this.isLight() ? "text-light-primary" : "text-dark-secondary";
    return classes;
  }

  wrapperClasses = () => {
    const classes = ["background--fill"];
    if (this.isSeriesItem()) {
      const { item } = this.props;
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

      classes.push("overlay--gradient");
    }
    return classes.join(" ");
  }

  itemStyles = () => {
    if (this.isSeriesItem()) {
      let { item } = this.props;

      if (item.channelName === "sermons") {
        item = item.parent;
      }
      const color = item.content.colors[0] && item.content.colors[0].value;
      if (!color) return {};

      return {
        backgroundColor: `#${color}`,
      };
    }

    return {};
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
        wrapperClasses={this.wrapperClasses()}
        itemStyles={this.itemStyles()}
        linkAll
      >
        <style>{this.overlayStyles(item)}</style>

        <div className="text-left">
          <h4 className={this.h4Classes()}>{item.title}</h4>
          <i className={this.iconClasses()} />
          <h7 className={this.categoryClasses()}>{categories.name(item)}</h7>
          <h7 style={{ marginTop: "5px" }} className={this.timeClasses()}>{time.relative(item)}</h7>
        </div>
      </Card>
    );
  }
}
