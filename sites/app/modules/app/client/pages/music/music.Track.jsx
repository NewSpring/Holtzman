import { Component, PropTypes } from "react";
import ListDetail from "./music.ListDetail"
import { audio as audioActions } from "app/client/actions"
import { connect } from "react-redux"

import { modal } from "apollos/core/store"

@connect()
export default class AudioTrack extends Component {

  static propTypes = {
    track: PropTypes.object.isRequired
  }

  ListDetail = (event) => {
    this.props.dispatch(modal.render(ListDetail, {
      modalBackground: "dark",
      album: this.props.album,
      trackNumber: this.props.trackNumber,
      style: {
        opacity: .9
      },
      coverMiniPlayer: true
    }));
  }

  trackClasses = () => {
    let classes = [
      "background--primary",
      "round",
      "push-half-top",
      "push-half-right"
    ];

    if (this.props.active) classes.push("unread-notification");

    return classes.join(" ")
  }

  textClasses = () => {
    let classes = [
      "float-left",
      "truncate"
    ];

    if (this.props.active) classes.push("strong");

    return classes.join(" ");
  }

  play = (e) => {
    e.preventDefault();
    const index = this.props.trackNumber - 1;

    const track = {
      ...this.props.track,
      ...this.props.album.tracks[index]
    };

    if(!track.file) {
      // XXX Do something, probably like telling them they cannot listen
      console.log("No file to play!");
      return;
    }

    this.props.dispatch(audioActions.setPlaying({
      track,
      album: this.props.album
    }));

    this.props.dispatch(audioActions.setPlaylist(
      this.props.album.tracks
    ));
  }

  render() {
    return (
      <div className="grid floating">
        <p onClick={this.play} className="grid__item text-left eight-ninths ellipsis push-half-ends">
          {this.props.track.title}
          <span className="text-dark-tertiary display-block small flush">
            {this.props.albumTitle}
          </span>
        </p>
        <span onClick={this.ListDetail} data-track={this.props.trackNumber} className="text-dark-tertiary grid__item one-tenth floating__item">
          •••
        </span>
      </div>
    );

  }

}
