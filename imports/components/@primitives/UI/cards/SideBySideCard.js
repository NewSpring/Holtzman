import PropTypes from "prop-types";
import { Component } from "react";
import { Link } from "react-router";
import { css } from "aphrodite";

import { ImageLoader } from "../../UI/loading";

import Styles from "../../UI/loading/FeedItemSkeleton-css";

export default class Card extends Component {

  static propTypes = {
    classes: PropTypes.array, // eslint-disable-line
    theme: PropTypes.string,
    link: PropTypes.string,
    itemClasses: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
    ]),
    images: PropTypes.array, // eslint-disable-line
    styles: PropTypes.object, // eslint-disable-line
    ratio: PropTypes.string,
    defaultImage: PropTypes.string,
    itemTheme: PropTypes.string,
    itemStyles: PropTypes.object, // eslint-disable-line
    children: PropTypes.any, //eslint-disable-line
  }

  // context from ImageLoader
  preloader() { // eslint-disable-line
    return (
      <div className={`${this.imageclasses.join(" ")} ${css(Styles["load-item"])}`}>
        <div className="ratio__item" />
      </div>
    );
  }

  // context from ImageLoader
  renderElement() {
    return (
      <div className={this.imageclasses.join(" ")} style={this.style}>
        <div className="ratio__item" />
      </div>
    );
  }

  itemClasses = () => {
    let classes = [
      "card__item",
      "soft",
      "text-left",
      "soft-double@anchored",
      "one-whole@palm",
      "one-whole@lap",
      "three-fifths@lap-wide",
      "three-fifths@palm-wide",
      "one-half@anchored",
    ];

    if (this.props.itemClasses) {
      classes = classes.concat(this.props.itemClasses);
    }

    return classes.join(" ");
  }

  cardClasses = () => {
    let classes = [
      "card",
    ];

    if (this.props.classes) {
      classes = classes.concat(this.props.classes);
    }

    return classes.join(" ");
  }

  styles = () => {
    const defaultStyles = {
      overflow: "hidden",
    };

    // if (this.props.image && this.props.image.full) {
    //   defaultStyles.backgroundImage = `url('${this.props.image.url}')`
    // }

    return defaultStyles;
  }

  getResponsiveImage = () => {
    const { images } = this.props;

    if (typeof window === "undefined" || window === null || !images) {
      return false;
    }

    const sizes = {};
    let src;
    for (const image of images) {
      sizes[image.fileLabel] = image;
    }

    if (window.matchMedia("(max-width: 480px)").matches) {
      src = sizes["2:1"] ? sizes["2:1"].url || sizes["2:1"].cloudfront : false;
    } else if (window.matchMedia("(max-width: 730px)").matches) {
      src = sizes["1:2"] ? sizes["1:2"].url || sizes["1:2"].cloudfront : false;
    } else if (window.matchMedia("(max-width: 768px)").matches) {
      src = sizes["1:1"] ? sizes["1:1"].url || sizes["1:1"].cloudfront : false;
    } else if (window.matchMedia("(max-width: 1024px)").matches) {
      src = sizes["2:1"] ? sizes["2:1"].url || sizes["2:1"].cloudfront : false;
    } else if (window.matchMedia("(max-width: 1281px)").matches) {
      src = sizes["1:2"] ? sizes["1:2"].url || sizes["1:2"].cloudfront : false;
    } else {
      src = sizes["1:1"] ? sizes["1:1"].url || sizes["1:1"].cloudfront : false;
    }

    return src;
  }

  createImage = () => {
    let { ratio } = this.props;
    const { defaultImage } = this.props;

    const imageclasses = [
      "background--fill",
      "card__image",
      "locked-ends@lap-wide-and-up",
      "locked-sides@lap-wide-and-up",
      "locked-ends@palm-wide",
      "locked-sides@palm-wide",
      "relative@palm",
      "relative@lap",
    ];

    if (!ratio) ratio = "ratio--landscape";
    imageclasses.push(ratio);

    const src = this.getResponsiveImage() || defaultImage;

    const style = { backgroundImage: `url('${src}')` };

    return (
      <ImageLoader
        src={src}
        preloader={this.preloader}
        renderElement={this.renderElement}
        imageclasses={imageclasses}
        style={style}
      />
    );
  }


  render() {
    const { link, theme, styles, itemTheme, itemStyles } = this.props;


    const wrapperClasses = [
      "relative@lap",
      "relative@palm",
      "plain",
      "locked-ends@lap-wide-and-up",
      "locked-right@lap-wide-and-up",
      "locked-ends@palm-wide",
      "locked-right@palm-wide",
      "one-whole@lap",
      "one-whole@palm",
      "two-fifths@lap-wide",
      "two-fifths@palm-wide",
      "one-half@anchored",
    ].join(" ");


    if (link) {
      return (
        <div
          className={theme || this.cardClasses()}
          style={styles || this.styles()}
        >
          <Link className={wrapperClasses} to={link}>
            {this.createImage()}
          </Link>
          <div
            className={itemTheme || this.itemClasses()}
            style={itemStyles}
          >
            {this.props.children}
          </div>

        </div>
      );
    }

    return (
      <div
        className={theme || this.cardClasses()}
        style={styles || this.styles()}
      >
        <div className={wrapperClasses}>
          {this.createImage()}
        </div>
        <div
          className={itemTheme || this.itemClasses()}
          style={itemStyles}
        >
          {this.props.children}
        </div>

      </div>

    );
  }

}
