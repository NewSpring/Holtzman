import React, { PropTypes } from "react"
import { Link, IndexLink } from "react-router"

export default class NavLink extends React.Component {

  static propTypes = {
    navItem: PropTypes.object.isRequired
  }


  linkClasses(link) {
    let classes = [
      "floating__item",
      "text-light-primary",
      "soft-sides@handheld",
      "soft-half-ends@lap-and-up",
      "plain"
    ];
    return classes.join(" ")
  }

  render () {
    const iconClasses = `${this.props.navItem.icon} display-block`;

    let Wrapper = Link

    if (this.props.navItem.link === "/") {
      Wrapper = IndexLink
    }

    return (
      <Wrapper
        to={this.props.navItem.link}
        className={this.linkClasses(this.props.navItem.link)}
        activeClassName="text-brand">
        <div className="floating__item">
          <i className={iconClasses}></i>
          <h7>
            <small className="text-center">{this.props.navItem.label}</small>
          </h7>
        </div>
      </Wrapper>
    )
  }
}
