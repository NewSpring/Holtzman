import { Component, PropTypes } from "react";

export default class AudioTrack extends Component {

  static propTypes = {
    track: PropTypes.object.isRequired,
    play: PropTypes.func.isRequired,
    active: PropTypes.bool.isRequired
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
      "text-left",
      "truncate"
    ];

    if (this.props.active) classes.push("strong");

    return classes.join(" ");
  }

  play = (e) => {
    e.preventDefault();
    if(!this.props.track.file) return

    this.props.play(this.props.track);
  }

  buttonClasses = () => {
    let classes = [
      "plain",
      "one-whole"
    ];

    this.props.track.file ?
      classes.push("text-dark-primary") :
      classes.push("text-light-tertiary");

    return classes.join(" ")
  }

  durationClasses = () => {
    let classes = [
      "soft-half-left",
      "small",
      "italic",
      "text-right"
    ];

    this.props.track.file ?
      classes.push("text-dark-tertiary") :
      classes.push("text-light-tertiary");

    return classes.join(" ");
  }


  render() {

    return (
      <button className={this.buttonClasses()} onClick={this.play}>
        <div className="song-cell soft-half-ends">
          <div className={this.trackClasses()}></div>
          <p className={this.textClasses()}>
            {this.props.track.title}
          </p>
          <p className={this.durationClasses()}>
            {this.props.track.duration}
          </p>
        </div>
      </button>
    );

  }

}
