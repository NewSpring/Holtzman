import React, { PropTypes } from "react"
import NavLink from "./nav.link"
import styles from "./nav.css";


class NavLayout extends React.Component {


  layoutClasses = () => {
    let classes = [
      "background--dark-primary",
      "one-whole",
      "floating",
      "soft-half",
      "locked-left",
      "locked-bottom",
      "hard-sides@lap-and-up",
      "soft-half-top@lap-and-up"
    ];

    if (this.props.theme) {
      classes.push(this.props.theme);
    } else {
      classes.push(styles["nav-bar"]);
    }

    return classes.join(" ");
  }

  render () {


    return (
      <section className={ this.props.classes || this.layoutClasses() }>
        {this.props.links.map(function(item, i) {
          return (
            <NavLink navItem={item} key={i} />
          );
        })}
      </section>
    )
  }
}

export default NavLayout;
