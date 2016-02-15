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
      "text-light-primary",
      "floating__item",
      "soft-sides@handheld",
      "soft-half-ends@lap-and-up",
      "one-whole@lap-and-up",
      "plain"
    ];

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

    if (navItem.link) {
      function navigate() {
        return routeActions.push(navItem.link)
      }
      this.props.handleAction(navigate)
    }
  }

  render () {
    const iconClasses = `${this.props.navItem.icon} display-block`;
    let { navItem } = this.props


    return (
      <button
        className={this.linkClasses()}
        onClick={this.handleAction}
        style={{minHeight: "40px"}}
      >
        <div className={`floating ${Styles["locked"]}`} >
          <div className="floating__item">
            <i className={iconClasses}></i>
            {() => {
              if (navItem.label) {
                return (
                  <h7>
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
