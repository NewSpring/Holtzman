import { Component, PropTypes } from "react"
import { connect } from "react-redux"

import FullPlayer from "./audio.FullPlayer"
import MiniPlayer from "./audio.MiniPlayer"
import AudioPlayerUtility from "./audio.PlayerUtility"

import { audio as audioActions } from "/imports/store/audio"
import { modal, nav as navActions } from "apollos/dist/core/store"

const mapStateToProps = (state) => {
  return {
    audio: state.audio,
    modal: state.modal
  };
};

@connect(mapStateToProps)
export default class AudioPlayer extends Component {

  componentWillMount() {
    // Listen for audio commands from the lock screen or command center
    if (typeof RemoteCommand !== "undefined") {
      RemoteCommand.on("command", (command) => {
        switch(command) {
          case "play":
            this.props.dispatch(audioActions.play());
            break;
          case "pause":
            this.props.dispatch(audioActions.pause());
            break;
          case "nextTrack":
            this.props.dispatch(audioActions.next());
            break;
          case "previousTrack":
            this.props.dispatch(audioActions.previous());
            break;
        }
      });
    }
  }

  componentWillUpdate(nextProps) {
    const nextVis = nextProps.audio.visibility;
    const { visibility } = this.props.audio;

    const expanded = visibility === "expand"
    const expanding = !expanded && nextVis === "expand";

    const modalVis = this.props.modal.visible;
    const modalNextVis = nextProps.modal.visible;

    const modalClosing = modalVis && !modalNextVis;

    const { current } = this.props.modal;

    const triggerModal = () => {
      this.props.dispatch(modal.render(FullPlayer, { coverHeader: true, audioPlayer: true }));
      this.props.dispatch(navActions.setLevel("DOWN"));
      const { isLight } = this.props.audio.playing.album.content;
      // reverse is light so it makes sense for foreground
      const fgColor = isLight === "light" ? "dark" : "light";
      this.props.dispatch(navActions.setColor("transparent", fgColor));
    };

    if( expanding ) {
      triggerModal();
    }

    if( expanded && modalClosing ) {
      if (this.props.modal.retrigger === "FullPlayer") {
        setTimeout(() => {
          triggerModal();
        }, 250);
        this.props.dispatch(modal.setRetrigger(null));
      } else {
        this.props.dispatch(audioActions.setVisibility("dock"));
      }
    }

  };

  shouldDisplayMini = () => {
    const { visibility, playing } = this.props.audio;
    const { track } = playing;
    const { file } = track;

    const show = [ "dock", "fade" ];
    return (show.includes(visibility) && file)
  };

  render () {
    return (
      <div>
        {(() => {
          if(this.shouldDisplayMini()) {
            return <MiniPlayer {...this.props} />
          }
        })()}
        <AudioPlayerUtility />
      </div>
    );
  }
}
