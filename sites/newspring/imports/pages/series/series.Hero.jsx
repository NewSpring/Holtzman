import { Component, PropTypes } from "react";

import { Video } from "/imports/components/players"
import Helpers from "/imports/helpers"

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
      "ratio--landscape@palm-wide",
      "background--fill",
      Helpers.collections.classes(this.props.series)
    ].join(" ")
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
    if (!this.props.series.content.ooyalaId) return null;

    if (this.state.playing) {
      return (
        <button className="btn--light display-inline-block one-whole@palm" onClick={this.stop}>
          <i className="icon-close soft-half-right"></i>
          Close The Trailer
        </button>
      )
    }

    return (
      <button className="btn--light display-inline-block one-whole@palm" onClick={this.play}>
        <i className="icon-play soft-half-right"></i>
        Watch The Trailer
      </button>
    )
  }

  render() {

    const series = this.props.series;
    const imageLabel = window.isTablet ? "2:1" : "1:1";
    return (
      <section className="hard">
        <div className="one-whole ratio--square ratio--landscape@palm-wide" style={{
            position: "absolute",
            zIndex: "10"
          }}>
          <div className="ratio__item">
            {(() => {
              if (!series.content.ooyalaId) return null;
              return (
                <Video
                  id={series.content.ooyalaId}
                  ref="video"
                  success={this.ready}
                  hide={true}
                />
            )
            })()}

          </div>
        </div>
        {(() => {
          if (!series.content.ooyalaId) return null;
          return (
            <Video
              id={series.content.ooyalaId}
              ref="video"
              success={this.ready}
              hide={true}
            />
        )
        })()}
        <div
          className={this.backgroundClasses()}
          style={Helpers.backgrounds.styles(series, imageLabel)}>
          <div className="overlay__item text-light-primary text-center soft-sides push-top">
            {this.button()}
          </div>
        </div>
      </section>
    );
  }
}
