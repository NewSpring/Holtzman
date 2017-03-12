import { Component, PropTypes } from "react";
import { Link } from "react-router";

import { ImageLoader } from "../../UI/loading";

import ifElse from "ramda/src/ifElse";
import compose from "ramda/src/compose";
import join from "ramda/src/join";
import flatten from "ramda/src/flatten";
import append from "ramda/src/append";
import merge from "ramda/src/merge";

// import { ImageLoader } from "/imports/components/loading";
// import Styles from "../loading/FeedItemSkeleton-css";

const Wrapper = (props) => (
  <div {...props}>
    {props.children}
  </div>
);

Wrapper.propTypes = {
  children: PropTypes.any, // eslint-disable-line
};

export default class Card extends Component {

  static propTypes = {
    classes: PropTypes.array, // eslint-disable-line
    theme: PropTypes.string,
    link: PropTypes.string,
    image: PropTypes.object, // eslint-disable-line
    styles: PropTypes.object, // eslint-disable-line
    children: PropTypes.any, // eslint-disable-line
    itemClasses: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
    ]),
    linkAll: PropTypes.any, // eslint-disable-line
    imageclasses: PropTypes.array, // eslint-disable-line
    itemTheme: PropTypes.string,
    itemStyles: PropTypes.object, // eslint-disable-line
    mobile: PropTypes.bool,
    wrapperClasses: PropTypes.string,
  }

  // [string] -> boolean -> string
  createItemClasses = (itemClasses, linkAll) =>
    compose(
      join(" "),
      flatten,
      ifElse(() => itemClasses, append(itemClasses), x => x),
      ifElse(() => linkAll, append("background--light-primary"), x => x)
    )([ "card__item", "soft", "text-center", "soft-double-ends" ]);


  // [string] -> string
  cardClasses = (classes) =>
    compose(
      join(" "),
      flatten,
      ifElse(() => classes, append(classes), x => x)
    )(["card"]);

  // styles = () => {
  //   const defaultStyles = {
  //     overflow: "hidden",
  //     display: "block",
  //   };
  //
  //   if (this.props.linkAll) {
  //     defaultStyles.color = "inherit";
  //     defaultStyles.textDecoration = "none";
  //   }
  //
  //   return defaultStyles;
  // }

  // boolean -> Object
  createStyles = (linkAll) =>
    compose(
      ifElse(() => linkAll, merge({ color: "inherit", textDecoration: "none" }), x => x)
    )({ overflow: "hidden", display: "block" });

  // imageStyles = () => {
  //   const defaultStyles = {};
  //   if (this.props.image && this.props.image.full) {
  //     defaultStyles.backgroundImage = `url('${this.props.image.url}')`;
  //   }
  //
  //   return defaultStyles;
  // }
  // boolean -> string -> Object
  imageStyles = (full, url) =>
    ifElse(() => full, () => ({ backgroundImage: `url('${url}')`}), () => ({}))();


  // context from ImageLoader
  preloader() {
    return (
      <div className={`${this.imageclasses.join(" ")}`}>
        <div className="ratio__item" />
      </div>
    );
  }

  createImage = () => {
    const { image } = this.props;

    if (image) {
      let imageclasses = [
        "background--fill",
        "card__image",
        "background-light-tertiary",
      ];

      if (image.ratio) {
        imageclasses.push(`ratio--${image.ratio}`);
      } else {
        imageclasses.push("ratio--landscape");
      }

      if (this.props.imageclasses) {
        imageclasses = [...imageclasses, ...this.props.imageclasses];
      }

      let style;
      if (image.full !== true) {
        style = { backgroundImage: `url('${image.url}')` };
      }

      return (
        <ImageLoader
          src={image.url}
          preloader={this.preloader}
          renderElement={this.renderElement}
          imageclasses={imageclasses}
          style={style}
          data-spec="card-image-loader"
        />
      );
    }
    return undefined;
  }

  // context from ImageLoader
  renderElement() {
    return (
      <div className={this.imageclasses.join(" ")} style={this.style}>
        <div className="ratio__item" />
      </div>
    );
  }

  render() {
    const { link, theme, styles, itemTheme, itemStyles, linkAll, classes, image } = this.props;
    let { wrapperClasses } = this.props;

    wrapperClasses += " plain";
    if (this.props.mobile === false) {
      wrapperClasses += " visuallyhidden@handheld";
    }

    if (this.props.linkAll) {
      return (
        <Link
          data-spec="card"
          className={theme || this.cardClasses(classes)}
          style={styles || this.createStyles(linkAll)}
          to={link}
        >
          <div className={wrapperClasses} style={this.imageStyles(image ? image.full : null, image ? image.url : null)} data-spec="card-image-wrapper">
            {this.createImage()}
          </div>
          <div
            className={itemTheme || createItemClasses(itemClasses, linkAll)}
            style={itemStyles}
            data-spec="card-item"
          >
            {this.props.children}
          </div>
        </Link>
      );
    }

    return (
      <div
        data-spec="card"
        className={theme || this.cardClasses(classes)}
        style={styles || this.createStyles(linkAll)}
      >
        {(() => {
          if (link) {
            return (
              <Link className={wrapperClasses} to={link} data-spec="card-image-wrapper">
                {this.createImage()}
              </Link>
            );
          }
          return (
            <Wrapper className={wrapperClasses} data-spec="card-image-wrapper">
              {this.createImage()}
            </Wrapper>
          );
        })()}
        <div
          className={itemTheme || createItemClasses(itemClasses, linkAll)}
          style={itemStyles}
          data-spec="card-item"
        >
          {this.props.children}
        </div>

      </div>

    );
  }

}
