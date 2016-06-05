import { Component, PropTypes } from "react"
import { connect } from "react-redux"

import FullPlayer from "./audio.FullPlayer"
import MiniPlayer from "./audio.MiniPlayer"
import AudioPlayerUtility from "./audio.PlayerUtility"

import { audio as audioActions } from "app/client/actions"
import { modal } from "apollos/core/store"

const mapStateToProps = (state) => {
  return {
    audio: state.audio,
    modal: state.modal
  };
};

@connect(mapStateToProps)
export default class AudioPlayer extends Component {

  componentWillUpdate(nextProps) {
    const nextVis = nextProps.audio.visibility;
    const { visibility } = this.props.audio;

    const expanded = visibility === "expand"
    const expanding = !expanded && nextVis === "expand";

    const modalVis = this.props.modal.visible;
    const modalNextVis = nextProps.modal.visible;

    const modalClosing = modalVis && !modalNextVis;

    if( expanding ) {
      this.props.dispatch(modal.render(FullPlayer));
    }

    if( expanded && modalClosing ) {
      this.props.dispatch(audioActions.setVisibility("dock"));
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
