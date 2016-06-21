
import { Component, PropTypes } from "react"
import { connect } from "react-redux"

import Helpers from "app/client/helpers"
import headerActions from "apollos/core/store/header"

import { Players } from "app/client/libraries"
import AudioControls from "./audio.Controls"
import AudioTitle from "./audio.Title"
import Track from "./audio.Track"

import Styles from "./audio.styles.fullPlayer";

const mapStateToProps = (state) => {
  return {
    ...state.audio,
    header: state.header,
  };
};

@connect(mapStateToProps)
export default class FullPlayer extends Component {

  state = {
    isShort: false,
    hadHeader: true,
  }

  componentWillMount() {
    this.props.dispatch(headerActions.hide({statusBar: false}));
    this.setState({
      hadHeader: this.props.header.visible,
    });
  }

  componentWillUnmount() {
    this.props.dispatch(headerActions.show({visible: this.state.hadHeader, statusBar: true}));
  }

  componentDidMount() {
    const artworkContainer = this.refs.artworkContainer;
    const artwork = this.refs.artwork;
    this.setState({
      isShort: artworkContainer.clientWidth > artworkContainer.clientHeight
    });
  }

  getArtworkStyles = (album) => {
    const artworkContainer = this.refs.artworkContainer;
    let styles = Helpers.backgrounds.styles(album);

    if(this.state.isShort) {
      styles.height = `${artworkContainer.clientHeight}px`;
      styles.backgroundSize = "contain";
      styles.backgroundColor = "transparent";
    }

    return styles;
  };

  getArtworkClasses = (album) => {
    let classes = [
      "one-whole",
      "overlay--gradient",
      "background--fill",
      Helpers.collections.classes(album)
    ];

    if(!this.state.isShort) {
      classes.push("ratio--square");
    }

    return classes.join(" ");
  };

  getArtworkContainerStyles = () => {
    let styles = {};

    if(this.state.isShort) {
      styles.height = "100%";
      styles.backgroundImage = `
        url('${this.getImage(this.props.playing.album, { blurred: true })}')
      `;
      styles.paddingTop = "10px";
      styles.paddingBottom = "10px";
      styles.backgroundSize = "cover";
    }

    return styles;
  };

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

          <section
            ref="artworkContainer"
            className="hard"
            style={this.getArtworkContainerStyles()}>
            <div
              ref="artwork"
              className={this.getArtworkClasses(album)}
              style={this.getArtworkStyles(album)}>
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
