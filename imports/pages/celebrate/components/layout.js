import PropTypes from "prop-types";
import React, { Component } from "react";
import { css } from "aphrodite";

import ImageLoader from "../../../components/@primitives/UI/loading/ImageLoader";
import Styles from "../../../components/@primitives/UI/loading/FeedItemSkeleton-css";

export const Stats = ({ children, className }) => (
  <div className={`soft-top soft-sides soft-double-top@lap-and-up ${className}`}>
    <div
      className={
        "text-center one-whole two-thirds@lap one-half@lap-wide-and-up display-inline-block"
      }
    >
      {children}
    </div>
  </div>
);

Stats.propTypes = {
  children: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export const Leaves = ({ children }) => (
  <div className="relative">
    {children}
  </div>
);

Leaves.propTypes = {
  children: PropTypes.object.isRequired,
};


export class Image extends Component {

  static propTypes = {
    url: PropTypes.string.isRequired,
  }

  preloader() {
    return (
      <div className={`${this.imageclasses.join(" ")} ${css(Styles["load-item"])}`} />
    );
  }

  renderElement() {
    return (
      <div className={`${this.imageclasses.join(" ")}`} style={this.style} />
    );
  }

  render() {
    const { url } = this.props;
    return (
      <div
        className="grid__item one-whole one-half@lap-wide-and-up"
        style={{ verticalAlign: "middle" }}
      >
        <div className="text-center push-double-top">
          <div className="three-quarters one-half@lap ratio--square display-inline-block">
            <ImageLoader
              src={url}
              preloader={this.preloader}
              renderElement={this.renderElement}
              imageclasses={["ratio__item", "one-whole", "round", "background--fill"]}
              style={{
                backgroundImage: `url(${url})`,
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export const Body = ({ children, rev }) => {
  if (rev) {
    return (
      <div
        className="grid__item one-whole one-half@lap-wide-and-up soft-double-left@lap-and-up"
        style={{ verticalAlign: "middle" }}
      >
        <div
          className="soft-double-sides@lap soft-double-left@lap-and-up soft-double-ends text-left"
        >
          {children}
        </div>
      </div>
    );
  }
  return (
    <div
      className="grid__item one-whole one-half@lap-wide-and-up soft-double-right@lap-and-up"
      style={{ verticalAlign: "middle" }}
    >
      <div
        className="soft-double-sides@lap soft-double-right@lap-and-up soft-double-ends text-left"
      >
        {children}
      </div>
    </div>
  );
};

Body.propTypes = {
  children: PropTypes.object.isRequired,
  rev: PropTypes.bool,
};
