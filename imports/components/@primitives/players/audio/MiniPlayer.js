import PropTypes from "prop-types";
import { Component } from "react";
import { connect } from "react-redux";
import { css } from "aphrodite";
import { actions as audioActions } from "../../../../data/store/audio";
import AudioControls from "./Controls";

import Styles from "./styles/miniPlayer";

class MiniPlayerWithoutData extends Component {

  static propTypes = {
    classes: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
    ]),
    audio: PropTypes.object, // eslint-disable-line
    dispatch: PropTypes.func,
    play: PropTypes.func,
    pause: PropTypes.func,
    hide: PropTypes.func,
    reset: PropTypes.func,
    fade: PropTypes.func,
    theme: PropTypes.string,
  };

  state = {
    lastPercent: 0,
    startX: 0,
    transition: false,
  };

  // show title before artist if sermon
  // else show artist before title
  getArtistLine = () => {
    const { album, track } = this.props.audio.playing;
    const artistName = track.artist || album.artist || "NewSpring";
    const collectionTitle = album.title;
    if (album.channelName === "series_newspring") {
      return `${collectionTitle} – ${artistName}`;
    }
    return `${artistName} – ${collectionTitle}`;
  }

  layoutClasses = () => {
    let classes = [
      "locked-bottom",
      "one-whole",
      "background--light-tertiary",
      "text-left",
      "soft-half",
      "floating",
    ];


    if (this.props.classes) {
      classes = classes.concat(this.props.classes);
    } else {
      classes.push(css(Styles["mini-player"]));
    }

    if (this.state.transition) {
      classes.push(css(Styles["mini-player-transition"]));
    }

    return classes.join(" ");
  }

  stopClasses = () => {
    const classes = [
      "locked-bottom",
      "one-whole",
      "background--alert",
      "text-right",
      "text-light-primary",
      "soft-half",
      css(Styles["mini-player-stop"]),
    ];

    if (this.state.transition) {
      classes.push(css(Styles["mini-player-transition"]));
    }

    return classes.join(" ");
  }

  stopH6Classes = () =>
    css(Styles["mini-player-stop-h6"]);

  stopH6IconClasses = () => {
    const classes = [
      "icon-close",
      "display-inline-block",
      "push-half-sides",
      css(Styles["mini-player-stop-h6-icon"]),
    ];
    return classes.join(" ");
  }

  albumClasses = () => {
    const classes = [
      "background--fill",
      "ratio--square",
      "float-left",
      "push-half-right",
      "background--primary",
      "floating__item",
    ];
    classes.push(css(Styles["mini-album-cover"]));

    return classes.join(" ");
  }

  toggle = e => {
    e.preventDefault();
    e.stopPropagation();
    const { state } = this.props.audio;

    if (state !== "playing") {
      this.removeHideTimer();
      this.props.play();
      return;
    }

    if (state === "playing") {
      this.startHideTimer();
      this.props.pause();
    }
  }

  removeHideTimer = () => {
    clearInterval(this.timeout);
  }

  startHideTimer = () => {
    this.timeout = setTimeout(() => {
      this.props.pause();
      this.props.hide();
      this.props.reset();
    }, 600000);
  }

  openFullPlayer = () => {
    this.props.dispatch(audioActions.setVisibility("expand"));
  };

  touchStart = e => {
    this.setState({
      startX: e.touches[0].clientX,
      transition: false,
    });
  }

  touchMove = e => {
    const percent = this.calculatePercent(e.currentTarget, e.touches[0].clientX);
    this.setState({
      lastPercent: percent,
    });
  }

  touchEnd = () => {
    const decider = 25;
    const stop = this.state.lastPercent > decider;

    if (stop) {
      this.props.pause();
      setTimeout(() => {
        this.props.fade();
      }, 300);
      setTimeout(() => {
        this.props.hide();
        this.props.reset();
      }, 600);
    }

    this.setState({
      lastPercent: stop ? 100 : 0,
      transition: true,
    });
  }

  calculatePercent = (targetElement, clickedX) => {
    const range = targetElement.offsetWidth;
    const offsetClicked = clickedX - this.state.startX;
    const percentClicked = (offsetClicked / range) * 100;

    if (percentClicked > 100) {
      return 100;
    } else if (percentClicked < 0) {
      return 0;
    }

    return percentClicked;
  }

  playerStyle = () =>
    ({
      left: `${this.state.lastPercent}%`,
    });


  fadeClass = () => {
    const { visibility } = this.props.audio;
    if (visibility === "fade") {
      return css(Styles["mini-player-fade"]);
    }
    return undefined;
  }

  render() {
    const { playing } = this.props.audio;
    const { album } = playing;
    const { images } = album.content;
    const smallImage = _.find(images, image => {
      if (image.fileLabel && image.size) {
        return image.fileLabel === "1:1" && image.size === "small";
      }
      return image.size === "small";
    });

    const bgImageStyle = {
      backgroundImage: `url(${smallImage.url})`,
    };

    return (
      <div className={this.fadeClass()}>
        <div
          className={this.stopClasses()}
          style={{ left: `${-(100 - this.state.lastPercent)}%` }}
        >
          <h6 className={this.stopH6Classes()}>
            Stop Audio
            <i className={this.stopH6IconClasses()} />
          </h6>
        </div>
        {/* eslint-disable */}
        <div
          onClick={this.openFullPlayer}
          className={this.props.theme || this.layoutClasses()}
          onTouchStart={this.touchStart}
          onTouchMove={this.touchMove}
          onTouchEnd={this.touchEnd}
          style={this.playerStyle()}
        >
        {/* eslint-enable */}
          <div
            className={this.albumClasses()}
            style={bgImageStyle}
          />
          <div className="plain floating__item six-eighths truncate">
            <h6 className="display-block text-dark-secondary flush">
              {playing.track.title}
            </h6>
            <h7 className="flush text-dark-tertiary">
              {this.getArtistLine()}
            </h7>
          </div>
          <AudioControls
            audio={this.props.audio}
            isLight
          />
        </div>
      </div>
    );
  }
}

const map = ({ audio }) => ({ audio });

const withRedux = connect(map, audioActions);

export default withRedux(MiniPlayerWithoutData);

export {
  MiniPlayerWithoutData,
  map,
  withRedux,
};
