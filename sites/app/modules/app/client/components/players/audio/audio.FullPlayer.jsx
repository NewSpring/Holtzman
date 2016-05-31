
import { Component, PropTypes } from "react"
import { connect } from "react-redux"

import Helpers from "app/client/helpers"

import { Players } from "app/client/libraries"
import AudioControls from "./audio.Controls"
import AudioTitle from "./audio.Title"
import Track from "./audio.Track"

import Styles from "./audio.styles.fullPlayer";

const mapStateToProps = (state) => {
  return {
    ...state.audio
  };
};

@connect(mapStateToProps)
export default class FullPlayer extends Component {

  componentDidMount() {
    const artworkContainer = this.refs.artworkContainer;
    const artwork = this.refs.artwork;

    // please refactor i didn't mean for this
    if (artworkContainer.clientWidth > artworkContainer.clientHeight) {
      artworkContainer.style.height = "100%";
      artworkContainer.style.backgroundImage = `
        url('${this.getImage(this.props.playing.album, { blurred: true })}')
      `;
      artworkContainer.style.paddingTop = "10px";
      artworkContainer.style.paddingBottom = "10px";
      artworkContainer.style.backgroundSize = "cover";
      artwork.style.height = `${artworkContainer.clientHeight}px`;
      artwork.style.backgroundSize = "contain";
      artwork.style.backgroundColor = "transparent";
      artwork.className = artwork.className.replace(/\bratio--square\b/,'');
    }
  }

  getImage = (data, options = { blurred: false }) => {
    const { images } = data.content
    const image = options.blurred ? images[1] : images[0]
    return image.cloudfront && image.cloudfront !== "false" ?
      image.cloudfront :
      image.s3
  }

  toggle = () => {
    const { state } = this.props.audio

    if (!this.props.audio.playing.album.title) {

      const { data } = this.props
      const album = {
        title: data.title,
        image: this.getImage(data),
        blurredImage: this.getImage(data, { blurred: true }),
        id: data.entryId
      }

      this.props.setPlaylist(data.tracks)
      this.props.setPlaying({
        album,
        track: data.tracks[0]
      })

    }

    if (state != "playing") {
      this.props.play()
      return
    }

    if (state === "playing") {
      this.props.pause()
      return
    }

  }

  seek = (e) => {

    const ne = e.nativeEvent;

    const xPosition = ne.clientX;

    // get the correct target
    const width = ne.target.clientWidth;
    const percent = ((width - (width - xPosition))/width) * 100;

    this.props.seek(percent)


  }

  shuffle = () => {
    const { order } = this.props.audio

    if (order === "shuffle") {
      this.props.resetOrder()
      return
    }

    this.props.shuffle()
  }

  repeat = () => {
    const { repeat } = this.props.audio

    if (repeat === "repeat-one") {
      this.props.resetRepeat()
      return
    }

    if (repeat === "repeat") {
      this.props.repeatOne()
      return
    }

    this.props.repeat()

  }

  getImageUrl = (images, blurred = false) => {
    const image = blurred ? images[1] : images[0];

    if( image.cloudfront && image.cloudfront !== "false" ) {
      return image.cloudfront;
    }

    return image.s3;
  };

  hackBackgroundStyles = () => {
    return {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      zIndex: -1
    }
  };

  backgroundClasses = (album) => {
    return [
      "one-whole",
      "overlay--gradient",
      "ratio--square",
      "background--fill",
      Helpers.collections.classes(album)
    ].join(" ")
  }

  render () {

    const { state, playing } = this.props;
    const { album, track } = playing;
    const { images, colors, isLight } = album.content;
    const playlist = [ track ];
    const isLightBool = isLight === "light";

    const bgImageStyle = {
      backgroundImage: 'url(' + this.getImageUrl(images) + ')'
    };

    const bgColorStyle = {
      height: "100%",
    };

    if(colors && colors[0] && colors[0].value) {
      bgColorStyle.backgroundColor = '#' + colors[0].value;
    }

    return (
      <div style={bgColorStyle}>
        <div className={Helpers.collections.classes(album)} style={this.hackBackgroundStyles()}></div>
        <style>{Helpers.styles.overlay(album)}</style>
        <style>{Helpers.collections.backgroundStyles(album)}</style>

        <div className={
          Styles["player-flex"] + " " + Styles["player-container"]
        }>

          <section ref="artworkContainer" className="hard">
            <div
              ref="artwork"
              className={this.backgroundClasses(album)}
              style={Helpers.backgrounds.styles(album)}>
            </div>
          </section>

          <div className={
            "text-center soft-sides " + Styles["player-flex-one"]
          }>

            <AudioTitle
              trackTitle={track.title}
              artistName={track.artist || album.artist || "NewSpring"}
              albumTitle={album.title}
              isPlaying={state != "default"}
              isLight={isLightBool}
            />

            <AudioControls
              audio={this.props}
              isLight={isLightBool}
            />

          </div>

        </div>
      </div>
    )

  }
}
