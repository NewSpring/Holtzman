
import { PropTypes, Component } from "react";
import { connect } from "react-redux"

import Styles from "./audio.styles.scrubber.css"

import { audio as audioActions } from "app/client/actions"

const mapStateToProps = (state) => {
  return state.audio;
};

@connect(mapStateToProps, audioActions)
export default class AudioScrubber extends Component {

  static propTypes = {
    isLight: PropTypes.bool.isRequired
  }

  state = {
    lastPercent: null,
    override: false
  }

  scrubStyle = () => {
    let { progress } = this.props;
    const { lastPercent, override } = this.state;

    if(override) {
      progress = lastPercent;
    }

    return {
      width: `${progress}%`
    };
  };

  touchMove = (e) => {
    const percent = this.calculatePercent(e.target, e.touches[0].clientX);

    this.setState({
      lastPercent: percent,
      override: true
    });
  };

  touchEnd = (e) => {
    const percent = this.state.lastPercent;

    if(typeof percent === "number") {
      this.seek(percent);
    }

    setTimeout(() => {
      this.setState({
        lastPercent: null,
        override: false
      });
    }, 250);
  }

  click = (e) => {
    const percentClicked = this.calculatePercent(e.target, e.clientX);
    this.seek(percentClicked);
  }

  calculatePercent = (targetElement, clickedX) => {
    var min = targetElement.offsetParent.offsetLeft;
    var range = targetElement.offsetWidth;
    var offsetClicked = clickedX - min;
    var percentClicked = offsetClicked / range * 100;

    if(percentClicked > 100) {
      percentClicked = 100;
    }
    else if(percentClicked < 0) {
      percentClicked = 0;
    }

    return percentClicked;
  }

  seek = (percentClicked) => {
    if(percentClicked > 100) {
      percentClicked = 100;
    }
    else if(percentClicked < 0) {
      percentClicked = 0;
    }

    this.props.seek(percentClicked);
  }

  getTertiaryBackgroundColor = (dark) => {
    return dark ? {backgroundColor: "rgba(255,255,255,.2)"} : {backgroundColor: "rgba(0,0,0,.2)"};
  };

  getTertiaryTextColor = (dark) => {
    return dark ? {color: "rgba(255,255,255,.5)"} : {color: "rgba(0,0,0,.5)"};
  };

  getSecondayBackgroundClass = (dark) => {
    return dark ? "background--dark-secondary" : "background--light-secondary";
  };

  getPrimaryBackgroundClass = (dark) => {
    return dark ? "background--dark-primary" : "background--light-primary";
  };

  getTertiaryTextClass = (dark) => {
    return dark ? "text-dark-tertiary" : "text-light-tertiary";
  };

  getTrackDuration = () => {
    return this.props.playing.track.duration;
  };

  getTrackDuration = () => {
    return this.props.playing.track.duration;
  };

  getCurrentTime = () => {
    const { time } = this.props;
    return time;
  };

  render() {
    const { isLight } = this.props;

    const playbar = [
      "play-bar",
      "rounded",
      Styles["play-bar"]
    ];

    return (
      <div className="grid one-whole flush soft-top">

        <div className="hard grid__item one-tenth floating__item " style={this.getTertiaryTextColor(!isLight)}>
          <small>
            <small>
              {this.getCurrentTime()}
            </small>
          </small>
        </div>

        <div
          className="grid__item eight-tenths push-half-ends floating__item soft-half-sides"
          style={{position: "relative"}}
          onTouchEnd={this.touchEnd}
          onTouchMove={this.touchMove}
          onClick={this.click}>
          <div
            className={playbar.join(" ")}
            style={this.getTertiaryBackgroundColor(!isLight)}>
          </div>
          <div
            className={Styles["play-bar--active"] + " floating--right"}
            style={this.scrubStyle()}>
            <div
              className={Styles["play-bar"] + " " + "rounded " + this.getSecondayBackgroundClass(isLight)}>
            </div>
            <button
              className={Styles["scrub-dot"] + " plain floating__item round " + this.getSecondayBackgroundClass(isLight)}>
            </button>
          </div>
          <div
            className="cover" style={{position: "absolute", top: "-20px", bottom: 0, left: 0, right: 0}}>
          </div>
        </div>

        <div className="hard grid__item one-tenth floating__item " style={this.getTertiaryTextColor(!isLight)}>
          <small>
            <small>
              {this.getTrackDuration()}
            </small>
          </small>
        </div>

      </div>
    );
  }
}
