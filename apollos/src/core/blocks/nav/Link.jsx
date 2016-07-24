import { Component, PropTypes } from "react";
import ReactDOM from "react-dom";
import { css } from "aphrodite";

import { routeActions } from "../../store/routing";
import styles from "./nav-css";

export default class NavLink extends Component {

  static propTypes = {
    navItem: PropTypes.object.isRequired
  }

  linkClasses = () => {

    const { navItem } = this.props

    let classes = [
      "floating__item",
      "soft-sides@palm",
      "soft-half-ends@palm-wide-and-up",
      "one-whole@palm-wide-and-up",
      "plain",
      css(styles.button),
    ];

    if (this.props.fgColor === "light") {
      classes.push("text-dark-primary");
    } else {
      classes.push("text-light-primary");
    }

    if (navItem.isActive && navItem.isActive(this.props)) {
      classes.push("text-brand")
    }


    return classes.join(" ")
  }

  containerClasses = () => {

    const { navItem } = this.props;

    let classes = [
      "floating",
      "locked-ends@palm",
      "locked-sides@palm",
    ];

    return classes.join(" ");
  }

  handleAction = (e) => {
    e.preventDefault();
    const { navItem } = this.props

    this.props.reset()

    if (navItem.action && typeof navItem.action === "function") {

      this.props.handleAction(navItem.action)
      return
    }

    if (navItem.link && (window.location.search || navItem.link !== window.location.pathname)) {
      function navigate() {
        return routeActions.push(navItem.link)
      }
      this.props.handleAction(navigate)
      return
    }

    // XXX this was making the nav jump since its in the body...
    // if (navItem.link && (navItem.link === window.location.pathname)) {
    //   $("body").velocity("scroll", {
    //     duration: 350,
    //     easing: "ease-in",
    //   }); // smooth scroll to the top
    // }
  }

  render () {
    let icon = this.props.navItem.icon;
    if (
      this.props.navItem.isActive &&
      this.props.navItem.isActive(this.props) &&
      this.props.navItem.activeIcon
    ) {
      icon = this.props.navItem.activeIcon;
    }

    const iconClasses = `${icon} display-block ${css(styles.i)}`;
    let { navItem } = this.props

    let itemStyle = { marginBottom: "-2px" };
    if (process.env.NATIVE && icon === "icon-groups") {
      itemStyle.fontSize = "2.5em";
      itemStyle.lineHeight = "1.5em"
    }
    if (process.env.WEB && icon === "icon-groups") {
      itemStyle.fontSize = "2.5em";
      itemStyle.lineHeight = ".5em"
      itemStyle.marginTop = "-9px"
    }

    let containerStyles = {}
    if (process.env.WEB) {
      containerStyles = { paddingTop: "8px" };
    }

    let active = navItem.isActive && navItem.isActive(this.props);
    return (
      <button
        className={this.linkClasses()}
        onClick={this.handleAction}
        style={{minHeight: "50px"}}
      >
        <div className={this.containerClasses()} style={containerStyles}>
          <div className="floating__item">
            <i className={iconClasses} style={itemStyle}></i>
            {(() => {
              if (navItem.label && process.env.WEB) {
                return (
                  <h7 className="display-block">
                    <small className={`text-center ${active ? "text-brand": "text-light-primary"}`}>{navItem.label}</small>
                  </h7>
                )
              }
            })()}

          </div>

        </div>
      </button>
    )
  }
}
