import { Component, PropTypes } from "react";

import { ImageLoader } from "../../../components/loading"
import LoadingStyles from "../../../components/loading/FeedItemSkeleton.css"

export default class DiscoverHero extends Component {

  static propTypes = {
    link: PropTypes.string,
    image: PropTypes.string,
    topicName: PropTypes.string,
    tags: PropTypes.array
  }

  backgroundStyles = {
    backgroundImage: `url('${this.props.image}')`
  }

  imageclasses = [
    "background--fill",
    "ratio--square",
    "floating--bottom",
    "floating--left"
  ];

  // context from ImageLoader
  preloader = () => {
    return (
      <div
        className={`${this.imageclasses.join(" ")} ${LoadingStyles["load-item"]}`}
        >
        {this.children}
      </div>
    );
  }

  // context from ImageLoader
  renderElement = () => {
    return (
      <div
        className={this.imageclasses.join(" ")}
        style={this.backgroundStyles}
        >
        {this.children}
      </div>
    );
  }

  render() {
    return (
      <div>
        <a
          href={this.props.link}
        >
        <ImageLoader
          src={this.props.image}
          preloader={this.preloader}
          renderElement={this.renderElement}
          imageclasses={this.imageclasses}>

            <div className="floating__item soft-left soft-bottom text-light-primary">
              {/*<h4 className="flush">{this.props.topicName}</h4>

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
