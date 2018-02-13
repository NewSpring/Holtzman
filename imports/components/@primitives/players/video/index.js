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
  };

  static defaultProps = {
    autoplay: true,
  };

  state = {
    hide: this.props.hide || false,
  };

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
      (this.props.audioState !== "loading" && this.props.audioState !== "playing")
    ) {
      if (this.player) this.player.pause();
    }
  }

  componentWillUnmount() {
    if (this.player) {
      this.player.remove();
    }
  }

  createPlayer = (id, cb) => {
    if ((typeof window !== "undefined" || window !== null) && !window.Wistia) {
      const callback = () => {
        this.createPlayer(id, cb);
      };

      setTimeout(callback, 250);
    }

    if (cb) {
      cb(this);
    }
  };

  show = () => {
    this.props.dispatch(audioActions.pause());
    this.setState({ hide: false });
  };

  hide = () => {
    this.setState({ hide: true });
  };

  styles = () => {
    let style = this.props.style;

    if (this.state.hide) {
      style = {
        ...style,
        ...{
          display: "none",
        },
      };
    }

    style = {
      ...style,
      ...{
        padding: "56.25% 0 28px 0",
        position: "relative",
      },
    };

    return style;
  };

  render() {
    return (
      <div className="wistia_responsive_padding" style={this.styles()}>
        <div
          className="wistia_responsive_wrapper"
          style={{ height: "100%", left: "0", position: "absolute", top: "0", width: "100%" }}
        >
          <div
            className={`wistia_embed wistia_async_${this.props.id} videoFoam=true autoplay=${
              this.props.autoplay
            }`}
            style={{ height: "100%", width: "100%" }}
          >
            &nbsp;
          </div>
        </div>
      </div>
    );
  }
}

const map = ({ audio }) => ({ audioState: audio.state });
const withRedux = connect(map);
export default withRedux(VideoPlayerWithoutData);

export { VideoPlayerWithoutData };
