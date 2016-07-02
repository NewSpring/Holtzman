import { Component, PropTypes } from "react"
import { Link } from "react-router"

import Styles from "./series.styles.VideoListItem.css"

import Helpers from "app/client/helpers"

export default class SeriesVideoListItem extends Component {

  static propTypes = {
    sermon: PropTypes.object.isRequired,
    order: PropTypes.number.isRequired
  }

  dynamicWidth = () => {

    if (typeof window != "undefined" || window != null) {
      const itemSize = (window.innerWidth - 40) * 0.8; // four-fifths
      return {
        width: itemSize,
        height: itemSize
      }
    }

    return {

    }

  }

  render() {

    const sermon = this.props.sermon;
    const order = this.props.order;

    return (
      <Link
        to={Helpers.content.links(sermon)}
        className="text-dark-secondary floating ratio--square display-inline-block rounded background--light-tertiary push-right"
        style={this.dynamicWidth()}>
        <div className="one-whole soft-sides text-left floating__item">
          <div className={
            "background--light-primary " + "floating number-styles " + Styles["number-styles"]  
          }>
            <h5 className="floating__item flush">{order + 1}</h5>
          </div>
          <h4>{sermon.title}</h4>
          <i className="soft-half-right icon-category-video"></i>
          <h7>{Helpers.content.speakers(sermon)}</h7>
          <h7 className="push-half-top float-right text-right">{Helpers.time.relative(sermon)}</h7>
        </div>
      </Link>
    );

  }

}
