import { Component, PropTypes } from "react"
import ReactDom from "react-dom"
import { routeActions } from "../../store/routing"

import Styles from "./nav.css"

export default class NavLink extends Component {

  static propTypes = {
    navItem: PropTypes.object.isRequired
  }


  linkClasses = () => {

    const { navItem } = this.props

    let classes = [
      "floating__item",
      "soft-sides@handheld",
      "soft-half-ends@lap-and-up",
      "one-whole@lap-and-up",
      "plain"
    ];

    if (this.props.fgColor === "light") {
      classes.push("text-light-primary");
    } else {
      classes.push("text-dark-primary");
    }

    if (navItem.isActive && navItem.isActive(this.props)) {
      classes.push("text-brand")
    }


    return classes.join(" ")
  }

  handleAction = (e) => {
    e.preventDefault();
    const { navItem } = this.props

    this.props.reset()

    if (navItem.action && typeof navItem.action === "function") {

      this.props.handleAction(navItem.action)
      return
    }

    if (navItem.link && (navItem.link != window.location.pathname)) {
      function navigate() {
        return routeActions.push(navItem.link)
      }
      this.props.handleAction(navigate)
    }
  }

  render () {
    const iconClasses = `${this.props.navItem.icon} display-block`;
    let { navItem } = this.props

    let itemStyle = {}
    if (Meteor.isCordova) {
      itemStyle = {
        marginTop: "-3px"
      }
    }
    return (
      <button
        className={this.linkClasses()}
        onClick={this.handleAction}
        style={{minHeight: "60px"}}
      >
        <div className={`floating ${Styles["locked"]} soft-half-top@handheld`} >
          <div className="floating__item">
            <i className={iconClasses} style={itemStyle}></i>
            {() => {
              if (navItem.label) {
                return (
                  <h7 className="display-block">
                    <small className="text-center">{navItem.label}</small>
                  </h7>
                )
              }
            }()}

          </div>

        </div>
      </button>
    )
  }
}
