import PropTypes from "prop-types";
import React from "react";
import { css } from "aphrodite";

import NavLink from "./Link";
import styles from "./nav-css";

export default class NavLayout extends React.Component {

  static propTypes = {
    classes: PropTypes.string,
    bgColor: PropTypes.string,
    fgColor: PropTypes.string,
    reset: PropTypes.func,
    path: PropTypes.string,
    theme: PropTypes.string,
    links: PropTypes.array,
    modal: PropTypes.object,
    handleAction: PropTypes.func,
    liked: PropTypes.object,
  }

  layoutClasses = () => {
    let classes = [
      // "background--dark-primary",
      "one-whole",
      "floating",
      "soft-half",
      "locked-left",
      "locked-bottom",
      "hard-ends@palm",
      "hard-sides@palm-wide-and-up",
      "soft-half-top@palm-wide-and-up",
    ];


    if (this.props.classes) {
      classes = classes.concat(this.props.classes);
    } else {
      classes.push(css(styles["nav-bar"]));
    }

    if (
      this.props.bgColor !== "transparent" &&
      this.props.fgColor === "light"
    ) {
      classes.push(css(styles["nav-bar-border"]));
    }

    return classes.join(" ");
  }

  isLiked = () => {
    if (typeof window !== "undefined" && window != null) {
      const urlParts = window.location.pathname.split("/");
      const entryId = urlParts[urlParts.length - 1];
      return _.contains(this.props.liked.likes, String(entryId));
    }

    return false;
  }

  render() {
    const { handleAction, reset, path } = this.props;
    return (
      <section
        className={this.props.theme || this.layoutClasses()}
        style={{
          backgroundColor: this.props.bgColor,
        }}
      >
        {this.props.links.map((item, i) => (
          <NavLink
            navItem={item}
            key={i}
            handleAction={handleAction}
            reset={reset}
            modal={this.props.modal}
            liked={this.isLiked()}
            path={path}
            fgColor={this.props.fgColor}
          />
        ))}
      </section>
    );
  }
}
