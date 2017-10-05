import PropTypes from "prop-types";
import { Component } from "react";

import categories from "../../util/categories";
import time from "../../util/time";

export default class HomeHero extends Component {

  static propTypes = {
    item: PropTypes.object.isRequired,
  }

  timeStampStyles = {
    marginTop: "5px",
  }


  render() {
    const heroItem = this.props.item;

    let iconClasses = "text-light-primary soft-half-right";
    const ready = Object.keys(heroItem).length;

    if (ready) {
      iconClasses += ` ${categories.icon(heroItem)} `;
    }

    return (
      <section className="hard">
        <div className="one-whole overlay__item floating__item soft">
          <h3 className="text-light-primary flush soft-half-bottom capitalize">{heroItem.title}</h3>
          <i className={iconClasses} />
          <h7 className="text-light-primary">{ready ? categories.name(heroItem) : ""}</h7>
          <h7 className="text-light-primary text-right float-right" style={this.timeStampStyles}>
            {ready ? time.relative(heroItem) : ""}
          </h7>
        </div>
      </section>
    );
  }

}
