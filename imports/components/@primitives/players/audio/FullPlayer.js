
import PropTypes from 'prop-types';
import { Component } from "react";
import { connect } from "react-redux";
import { css } from "aphrodite";
import collections from "../../../../util/collections";
import styles from "../../../../util/styles";
import backgrounds from "../../../../util/backgrounds";
import headerActions from "../../../../data/store/header";
import AudioControls from "./Controls";
import AudioTitle from "./Title";
import Styles from "./styles/fullPlayer";

class FullPlayerWithoutData extends Component {

  static propTypes = {
    dispatch: PropTypes.func,
    header: PropTypes.object, // eslint-disable-line
    playing: PropTypes.object, // eslint-disable-line
    audio: PropTypes.object, // eslint-disable-line
    data: PropTypes.object, // eslint-disable-line
    setPlaylist: PropTypes.func,
    setPlaying: PropTypes.func,
    play: PropTypes.func,
    pause: PropTypes.func,
    resetOrder: PropTypes.func,
    shuffle: PropTypes.func,
    resetRepeat: PropTypes.func,
    repeatOne: PropTypes.func,
    state: PropTypes.string,
    repeat: PropTypes.string,
  }

  state = {
    isShort: false,
    hadHeader: true,
  }

  componentWillMount() {
    this.props.dispatch(headerActions.hide({ statusBar: false }));
    this.setState({
      hadHeader: this.props.header.visible,
    });
  }

  componentDidMount() {
    this.setArtworkState();
  }

  componentWillUnmount() {
    this.props.dispatch(headerActions.show({ visible: this.state.hadHeader, statusBar: true }));
  }

  setArtworkState = () => {
    const artworkContainer = this.refs.artworkContainer;
    this.setState({
      isShort: artworkContainer.clientWidth > artworkContainer.clientHeight,
    });
    return null;
  }

  getArtist = () => {
    const { album, track } = this.props.playing;
    return track.artist || album.artist || "NewSpring";
  }

  // XXX unused
  // getImageUrl = (images, blurred = false) => {
  //   const image = blurred ? images[1] : images[0];

  //   return image.url;
  // };


  getArtworkStyles = (album) => {
    const artworkContainer = this.refs.artworkContainer;
    const awStyles = backgrounds.styles(album);

    if (this.state.isShort) {
      awStyles.height = `${artworkContainer.clientHeight}px`;
      awStyles.backgroundSize = "contain";
      awStyles.backgroundColor = "transparent";
    }

    return awStyles;
  };

  getArtworkClasses = (album) => {
    const classes = [
      "one-whole",
      "overlay--gradient",
      "background--fill",
      collections.classes(album),
    ];

    if (!this.state.isShort) {
      classes.push("ratio--square");
    }

    return classes.join(" ");
  };

  getArtworkContainerStyles = () => {
    const awcStyles = {};

    if (this.state.isShort) {
      awcStyles.height = "100%";
      awcStyles.backgroundImage = `
        url('${this.getImage(this.props.playing.album, { blurred: true })}')
      `;
      awcStyles.paddingTop = "10px";
      awcStyles.paddingBottom = "10px";
      awcStyles.backgroundSize = "cover";
    }

    return awcStyles;
  };

  getImage = (data, options = { blurred: false }) => {
    const { images } = data.content;
    const image = options.blurred ? images[1] : images[0];
    return image.url;
  }

  toggle = () => {
    const { state } = this.props.audio;

    if (!this.props.audio.playing.album.title) {
      const { data } = this.props;
      const album = {
        title: data.title,
        image: this.getImage(data),
        blurredImage: this.getImage(data, { blurred: true }),
        id: data.entryId,
      };

      this.props.setPlaylist(data.tracks);
      this.props.setPlaying({
        album,
        track: data.tracks[0],
      });
    }

    if (state !== "playing") {
      this.props.play();
      return;
    }

    if (state === "playing") {
      this.props.pause();
      return;
    }
  }

  shuffle = () => {
    const { order } = this.props.audio;

    if (order === "shuffle") {
      this.props.resetOrder();
      return;
    }

    this.props.shuffle();
  }

  repeat = () => {
    const { repeat } = this.props.audio;

    if (repeat === "repeat-one") {
      this.props.resetRepeat();
      return;
    }

    if (repeat === "repeat") {
      this.props.repeatOne();
      return;
    }

    this.props.repeat();
  }

  hackBackgroundStyles = () =>
    ({
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      zIndex: -1,
    });

  render() {
    const { state, playing } = this.props;
    const { album, track } = playing;
    const { colors, isLight } = album.content;

    const bgColorStyle = {
      height: "100%",
    };

    if (colors && colors[0] && colors[0].value) {
      bgColorStyle.backgroundColor = `#${colors[0].value}`;
    }

    return (
      <div style={bgColorStyle}>
        <div className={collections.classes(album)} style={this.hackBackgroundStyles()} />
        <style>{styles.overlay(album)}</style>
        <style>{collections.backgroundStyles(album)}</style>

        <div
          className={
            `${css(Styles["player-flex"])} ${css(Styles["player-container"])}`
          }
        >

          <section
            ref="artworkContainer"
            className="hard"
            style={this.getArtworkContainerStyles()}
          >
            <div
              ref="artwork"
              className={this.getArtworkClasses(album)}
              style={this.getArtworkStyles(album)}
            />
          </section>

          <div
            className={
              `text-center soft-sides ${css(Styles["player-flex-one"])}`
            }
          >

            <AudioTitle
              trackTitle={track.title}
              artistName={this.getArtist()}
              albumTitle={album.title}
              isPlaying={state !== "default"}
              isLight={isLight}
              channelName={album.channelName}
            />

            <AudioControls
              audio={this.props}
              isLight={isLight}
            />

          </div>

        </div>
      </div>
    );
  }
}

const map = ({ audio, header }) =>
  ({
    ...audio,
    header,
  });

const withRedux = connect(map);

export default withRedux(FullPlayerWithoutData);

export {
  FullPlayerWithoutData,
  map,
  withRedux,
};
