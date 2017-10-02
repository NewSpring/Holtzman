import PropTypes from 'prop-types';
import { Component } from "react";

import collections from "../../util/collections";
import backgrounds from "../../util/backgrounds";

export default class StudyHero extends Component {

  static propTypes = {
    study: PropTypes.object.isRequired,
  }

  backgroundClasses = () => (
    [
      "one-whole",
      "overlay--gradient",
      "ratio--square",
      "ratio--landscape@palm-wide",
      "background--fill",
      collections.classes(this.props.study),
    ].join(" ")
  )

  render() {
    const study = this.props.study;
    const imageLabel = window.isTablet ? "2:1" : "1:1";
    return (
      <section className="relative hard">
        <div
          className="one-whole ratio--square ratio--landscape@palm-wide"
          style={{
            position: "absolute",
            zIndex: "10",
          }}
        >
          <div className="ratio__item" />
        </div>
        <div
          className={this.backgroundClasses()}
          style={backgrounds.styles(study, imageLabel)}
        >
          <div className={`overlay__item ${study.content.isLight ? "text-light-primary" : "text-dark-primary"} text-center soft-sides push-top`} />
        </div>
      </section>
    );
  }
}
