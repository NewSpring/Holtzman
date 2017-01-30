import { Component, PropTypes } from "react";
import { Link } from "react-router";

import categories from "../../../../util/categories";
import time from "../../../../util/time";

export default class Hero extends Component {

  static propTypes = {
    item: PropTypes.object.isRequired,
  }

  timeStampStyles = {
    marginTop: "5px",
  }


  render() {
    const heroItem = this.props.item;
    let backgroundClass;

    let iconClasses = "text-light-primary soft-half-right";
    const ready = Object.keys(heroItem).length;

    if (heroItem.image) {
      backgroundClass = "background--fill overlay--gradient";
    }

    if (ready) {
      iconClasses += ` ${categories.icon(heroItem)} `;
    }

    return (
      <Link
        to={heroItem.meta.urlTitle}
      >
        <section className={`hard floating--bottom text-left background--dark-primary ratio--square ${backgroundClass}`} style={{ backgroundImage: `url('${heroItem.image}')` }}>
          <div className="one-whole overlay__item floating__item soft">
            <h3 className="text-light-primary flush soft-half-bottom capitalize">{heroItem.title}</h3>
            <i className={iconClasses} />
            <h7 className="text-light-primary">{ready ? categories.name(heroItem) : ""}</h7>
            {(heroItem && !heroItem.hideDate) && <h7 className="text-light-primary text-right float-right" style={this.timeStampStyles}>
              {ready ? time.relative(heroItem) : ""}
            </h7>}
          </div>
        </section>
      </Link>
    );
  }

}
