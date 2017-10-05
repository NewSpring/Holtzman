import PropTypes from "prop-types";
import { Component } from "react";
import { Link } from "react-router";

import content from "../../util/content";
import time from "../../util/time";

export default class SeriesVideoListItem extends Component {

  static propTypes = {
    sermon: PropTypes.object.isRequired,
    order: PropTypes.number.isRequired,
  }

  dynamicWidth = () => {
    if (typeof window !== "undefined" || window !== null) {
      const ratio = window.isTablet ? 0.375 : 0.8;
      const itemSize = (window.innerWidth - 40) * ratio; // four-fifths
      return {
        width: itemSize,
        height: itemSize,
      };
    }

    return {

    };
  }

  render() {
    const sermon = this.props.sermon;
    const order = this.props.order;

    return (
      <Link
        to={content.links(sermon)}
        className={
          "text-dark-secondary floating ratio--square display-inline-block " +
          "rounded background--light-tertiary push-right"
        }
        style={this.dynamicWidth()}
      >
        <div className="one-whole soft-sides text-left floating__item">
          <div
            className="background--light-primary floating locked-left locked-top"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "6px 0 6px 0",
            }}
          >
            <h5 className="floating__item flush">{order + 1}</h5>
          </div>
          <h4>{sermon.title}</h4>
          <i className="soft-half-right icon-category-video" />
          <h7>{content.speakers(sermon)}</h7>
          <h7 className="push-half-top float-right text-right">{time.relative(sermon)}</h7>
        </div>
      </Link>
    );
  }

}
