import PropTypes from 'prop-types';
import { Component } from "react";
import { Link } from "react-router";

import content from "../../util/content";

export default class StudiesEntryListItem extends Component {

  static propTypes = {
    studyEntry: PropTypes.object.isRequired,
    order: PropTypes.number.isRequired,
    light: PropTypes.boolean,
  }

  dynamicWidth = () => {
    const defaults = {};

    if (this.props.light) defaults.border = "1px solid #ddd";

    if (typeof window !== "undefined" || window !== null) {
      const ratio = window.isTablet ? 0.375 : 0.8;
      const itemSize = (window.innerWidth - 40) * ratio; // four-fifths
      defaults.width = itemSize;
      defaults.height = itemSize;
    }

    return defaults;
  }

  orderStyle = () => {
    const defaults = {
      width: "40px",
      height: "40px",
      borderRadius: "6px 0 6px 0",
    };

    if (this.props.light) {
      defaults.borderRight = "1px solid #ddd";
      defaults.borderBottom = "1px solid #ddd";
    }

    return defaults;
  }

  render() {
    const { light, studyEntry, order } = this.props;

    return (
      <Link
        to={content.links(studyEntry)}
        className={`
          text-dark-secondary floating ratio--square display-inline-block
          rounded ${light ? "background--light-primary" : "background--light-tertiary"} push-right
        `}
        style={this.dynamicWidth()}
      >
        <div className="one-whole soft-sides text-left floating__item">
          <div
            className="background--light-primary floating locked-left locked-top"
            style={this.orderStyle()}
          >
            <h5 className="floating__item flush">{order + 1}</h5>
          </div>
          <h4>{studyEntry.title}</h4>
        </div>
      </Link>
    );
  }

}
