import { Component, PropTypes } from "react";

import { Video } from "app/client/components/players"
import Helpers from "app/client/helpers"

import Styles from "./series.styles.hero.css"

export default class SeriesHero extends Component {

  state = {
    playing: false
  }

  static propTypes = {
    series: PropTypes.object.isRequired
  }

  backgroundClasses = () => {
    return [
      "one-whole",
      "overlay--gradient",
      "ratio--square",
      "background--fill",
      Helpers.collections.classes(this.props.series)
    ].join(" ")
  }

  iconClasses = () => {
    let classes = [
      "soft-half-right",
      Styles["btn-icon"],
    ];

    return classes.join(" ");
  }

  play = () => {
    if (this.player) {
      this.player.show({play: true})
      this.setState({playing: true})
    } else {
      setTimeout(this.play, 250)
    }


  }

  stop = () => {
    if (this.player) {
      this.player.hide();
    }
    this.setState({playing: false})
  }

  ready = (player) => {
    this.player = player
  }

  button = () => {
    if (this.state.playing) {
      return (
        <button className="btn--light display-block one-whole" onClick={this.stop}>
          <i className={this.iconClasses() + " icon-close"}></i>
          Close The Trailer
        </button>
      )
    }

    return (
      <button className="btn--light display-block one-whole" onClick={this.play}>
        <i className={this.iconClasses() + " icon-play"}></i>
        Watch The Trailer
      </button>
    )
  }

  render() {

    const series = this.props.series;

    return (
      <section className="hard">
        <div className="one-whole ratio--square" style={{
            position: "absolute",
            zIndex: "10"
          }}>
          <div className="ratio__item">
            <Video
              id={series.content.ooyalaId}
              ref="video"
              success={this.ready}
              hide={true}
            />
          </div>
        </div>
        <div
          className={this.backgroundClasses()}
          style={Helpers.backgrounds.styles(series)}>
          <div className="overlay__item text-light-primary soft-sides push-top">
            {this.button()}
          </div>
        </div>
      </section>
    );
  }
}
