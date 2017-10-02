/* eslint-disable import/imports-first */

import PropTypes from 'prop-types';

import { Component } from "react";
import { css } from "aphrodite";

let velocity = () => {};
if (Meteor.isClient) {
  // eslint-disable-next-line no-unused-vars
  velocity = require("velocity-animate");
}

import { routeActions } from "../../../data/store/routing";
import styles from "./nav-css";

export default class NavLink extends Component {

  static propTypes = {
    navItem: PropTypes.object.isRequired,
    fgColor: PropTypes.string,
    reset: PropTypes.func.isRequired,
    handleAction: PropTypes.func.isRequired,
  }

  linkClasses = () => {
    const { navItem } = this.props;

    const classes = [
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
      classes.push("text-brand");
    }


    return classes.join(" ");
  }

  containerClasses = () => {
    const classes = [
      "floating",
      "locked-ends@palm",
      "locked-sides@palm",
    ];

    return classes.join(" ");
  }

  handleAction = (e) => {
    e.preventDefault();
    const { navItem } = this.props;

    this.props.reset();

    if (navItem.action && typeof navItem.action === "function") {
      this.props.handleAction(navItem.action);
      return;
    }

    if (navItem.link && (window.location.search || navItem.link !== window.location.pathname)) {
      const navigate = () => (
        routeActions.push(navItem.link)
      );
      this.props.handleAction(navigate);
      return;
    }

    // XXX this was making the nav jump since its in the body...
    if (navItem.link && (navItem.link === window.location.pathname)) {
      const containers = document.querySelectorAll("[data-status-scroll=\"true\"]");
      if (containers && containers.length) {
        // eslint-disable-next-line no-undef
        velocity(containers[0], "scroll", {
          duration: 350,
          easing: "ease-in",
          offset: -80,
        }); // smooth scroll to the top
      }
    }
  }

  render() {
    let icon = this.props.navItem.icon;
    if (
      this.props.navItem.isActive &&
      this.props.navItem.isActive(this.props) &&
      this.props.navItem.activeIcon
    ) {
      icon = this.props.navItem.activeIcon;
    }

    const iconClasses = `${icon} display-block ${css(styles.i)}`;
    const { navItem } = this.props;

    const itemStyle = {};
    if (process.env.NATIVE && icon === "icon-groups") {
      itemStyle.fontSize = "2.5em";
      itemStyle.lineHeight = "1.35em";
    }
    if (process.env.WEB && icon === "icon-groups") {
      itemStyle.fontSize = "2.5em";
      itemStyle.lineHeight = ".5em";
      itemStyle.marginTop = "-9px";
    }
    if (process.env.NATIVE && icon === "icon-share") {
      itemStyle.lineHeight = "1.5em";
    }

    let containerStyles = {};
    if (process.env.WEB) {
      containerStyles = { paddingTop: "4px" };
    }
    if (process.env.NATIVE) {
      containerStyles = { paddingBottom: "3px" };
    }


    const active = navItem.isActive && navItem.isActive(this.props);
    return (
      <button
        className={this.linkClasses()}
        onClick={this.handleAction}
        style={{ minHeight: "50px" }}
      >
        <div className={this.containerClasses()} style={containerStyles}>
          <div className="floating__item">
            <i className={iconClasses} style={itemStyle} />
            {(() => {
              if (navItem.label && process.env.WEB) {
                return (
                  <h7 className="display-block">
                    <small
                      className={`text-center ${active ? "text-brand" : "text-light-primary"}`}
                    >
                      {navItem.label}
                    </small>
                  </h7>
                );
              }
              return null;
            })()}

          </div>

        </div>
      </button>
    );
  }
}
