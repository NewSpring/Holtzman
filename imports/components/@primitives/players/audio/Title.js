import PropTypes from 'prop-types';
import { Component } from "react";

export default class AudioTitle extends Component {

  static propTypes = {
    trackTitle: PropTypes.string.isRequired,
    artistName: PropTypes.string.isRequired,
    albumTitle: PropTypes.string.isRequired,
    isPlaying: PropTypes.bool.isRequired,
    isLight: PropTypes.bool.isRequired,
    channelName: PropTypes.string.isRequired,
  }

  getTertiaryTextColor = (dark) =>
    (dark ? { color: "rgba(255,255,255,.5)" } : { color: "rgba(0,0,0,.5)" });

  getTertiaryTextClass = () =>
    (this.props.isLight ? "text-dark-tertiary" : "text-light-tertiary");

  getPrimaryTextClass = () =>
    (this.props.isLight ? "text-dark-primary" : "text-light-primary");

  // show title before artist if sermon
  // else show artist before title
  getArtistLine = () => {
    if (this.props.channelName === "series_newspring") {
      return (
        <div>
          <span className="music-album-title">
            {this.props.albumTitle}
          </span>
          <span> - </span>
          <span className="music-album-artist">
            {this.props.artistName}
          </span>
        </div>
      );
    }
    return (
      <div>
        <span className="music-album-artist">
          {this.props.artistName}
        </span>
        <span> - </span>
        <span className="music-album-title">
          {this.props.albumTitle}
        </span>
      </div>
    );
  };

  render() {
    const { isLight } = this.props;
    if (this.props.isPlaying) {
      return (
        <div>
          <h5 className={`${this.getPrimaryTextClass()} flush`}>
            {this.props.trackTitle}
          </h5>
          <h6 className="push-bottom" style={this.getTertiaryTextColor(!isLight)}>
            {this.getArtistLine()}
          </h6>
        </div>
      );
    }

    return (
      <div>
        <h4>{this.props.albumTitle}</h4>
        <h6 className="text-dark-tertiary flush">
          <span className="music-album-artist">
            {this.props.artistName}
          </span>
        </h6>
      </div>
    );
  }
}
