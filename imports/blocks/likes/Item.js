import { Component, PropTypes } from "react";
import moment from "moment";
import { Link } from "react-router";
import { css } from "aphrodite";

import LoadingStyles from "../../components/loading/FeedItemSkeleton-css";

import inAppLink from "../../util/inAppLink";

export default class LikesItem extends Component {

  static propTypes = {
    like: PropTypes.object.isRequired,
  }

  // eslint-disable-next-line react/sort-comp
  backgroundStyles = {
    backgroundImage: `url('${this.props.like.image}')`,
  };

  imageclasses = [
    "background--fill",
    "card__image",
    "ratio--landscape",
  ];

  containerClasses = () => {
    const classes = [
      "grid__item",
      "one-whole",
    ];
    if (process.env.NATIVE) {
      classes.push("one-half@palm-wide-and-up");
    }
    return classes.join(" ");
  };

  // context from ImageLoader
  preloader = () => (
    <div
      className={`${this.imageclasses.join(" ")} ${css(LoadingStyles["load-item"])}`}
    >
      {this.children}
    </div>
  )

  // context from ImageLoader
  renderElement = () => (
    <div
      className={this.imageclasses.join(" ")}
      style={this.backgroundStyles}
    >
      {this.children}
    </div>
  )

  onClick = (e) => {
    const targetLink = e.currentTarget.href;
    // direct to in app helper unless it's an internal link
    if (targetLink.match(/^(http|https):\/\/localhost.*/) === null) {
      inAppLink(e);
    }
  }

  getDate(entry) {
    const date = new Date(entry.date);

    const time = moment(date);
    const currentTime = new Date();

    if (date.getUTCFullYear() === currentTime.getUTCFullYear()) {
      return moment(time).format("MMM D");
    }
    return moment(time).format("MMM D, YYYY");
  }

  iconClasses = `${this.props.like.icon} soft-half-right`

  render() {
    const like = this.props.like;

    return (
      <div className={this.containerClasses()}>
        <Link to={like.link} onClick={this.onClick} className="plain">
          <div className="card">
            <div
              className="locked-ends locked-right card__image one-third background--fill"
              style={{ verticalAlign: "middle", backgroundImage: `url('${this.props.like.image}')` }}
            />
            <div className="card__item soft text-dark-tertiary two-thirds push-half-ends">
              <h6 className="text-dark-primary capitalize">{like.title}</h6>
              <i className={this.iconClasses} />
              <h7>{like.category}</h7>
            </div>
          </div>
        </Link>
      </div>
    );
  }

}
