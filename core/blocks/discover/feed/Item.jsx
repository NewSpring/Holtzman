import { Component, PropTypes } from "react";

import { ImageLoader } from "../../../components/loading"
import LoadingStyles from "../../../components/loading/FeedItemSkeleton.css"

import inAppLink from "../../../util/inAppLink"

export default class DiscoverItem extends Component {

  static propTypes = {
    item: PropTypes.object.isRequired
  }

  backgroundStyles = {
    backgroundImage: `url('${this.props.item.image}')`
  }

  imageclasses = [
    "overlay",
    "rounded",
    "background--fill",
    "ratio--landscape",
    "floating--bottom",
    "floating--left",
    "card__image"
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
      <div className="one-whole grid__item push-half-bottom card">
        <a href={this.props.item.link} onClick={inAppLink}>
          <ImageLoader
            src={this.props.item.image}
            preloader={this.preloader}
            renderElement={this.renderElement}
            imageclasses={this.imageclasses}
            force={true}
            >
            <div className="overlay__item floating__item soft-left soft-bottom text-light-primary card__item">
              <h5 className="flush">{this.props.item.topicName}</h5>
              {/* <h7 className="soft-top">{this.props.item.tags.join(", ")}</h7> */}
            </div>
          </ImageLoader>
        </a>
      </div>
    );
  }

}
