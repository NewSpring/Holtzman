import { Component, PropTypes } from "react";

import { Video } from "/imports/components/players"
import Helpers from "/imports/helpers"


export default class StoriesSingleVideoPlayer extends Component {

  static propTypes = {
    story: PropTypes.object.isRequired
  }

  render() {

    const story = this.props.story;

    return (
      <Video
        id={story.content.ooyalaId}
        hide={false}
      />
    );

  }

}
