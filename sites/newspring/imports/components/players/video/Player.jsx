import { Component, PropTypes } from "react";

import { Video } from "/imports/components/players"
import Helpers from "/imports/helpers"


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
