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
      <div
        className="background--fill overlay--gradient ratio--landscape floating"
        style={Helpers.backgrounds.styles(story, { label: "2:1" })}>
        <i className="text-light-primary plain floating__item overlay__item icon-play h1"></i>
        <div className="locked locked-ends one-whole" style={{ zIndex: "10" }}>
          <Video id={story.content.ooyalaId} hide={false} />
        </div>
      </div>
    );

  }

}
