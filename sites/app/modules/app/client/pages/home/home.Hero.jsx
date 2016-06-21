import { Component, PropTypes } from "react";

import { Collections } from "app/lib/collections";

import Helpers from "app/client/helpers";

export default class HomeHero extends Component {

  static propTypes = {
    item: PropTypes.object.isRequired
  }

  timeStampStyles = {
    marginTop: "5px"
  }

  render() {

    const heroItem = this.props.item;

    let iconClasses = "text-light-primary soft-half-right"
    let ready = Object.keys(heroItem).length

    if (ready) {
      iconClasses += ` ${Helpers.categories.icon(heroItem)} `
    }

    return (
      <section className="hard">
        <div className="one-whole overlay__item floating__item soft">
          <h3 className="text-light-primary flush soft-half-bottom capitalize">{heroItem.title}</h3>
          <i className={iconClasses}></i>
          <h7 className="text-light-primary">{ready ? Helpers.categories.name(heroItem) : ""}</h7>
          <h7 className="text-light-primary text-right float-right" style={this.timeStampStyles}>{ready ? Helpers.time.relative(heroItem) : "" }</h7>
        </div>
      </section>
    );
  }

}
