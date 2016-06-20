import { Component, PropTypes } from "react";

import { Video } from "app/client/components/players"
import Helpers from "app/client/helpers"


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
