import { Component, PropTypes } from "react";

import Video from "../video"

// XXX Why does this exist?
export default class SingleVideoPlayer extends Component {

  static propTypes = {
    ooyalaId: PropTypes.string.isRequired,
  }

  render() {

    return (
      <Video
        id={this.props.ooyalaId}
      />
    );

  }

}
