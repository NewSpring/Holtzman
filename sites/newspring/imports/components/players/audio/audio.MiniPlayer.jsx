import { Component, PropTypes } from "react"
import { connect } from "react-redux"
import { Link } from "react-router"
import { css } from "aphrodite";
import { actions as audioActions } from "/imports/store/audio"
import Helpers from "/imports/helpers"
import AudioPlayerUtility from "./audio.PlayerUtility";
import AudioControls from "./audio.Controls"

import Styles from "./audio.styles.miniPlayer";

// We only care about the audio state
function mapStateToProps(state) {
  return {
    audio: state.audio,
  }
}

@connect(mapStateToProps, audioActions)
export default class MiniPlayer extends Component {

  state = {
    lastPercent: 0,
    startX: 0,
    transition: false,
  };

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
      classes.concat(this.props.classes);
    } else {
      classes.push(css(Styles["mini-player"]));
    }

    if (this.state.transition) {
      classes.push(css(Styles["mini-player-transition"]));
    }

    return classes.join(" ");
  }

  stopClasses = () => {
    let classes = [
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

  stopH6Classes = () => {
    return css(Styles["mini-player-stop-h6"]);
  }

  stopH6IconClasses = () => {
    let classes = [
      "icon-close",
      "display-inline-block",
      "push-half-sides",
      css(Styles["mini-player-stop-h6-icon"]),
    ];
    return classes.join(" ");
  }

  albumClasses = () => {
    let classes = [
      "background--fill",
      "ratio--square",
      "float-left",
      "push-half-right",
      "background--primary",
      "floating__item"
    ]
    classes.push(css(Styles["mini-album-cover"]));

    return classes.join(" ")
  }

  toggle = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const { state } = this.props.audio

    if (state != "playing") {
      this.removeHideTimer()
      this.props.play()
      return
    }

    if (state === "playing") {
      this.startHideTimer()
      this.props.pause()
      return
    }
  }

  removeHideTimer = () => {
    clearInterval(this.timeout)
  }

  startHideTimer = () => {
    this.timeout = setTimeout(() => {
      this.props.pause();
      this.props.hide();
      this.props.reset();
    }, 600000)
  }

  openFullPlayer = () => {
    this.props.dispatch(audioActions.setVisibility("expand"));
  };

  getImage = (images, options = { blurred: false }) => {
    const oneByOne = _.find(images, x => ( x.fileLabel === "1:1" ));
    const blurred = images[1];

    let image;
    if (options.blurred) {
      image = blurred;
    } else if (oneByOne) {
      image = oneByOne;
    } else {
      image = images[0];
    }
    return image.cloudfront && image.cloudfront !== "false" ?
      image.cloudfront :
      image.s3;
  };

  touchStart = (e) => {
    this.setState({
      startX: e.touches[0].clientX,
      transition: false,
    });
  }

  touchMove = (e) => {
    const percent = this.calculatePercent(e.currentTarget, e.touches[0].clientX);
    this.setState({
      lastPercent: percent,
    });
  }

  touchEnd = (e) => {
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
    const percentClicked = offsetClicked / range * 100;

    if (percentClicked > 100) {
      return 100;
    }
    else if (percentClicked < 0) {
      return 0;
    }

    return percentClicked;
  }

  playerStyle = () => {
    return {
      left: `${this.state.lastPercent}%`
    }
  }

  fadeClass = () => {
    const { visibility } = this.props.audio;
    if (visibility === "fade") {
      return css(Styles["mini-player-fade"]);
    }
  }

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

  render () {

    const { state, playing, progress } = this.props.audio;
    const { album, track } = playing;
    const { images } = album.content;
    const playlist = [ track ];

    const bgImageStyle = {
      backgroundImage: 'url(' + this.getImage(images) + ')'
    };

    return (
      <div className={this.fadeClass()}>
        <div
          className={this.stopClasses()}
          style={{ left: `${-(100 - this.state.lastPercent)}%` }}
        >
          <h6 className={this.stopH6Classes()}>
            Stop Audio
            <i className={this.stopH6IconClasses()}></i>
          </h6>
        </div>
        <div
          onClick={this.openFullPlayer}
          className={ this.props.theme || this.layoutClasses() }
          onTouchStart={this.touchStart}
          onTouchMove={this.touchMove}
          onTouchEnd={this.touchEnd}
          style={this.playerStyle()}
        >
          <div
            className={this.albumClasses()}
            style={bgImageStyle}
          ></div>
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
            isLight={true}
          />
        </div>
      </div>
    )
  }
}
