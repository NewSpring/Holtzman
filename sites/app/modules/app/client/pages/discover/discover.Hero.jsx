import { Component, PropTypes } from "react";

import { inAppLink } from "apollos/core/util/inAppLink"

export default class DiscoverHero extends Component {

  static propTypes = {
    link: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    topicName: PropTypes.string.isRequired,
    tags: PropTypes.array.isRequired
  }

  backgroundStyles = {
    backgroundImage: `url('${this.props.image}')`
  }

  render() {
    return (
      <div>
        <a
          href={this.props.link}
          onClick={inAppLink}
          className="overlay--gradient background--fill ratio--landscape
                     floating--bottom floating--left"
          style={this.backgroundStyles}
        >
          <div className="overlay__item floating__item soft-left soft-bottom text-light-primary">
            <h4 className="flush">{this.props.topicName}</h4>
              <h7 className="soft-top">
                {this.props.tags.join(", ")}
              </h7>
          </div>
        </a>
      </div>
    );
  }
}
