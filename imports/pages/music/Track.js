
import { Component, PropTypes } from "react";
import { connect } from "react-redux";

import { modal, audio as audioActions } from "../../data/store";
import ListDetail from "./ListDetail";

class AudioTrackWithoutData extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    album: PropTypes.object.isRequired,
    albumTitle: PropTypes.string,
    track: PropTypes.object.isRequired,
    trackNumber: PropTypes.number.isRequired,
    active: PropTypes.bool,
  }

  ListDetail = () => {
    this.props.dispatch(modal.render(ListDetail, {
      modalBackground: "dark",
      album: this.props.album,
      trackNumber: this.props.trackNumber,
      style: {
        opacity: 0.9,
      },
      coverHeader: true,
      coverMiniPlayer: true,
    }));
  }

  // XXX unused
  trackClasses = () => {
    const classes = [
      "background--primary",
      "round",
      "push-half-top",
      "push-half-right",
    ];

    if (this.props.active) classes.push("unread-notification");

    return classes.join(" ");
  }

  // XXX unused
  textClasses = () => {
    const classes = [
      "float-left",
      "truncate",
    ];

    if (this.props.active) classes.push("strong");

    return classes.join(" ");
  }

  play = e => {
    e.preventDefault();
    const index = this.props.trackNumber;

    const track = {
      ...this.props.track,
      ...this.props.album.content.tracks[index],
    };

    if (!track.file) {
      // XXX Do something, probably like telling them they cannot listen
      return;
    }

    this.props.dispatch(audioActions.setPlaying({
      track,
      album: this.props.album,
    }));

    this.props.dispatch(audioActions.setPlaylist(
      this.props.album.content.tracks,
    ));
  }

  render() {
    return (
      <div className="grid floating">
        <p
          onClick={this.play}
          className="grid__item text-left eight-ninths ellipsis push-half-ends"
        >
          {this.props.track.title}
          <span className="text-dark-tertiary display-block small flush">
            {this.props.albumTitle}
          </span>
        </p>
        <span
          onClick={this.ListDetail}
          data-track={this.props.trackNumber}
          className="text-dark-tertiary grid__item one-tenth floating__item"
        >
          •••
        </span>
      </div>
    );
  }

}

export default connect()(AudioTrackWithoutData);

export {
  AudioTrackWithoutData,
};
