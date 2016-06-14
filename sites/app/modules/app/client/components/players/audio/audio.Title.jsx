import { Component, PropTypes } from "react";

export default class AudioTitle extends Component {

  static propTypes = {
    trackTitle: PropTypes.string.isRequired,
    artistName: PropTypes.string.isRequired,
    albumTitle: PropTypes.string.isRequired,
    isPlaying: PropTypes.bool.isRequired,
    isLight: PropTypes.bool.isRequired
  }

  getTertiaryTextClass = () => {
    return this.props.isLight ? "text-dark-tertiary" : "text-light-tertiary";
  };

  getSecondayTextClass = () => {
    return this.props.isLight ? "text-dark-secondary" : "text-light-secondary";
  };

  render() {

    if (this.props.isPlaying) {
      return (
        <div>
          <h5 className={this.getSecondayTextClass() + " flush"}>
            {this.props.trackTitle}
          </h5>
          <h6 className={this.getTertiaryTextClass() + " push-bottom"}>
            <span className="music-album-artist">
              {this.props.artistName}
            </span>
            <span> - </span>
            <span className="music-album-title">
              {this.props.albumTitle}
            </span>
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
