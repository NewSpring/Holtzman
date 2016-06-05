import { Component, PropTypes } from "react";

import { inAppLink } from "apollos/core/util/inAppLink"

export default class RecommendedItem extends Component {

  static propTypes = {
    item: PropTypes.object.isRequired
  }

  backgroundStyles = {
    backgroundImage: `url('${this.props.item.image}')`
  }

  iconClasses = `${this.props.item.icon} soft-half-right`

  render() {
    return (
      <div className="one-whole grid__item">
        <div className="card push-half-bottom">
          <a href={this.props.item.link} onClick={inAppLink} className="plain">
            <div
              className="background--fill card__image rounded-top ratio--landscape"
              style={this.backgroundStyles}
              ></div>
            <div className="card__item outlined--light soft rounded-bottom text-dark-tertiary">
              <h4 className="text-dark-primary">{this.props.item.title}</h4>
              <i className={this.iconClasses}></i>
              <h7>{this.props.item.category}</h7>
              <h7 className="text-right float-right">{this.props.item.time}</h7>
            </div>
          </a>
        </div>
      </div>
    );
  }

}
