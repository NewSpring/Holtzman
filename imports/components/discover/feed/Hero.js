import { Component, PropTypes } from "react";
import { css } from "aphrodite";

import { ImageLoader } from "../../../components/loading";
import LoadingStyles from "../../../components/loading/FeedItemSkeleton-css";

import inAppLink from "../../../util/inAppLink";

export default class DiscoverHero extends Component {

  static propTypes = {
    link: PropTypes.string,
    image: PropTypes.string,
  }

  backgroundStyles = {
    backgroundImage: `url('${this.props.image}')`,
  }

  imageclasses = [
    "background--fill",
    "ratio--square",
    "floating--bottom",
    "floating--left",
  ];

  // context from ImageLoader
  preloader = () => (
    <div className={`${this.imageclasses.join(" ")} ${css(LoadingStyles["load-item"])}`}>
      {this.children}
    </div>
  )

  // context from ImageLoader
  renderElement = () => (
    <div className={this.imageclasses.join(" ")} style={this.backgroundStyles}>
      {this.children}
    </div>
  )

  render() {
    return (
      <div>
        <a
          href={this.props.link}
          onClick={inAppLink}
        >
          <ImageLoader
            src={this.props.image}
            preloader={this.preloader}
            force
            renderElement={this.renderElement}
            imageclasses={this.imageclasses}
          >
            <div className="floating__item soft-left soft-bottom text-light-primary">
              {/* <h4 className="flush">{this.props.topicName}</h4>

                <h7 className="soft-top">
                  {this.props.tags.join(", ")}
                </h7>
                */}
            </div>
          </ImageLoader>
        </a>
      </div>
    );
  }
}
