
import PropTypes from "prop-types";
import { Component } from "react";
import { connect } from "react-redux";

import { audio as audioActions } from "../../../../data/store";

class VideoPlayerWithoutData extends Component {

  static propTypes = {
    id: PropTypes.string.isRequired,
    hide: PropTypes.bool,
    success: PropTypes.func,
    style: PropTypes.object,
    audioState: PropTypes.string,
    dispatch: PropTypes.func,
    autoplay: PropTypes.bool,
    // color: PropTypes.string
  }

  static defaultProps = {
    autoplay: true,
  }

  state = {
    hide: this.props.hide || false,
  }

  componentDidMount() {
    this.createPlayer(this.props.id, this.props.success);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.id !== nextProps.id) {
      this.player.setEmbedCode(nextProps.id);
    }

    const { audioState } = nextProps;
    if (
      (audioState === "playing" || audioState === "loading") &&
      (
        this.props.audioState !== "loading" &&
        this.props.audioState !== "playing"
      )
    ) {
      if (this.player) this.player.pause();
    }
  }

  componentWillUnmount() {
    if (this.player) {
      this.player.destroy();
    }
  }


  getDivId = () => (`ooyala-player-${this.props.id}`)

  createPlayer = (id, cb) => {
    if ((typeof window !== "undefined" || window !== null) && !window.OO) {
      const callback = () => { this.createPlayer(id, cb); };

      setTimeout(callback, 250);

      return;
    }

    const videoParams = {
      pcode: "E1dWM6UGncxhent7MRATc3hmkzUD",
      playerBrandingId: "ZmJmNTVlNDk1NjcwYTVkMzAzODkyMjg0",
      autoplay: this.props.autoplay,
      skin: {
        config: "/ooyala/skin.new.json",
        // "config": "//player.ooyala.com/static/v4/stable/4.6.9/skin-plugin/skin.json",
        // eslint-disable-next-line max-len
        inline: { shareScreen: { embed: { source: "<iframe width='640' height='480' frameborder='0' allowfullscreen src='//player.ooyala.com/static/v4/stable/4.5.5/skin-plugin/iframe.html?ec=<ASSET_ID>&pbid=<PLAYER_ID>&pcode=<PUBLISHER_ID>'></iframe>" } } },
      },
      onCreate: (player) => {
        if (player.isPlaying()) this.props.dispatch(audioActions.pause());

        // bind message bus for reporting analaytics
        this.messages = player.mb;
        if (cb) {
          cb(this);
        }

        // if (this.props.hide) {
        this.messages.subscribe(OO.EVENTS.PLAYED, "Video", () => {
          this.destroy();
        });

        this.messages.subscribe(OO.EVENTS.PLAY, "Video", () => {
          this.props.dispatch(audioActions.pause());
        });

        this.messages.subscribe(OO.EVENTS.PLAY_FAILED, "Video", () => {
          this.destroy();
        });

        this.messages.subscribe(OO.EVENTS.FULLSCREEN_CHANGED, "Video", () => {
          // ios sets the status bar text color to black
          // when it goes full screen
          if (!player.isFullscreen()) {
            // wait a bit because it doesn't work right away
            setTimeout(() => {
              StatusBar.styleLightContent();
            }, 500);
          }
        });
      },
    };

    OO.ready(() => {
      this.player = OO.Player.create(this.getDivId(), id, videoParams);
    });
  }

  show = () => {
    const playerReady = () => {
      this.setState({ hide: false });
    };

    if ((this.player && this.player.state === "destroyed") || !this.player) {
      this.createPlayer(this.props.id, playerReady);
      return;
    }

    this.props.dispatch(audioActions.pause());
    this.player.play();


    playerReady();
  }

  hide = () => {
    this.player.pause();
    this.setState({ hide: true });
  }

  styles = () => {
    let style = this.props.style;

    if (this.state.hide) {
      style = { ...style,
        ...{
          display: "none",
        },
      };
    }

    return style;
  }


  render() {
    return (
      <div id={this.getDivId()} className="ooyala-player" style={this.styles()} />
    );
  }
}

const map = ({ audio }) => ({ audioState: audio.state });
const withRedux = connect(map);
export default withRedux(VideoPlayerWithoutData);

export {
  VideoPlayerWithoutData,
};
