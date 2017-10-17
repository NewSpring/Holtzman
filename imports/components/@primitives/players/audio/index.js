import PropTypes from "prop-types";
import { Component } from "react";
import { connect } from "react-redux";

import FullPlayer from "./FullPlayer";
import MiniPlayer from "./MiniPlayer";
import AudioPlayerUtility from "./PlayerUtility";

import { actions as audioActions } from "../../../../data/store/audio";
import {
  modal as modalActions,
  nav as navActions,
} from "../../../../data/store";

class AudioPlayerWithoutData extends Component {

  static propTypes = {
    dispatch: PropTypes.func,
    audio: PropTypes.object, // eslint-disable-line
    modal: PropTypes.object, // eslint-disable-line
  }

  componentWillMount() {
    // XXX currently unused
    // Listen for audio commands from the lock screen or command center
    // if (typeof RemoteCommand !== "undefined") {
    //   RemoteCommand.on("command", (command) => {
    //     switch (command) {
    //       case "play":
    //         this.props.dispatch(audioActions.play());
    //         break;
    //       case "pause":
    //         this.props.dispatch(audioActions.pause());
    //         break;
    //       case "nextTrack":
    //         this.props.dispatch(audioActions.next());
    //         break;
    //       case "previousTrack":
    //         this.props.dispatch(audioActions.previous());
    //         break;
    //       default:
    //         break;
    //     }
    //   });
    // }
  }

  componentWillUpdate(nextProps) {
    const nextVis = nextProps.audio.visibility;
    const { visibility } = this.props.audio;

    const expanded = visibility === "expand";
    const expanding = !expanded && nextVis === "expand";

    const modalVis = this.props.modal.visible;
    const modalNextVis = nextProps.modal.visible;

    const modalClosing = modalVis && !modalNextVis;

    const triggerModal = () => {
      this.props.dispatch(modalActions.render(FullPlayer, {
        coverHeader: true,
        audioPlayer: true,
      }));

      // if phone, change to down arrow and make nav transparent
      if (window.isPhone) {
        this.props.dispatch(navActions.setLevel("DOWN"));
        const { isLight } = this.props.audio.playing.album.content;
        // reverse is light so it makes sense for foreground
        const fgColor = isLight ? "light" : "dark";
        this.props.dispatch(navActions.setColor("transparent", fgColor));
      }
    };

    if (expanding) {
      triggerModal();
    }

    if (expanded && modalClosing) {
      if (this.props.modal.retrigger === "FullPlayer") {
        setTimeout(() => {
          triggerModal();
        }, 250);
        this.props.dispatch(modalActions.setRetrigger(null));
      } else {
        this.props.dispatch(audioActions.setVisibility("dock"));
      }
    }
  }

  shouldDisplayMini = () => {
    const { visibility, playing } = this.props.audio;
    const { track } = playing;
    const { file } = track;

    const show = ["dock", "fade"];
    return (show.indexOf(visibility) >= 0 && file);
  };

  render() {
    return (
      <div>
        {(() => {
          if (this.shouldDisplayMini()) {
            return <MiniPlayer {...this.props} />;
          }
          return undefined;
        })()}
        <AudioPlayerUtility />
      </div>
    );
  }
}

const map = ({ audio, modal }) => ({ audio, modal });
const withRedux = connect(map);

export default withRedux(AudioPlayerWithoutData);

export {
  AudioPlayerWithoutData,
};
