import { Component, PropTypes } from "react";
import { connect } from "react-redux";

import ListDetail from "../../../../pages/music/ListDetail";
import AudioScrubber from "./Scrubber";

import { actions as audioActions } from "../../../../data/store/audio";
import { modal, nav as navActions } from "../../../../data/store";

class AudioControlsWithoutData extends Component {

  static propTypes = {
    audio: PropTypes.object.isRequired, // eslint-disable-line
    isLight: PropTypes.bool.isRequired,
    dispatch: PropTypes.func,
  }

  getTertiaryTextColor = dark =>
    (dark ? { color: "rgba(255,255,255,.5)" } : { color: "rgba(0,0,0,.5)" });

  getPrimaryTextColor = dark =>
    (dark ? { color: "rgba(255,255,255,1)" } : { color: "rgba(0,0,0,1)" });

  getTertiaryTextClass = () =>
    (this.props.isLight ? "text-dark-tertiary" : "text-light-tertiary");

  getSecondayTextClass = () =>
    (this.props.isLight ? "text-dark-secondary" : "text-light-secondary");

  getPrimaryTextClass = () =>
    (this.props.isLight ? "text-dark-primary" : "text-light-primary");

  shuffleClasses = () => {
    const classes = [
      "soft-half-right",
      "flush",
      "h5",
      "icon-shuffle",
    ];
    return classes.join(" ");
  }

  activeShuffleStyles = () => {
    const { isLight } = this.props;
    if (this.props.audio.order === "shuffle") {
      return this.getPrimaryTextColor(!isLight);
    }
    return this.getTertiaryTextColor(!isLight);
  };

  repeatClasses = () => {
    const classes = [
      "flush",
      "h5",
      "icon-repeat",
    ];
    return classes.join(" ");
  };

  repeatIconStyles = {
    top: "-38px",
    position: "relative",
  }

  repeatIcon = () => {
    const { repeat } = this.props.audio;

    const classes = [
      this.getPrimaryTextClass(),
      "h3",
      "push-double-left",
      "soft-left",
    ];
    if (repeat === "repeat") classes.push("icon-repeat-all");
    if (repeat === "repeat-one") classes.push("icon-repeat-one");

    return (
      <i className={classes.join(" ")} onClick={this.repeat} style={this.repeatIconStyles} /> // eslint-disable-line
    );
  }

  activeRepeatStyles = () => {
    const { repeat } = this.props.audio;
    const { isLight } = this.props;
    if (repeat !== "default") {
      return this.getPrimaryTextColor(!isLight);
    }
    return this.getTertiaryTextColor(!isLight);
  };

  listDetail = () => {
    const { album, track } = this.props.audio.playing;

    const trackNumber = album.content.tracks.findIndex(current => current.title === track.title);

    this.props.dispatch(modal.render(ListDetail, {
      color: "background--dark-primary",
      modalBackground: "dark",
      album,
      trackNumber,
      style: {
        opacity: 0.9,
      },
    }));
    this.props.dispatch(modal.setRetrigger("FullPlayer"));
    this.props.dispatch(navActions.setColor("#202020", "light"));
  };

  controlGridStyles = {
    maxHeight: "30px",
  }

  backClasses = () =>
    [
      "soft-sides",
      "flush",
      this.getSecondayTextClass(),
      "h3",
      "icon-skip-back",
    ].join(" ");

  nextClasses = () =>
    [
      "soft-sides",
      "flush",
      this.getSecondayTextClass(),
      "h3",
      "icon-skip-next",
    ].join(" ");

  toggleClasses = toggleIcon =>
    [
      "soft-sides",
      "flush",
      this.getPrimaryTextClass(),
      "h1",
      toggleIcon,
    ].join(" ");

  playIconPosition = () => {
    const { state } = this.props.audio;

    if (state !== "playing") {
      return {
        left: "6px",
        position: "relative",
      };
    }
    return {
      left: "2px",
      position: "relative",
    };
  }

  toggle = e => {
    e.preventDefault();
    e.stopPropagation();
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

  next = e => {
    e.preventDefault();
    e.stopPropagation();
    const { album } = this.props.audio.playing;
    if (album.channelName === "series_newspring") {
      this.props.dispatch(audioActions.seek(0));
    } else {
      this.props.dispatch(audioActions.next());
    }
  };

  back = e => {
    e.preventDefault();
    e.stopPropagation();
    const { album } = this.props.audio.playing;
    if (album.channelName === "series_newspring") {
      this.props.dispatch(audioActions.seek(0));
    } else {
      this.props.dispatch(audioActions.previous());
    }
  };

  repeat = e => {
    e.preventDefault();
    e.stopPropagation();
    const { repeat } = this.props.audio;

    if (repeat === "default") {
      this.props.dispatch(audioActions.repeat());
    } else if (repeat === "repeat") {
      this.props.dispatch(audioActions.repeatOne());
    } else {
      this.props.dispatch(audioActions.resetRepeat());
    }
  };

  shuffle = e => {
    e.preventDefault();
    e.stopPropagation();
    const { order } = this.props.audio;

    if (order === "shuffle") {
      this.props.dispatch(audioActions.resetOrder());
    } else {
      this.props.dispatch(audioActions.shuffle());
    }
  };

  playlistControls = () => {
    const showControls = this.props.audio.playing.album.channelName !== "series_newspring";
    if (!showControls) return null;
    const { isLight } = this.props;
    /* eslint-disable */
    return (
      <div className="grid one-whole flush" style={this.controlGridStyles}>
        <div className="grid__item one-third text-left hard">
          <button className="plain floating__item" onClick={this.shuffle}>
            <i className={this.shuffleClasses()} style={this.activeShuffleStyles()} />
          </button>
        </div>
        <div className="grid__item one-third hard-ends hard">
          <button className="plain floating__item" onClick={this.repeat}>
            <i className={this.repeatClasses()} style={this.activeRepeatStyles()} />
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
    /* eslint-enable */
  }

  render() {
    const { state, visibility } = this.props.audio;
    const isPlaying = state === "playing";
    const toggleIcon = isPlaying ? "icon-pause" : "icon-play";

    if (visibility === "dock") {
      const classes = [
        "text-center",
        "h4",
        toggleIcon,
        this.getPrimaryTextClass(),
      ];

      return (
        <button
          className="plain float-right"
          onClick={this.toggle}
        >
          <i className={classes.join(" ")} />
        </button>
      );
    }

    return (
      <div className="floating audio-controls">

        <button className="plain floating__item" onClick={this.back}>
          <i className={this.backClasses()} />
        </button>

        <button className="plain floating__item" onClick={this.toggle}>
          <i className={this.toggleClasses(toggleIcon)} style={this.playIconPosition()} />
        </button>

        <button className="plain floating__item" onClick={this.next}>
          <i className={this.nextClasses()} />
        </button>

        <AudioScrubber
          isLight={this.props.isLight}
        />

        {this.playlistControls()}

      </div>
    );
  }

}

const withRedux = connect();

export default withRedux(AudioControlsWithoutData);

export {
  AudioControlsWithoutData,
  withRedux,
};
