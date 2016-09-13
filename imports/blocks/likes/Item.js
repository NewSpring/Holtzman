import { Component, PropTypes } from "react";
import Moment from "moment";
import { Link } from "react-router";
import { css } from "aphrodite";

import { ImageLoader } from "../../components/loading";
import LoadingStyles from "../../components/loading/FeedItemSkeleton-css";

import inAppLink from "../../util/inAppLink";

export default class LikesItem extends Component {

  static propTypes = {
    like: PropTypes.object.isRequired
  }

  backgroundStyles = {
    backgroundImage: `url('${this.props.like.image}')`
  }

  imageclasses = [
    "background--fill",
    "card__image",
    "ratio--landscape"
  ];

  containerClasses = () => {
    let classes = [
      "grid__item",
      "one-whole",
    ];
    if (process.env.NATIVE) {
      classes.push("one-half@palm-wide-and-up");
    }
    return classes.join(" ");
  };

  // context from ImageLoader
  preloader = () => {
    return (
      <div
          className={`${this.imageclasses.join(" ")} ${css(LoadingStyles["load-item"])}`}
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

  getDate(entry) {
    let date = new Date(entry.date);

    let time = Moment(date);
    let currentTime = new Date();

    if (date.getUTCFullYear() === currentTime.getUTCFullYear())
      return Moment(time).format("MMM D");
    else
      return Moment(time).format("MMM D, YYYY");
  }

  iconClasses = `${this.props.like.icon} soft-half-right`

  onClick = (e) => {
    const targetLink = e.currentTarget.href;
    // direct to in app helper unless it's an internal link
    if (targetLink.match(/^(http|https):\/\/localhost.*/) === null) {
      inAppLink(e);
    }
  }

  render() {

    const like = this.props.like;

    return (
      <div className={this.containerClasses()}>
        <div className="card">
          <Link to={like.link} onClick={this.onClick} className="plain">
              <ImageLoader
                  src={this.props.like.image}
                  preloader={this.preloader}
                  renderElement={this.renderElement}
                  imageclasses={this.iamgeclasses}
              />
              <div className="card__item soft text-dark-tertiary">
                <h4 className="text-dark-primary capitalize">{like.title}</h4>
                  <i className={this.iconClasses} />
                  <h7>{like.category}</h7>
                <h7 className="text-right float-right">{this.getDate(like)}</h7>
              </div>
          </Link>
        </div>
      </div>
    );
  }

}
