import { Component, PropTypes } from "react";
import { connect } from "react-redux"

import ListDetail from "../../../pages/music/music.ListDetail"
import AudioScrubber from "./audio.Scrubber"

import { actions as audioActions } from "/imports/store/audio"
import { modal, nav as navActions } from "apollos-core/dist/core/store"

@connect()
export default class AudioControls extends Component {

  static propTypes = {
    audio: PropTypes.object.isRequired,
    isLight: PropTypes.bool.isRequired
  }

  shuffleClasses = () => {
    let classes = [
      "soft-half-right",
      "flush",
      "h5",
      "icon-shuffle"
    ]
    return classes.join(" ");
  }

  activeShuffleStyles = () => {
    const { isLight } = this.props;
    if (this.props.audio.order === "shuffle") {
      return this.getPrimaryTextColor(!isLight);
    } else {
      return this.getTertiaryTextColor(!isLight);
    }
  };

  repeatClasses = () => {
    const { repeat } = this.props.audio;

    let classes = [
      "flush",
      "h5",
      "icon-repeat"
    ];
    return classes.join(" ");
  };

  repeatIconStyles = {
    top: "-38px",
    position: "relative",
  }

  repeatIcon = () => {
    const { repeat } = this.props.audio;

    let classes = [
      this.getPrimaryTextClass(),
      "h3",
      "push-double-left",
      "soft-left"
    ];
    if (repeat === "repeat") classes.push("icon-repeat-all");
    if (repeat === "repeat-one") classes.push("icon-repeat-one");

    return (
      <i className={classes.join(" ")} onClick={this.repeat} style={this.repeatIconStyles}></i>
    );
  }

  activeRepeatStyles = () => {
    const { repeat } = this.props.audio;
    const { isLight } = this.props;
    if (repeat != "default") {
      return this.getPrimaryTextColor(!isLight);
    } else {
      return this.getTertiaryTextColor(!isLight);
    }
  };

  backClasses = () => {
    return [
      "soft-sides",
      "flush",
      this.getSecondayTextClass(),
      "h3",
      "icon-skip-back"
    ].join(" ");
  };

  nextClasses = () => {
    return [
      "soft-sides",
      "flush",
      this.getSecondayTextClass(),
      "h3",
      "icon-skip-next"
    ].join(" ");
  };

  toggleClasses = (toggleIcon) => {
    return [
      "soft-sides",
      "flush",
      this.getPrimaryTextClass(),
      "h1",
      toggleIcon
    ].join(" ");
  };

  playIconPosition = () => {
    const { state } = this.props.audio;

    if (state != "playing") { return {
      left: "6px",
      position: "relative",

      }
    } else return {
      left: "2px",
      position: "relative",
    }
  }

  toggle = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const { state } = this.props.audio;

    if (state !== "playing") {
      this.props.dispatch(audioActions.play());
      return;
    }

    if (state === "playing") {
      this.props.dispatch(audioActions.pause());
      return;
    }
  };

  next = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.props.dispatch(audioActions.next());
  };

  back = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.props.dispatch(audioActions.previous());
  };

  repeat = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { repeat } = this.props.audio;

    if(repeat === "default") {
      this.props.dispatch(audioActions.repeat());
    }
    else if(repeat === "repeat") {
      this.props.dispatch(audioActions.repeatOne());
    }
    else {
      this.props.dispatch(audioActions.resetRepeat());
    }
  };

  shuffle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { order } = this.props.audio;

    if (order === "shuffle") {
      this.props.dispatch(audioActions.resetOrder());
    } else {
      this.props.dispatch(audioActions.shuffle());
    }
  };

  getTertiaryTextColor = (dark) => {
    return dark ? {color: "rgba(255,255,255,.5)"} : {color: "rgba(0,0,0,.5)"};
  };
  getPrimaryTextColor = (dark) => {
    return dark ? {color: "rgba(255,255,255,1)"} : {color: "rgba(0,0,0,1)"};
  };


  getTertiaryTextClass = () => {
    return this.props.isLight ? "text-dark-tertiary" : "text-light-tertiary";
  };

  getSecondayTextClass = () => {
    return this.props.isLight ? "text-dark-secondary" : "text-light-secondary";
  };

  getPrimaryTextClass = () => {
    return this.props.isLight ? "text-dark-primary" : "text-light-primary";
  };

  listDetail = () => {
    const { album, track } = this.props.audio.playing;

    const trackNumber = album.content.tracks.findIndex(current => current.title === track.title);

    this.props.dispatch(modal.render(ListDetail, {
      color: "background--dark-primary",
      modalBackground: "dark",
      album: album,
      trackNumber: trackNumber,
      style: {
        opacity: .9
      }
    }));
    this.props.dispatch(modal.setRetrigger("FullPlayer"));
    this.props.dispatch(navActions.setColor("#202020", "light"));
  };

  controlGridStyles = {
    maxHeight: "30px"
  }

  playlistControls = () => {
    const showControls = this.props.audio.playing.album.channelName !== "series_newspring";
    if (!showControls) return null;
    const { isLight } = this.props;
    return (
      <div className="grid one-whole flush" style={this.controlGridStyles}>
        <div className="grid__item one-third text-left hard">
          <button className="plain floating__item" onClick={this.shuffle}>
            <i className={this.shuffleClasses()} style={this.activeShuffleStyles()}></i>
          </button>
        </div>
        <div className="grid__item one-third hard-ends hard">
          <button className="plain floating__item" onClick={this.repeat}>
            <i className={this.repeatClasses()} style={this.activeRepeatStyles()}></i>
          </button>
        </div>
        <div className="grid__item one-third text-right hard-sides">
          <h5 onClick={this.listDetail} style={this.getTertiaryTextColor(!isLight)}>
            •••
          </h5>
        </div>
        {this.repeatIcon()}
      </div>
    );
  }

  render() {
    const { state, back, next, visibility } = this.props.audio;
    const isPlaying = state === "playing";
    const toggleIcon = isPlaying ? "icon-pause" : "icon-play";
    const { isLight } = this.props;

    if(visibility === "dock") {
      const classes = [
        "text-center",
        "h4",
        toggleIcon,
        this.getPrimaryTextClass()
      ]

      return (
        <button
          className="plain float-right"
          onClick={this.toggle}
        >
          <i className={classes.join(" ")}></i>
        </button>
      )
    }

    return (
      <div className="floating audio-controls">

        <button className="plain floating__item" onClick={this.back}>
          <i className={this.backClasses()}></i>
        </button>

        <button className="plain floating__item" onClick={this.toggle}>
          <i className={this.toggleClasses(toggleIcon)} style={this.playIconPosition()}></i>
        </button>

        <button className="plain floating__item" onClick={this.next}>
          <i className={this.nextClasses()}></i>
        </button>

        <AudioScrubber
          isLight={this.props.isLight}
        />

        {this.playlistControls()}

      </div>
    );

  }

}
