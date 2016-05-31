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
      <div
        className="background--fill overlay--gradient ratio--landscape floating"
        style={Helpers.backgrounds.styles(series, { label: "2:1" })}>
        {/*<i className="text-light-primary plain floating__item overlay__item icon-play h1"></i>*/}
        <div style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            width: "100%",
            zIndex: "10"
          }}>
          <Video
            id={sermon.content.ooyalaId}
            ref="video"
          />
        </div>


      </div>
    );

  }

}
