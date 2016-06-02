import { Component, PropTypes } from "react";
import { connect } from "react-redux"

import ListDetail from "../../../pages/music/music.ListDetail"
import AudioScrubber from "./audio.Scrubber"

import { audio as audioActions } from "app/client/actions"
import { modal } from "../../../../../../../../apollos/core/store"

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

    if (this.props.audio.order === "shuffle") {
      classes.push("text-primary");
    } else {
      classes.push(this.getTertiaryTextClass());
    }

    return classes.join(" ");
  }

  repeatClasses = () => {
    let classes = [
      "soft-half-right",
      "flush",
      "h5"
    ];

    const { repeat } = this.props.audio;

    if (repeat != "default") {
      classes.push("text-primary");
    } else {
      classes.push(this.getTertiaryTextClass());
    }

    if (repeat === "repeat") {
      // classes.push("icon-repeat-all")
      // temp until icon is ready
      classes = classes.concat([
        "icon-repeat",
        this.getPrimaryTextClass()
      ])
    } else {
      classes.push("icon-repeat");
    }

    return classes.join(" ");
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
      this.getSecondayTextClass(),
      "h1",
      toggleIcon
    ].join(" ");
  };

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
    let trackNumber = null;
    let index = 1;

    for(let current of album.tracks) {
      if(current.title == track.title) {
        trackNumber = index;
      }

      index++;
    }

    this.props.dispatch(modal.render(ListDetail, {
      color: "background--dark-primary",
      album: album,
      trackNumber: trackNumber,
      style: {
        opacity: .9
      }
    }));
  };

  render() {
    const { state, back, next, visibility } = this.props.audio;
    const isPlaying = state === "playing";
    const toggleIcon = isPlaying ? "icon-pause" : "icon-play";

    if(visibility === "dock") {
      const classes = [
        "text-center",
        "h4",
        toggleIcon,
        this.getSecondayTextClass()
      ]

      return (
        <button
          className="plain float-right"
          onClick={this.toggle}>
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
          <i className={this.toggleClasses(toggleIcon)}></i>
        </button>

        <button className="plain floating__item" onClick={this.next}>
          <i className={this.nextClasses()}></i>
        </button>

        <AudioScrubber
          isLight={this.props.isLight}
        />

        <div className="grid one-whole flush">
          <div className="grid__item one-third text-left hard">
            <button className="plain floating__item" onClick={this.shuffle}>
              <i className={this.shuffleClasses()}></i>
            </button>
          </div>
          <div className="grid__item one-third hard-ends hard">
            <button className="plain floating__item" onClick={this.repeat}>
              <i className={this.repeatClasses()}></i>
            </button>
          </div>
          <div className="grid__item one-third text-right hard-sides">
            <h5 onClick={this.listDetail} className={this.getTertiaryTextClass()}>
              •••
            </h5>
          </div>
        </div>

      </div>
    );

  }

}
