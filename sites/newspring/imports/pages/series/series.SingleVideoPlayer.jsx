import { Component, PropTypes } from "react";

import { Video } from "/imports/components/players"
import Helpers from "/imports/helpers"


export default class SeriesSingleVideoPlayer extends Component {

  static propTypes = {
    sermon: PropTypes.object.isRequired,
    series: PropTypes.object.isRequired
  }

  render() {

    const { sermon, series } = this.props;
    return (
      <Video
        id={sermon.content.ooyalaId}
        ref="video"
      />
    );

  }

}
