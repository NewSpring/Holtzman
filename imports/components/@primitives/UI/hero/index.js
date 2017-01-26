import { Component, PropTypes } from "react";

import Split, { Right } from "../../../../components/@primitives/layout/split";
import categories from "../../../../util/categories";
import time from "../../../../util/time";

export default class Hero extends Component {

  static propTypes = {
    item: PropTypes.object.isRequired,
    image: PropTypes.string,
  }

  timeStampStyles = {
    marginTop: "5px",
  }


  render() {
    const heroItem = this.props.item;

    // let iconClasses = "text-light-primary soft-half-right";
    const ready = Object.keys(heroItem).length;

    // if (ready) {
    //   iconClasses += ` ${categories.icon(heroItem)} `;
    // }

    return (
      <Split nav classes={["background--light-primary"]}>
        <Right
          mobile
          background={this.props.image}
          classes={["floating--bottom", "text-left", "background--dark-primary"]}
          ratioClasses={[
            "floating__item",
            "overlay__item",
            "one-whole",
            "soft@lap-and-up",
            "floating--bottom",
            "text-left",
          ]}
          aspect="square"
          link={heroItem.meta.urlTitle}
        >

          <section className="hard">
            <div className="one-whole overlay__item floating__item soft">
              <h3 className="text-light-primary flush soft-half-bottom capitalize">{heroItem.title}</h3>
              <h7 className="text-light-primary text-right float-right" style={this.timeStampStyles}>
                {ready ? time.relative(heroItem) : ""}
              </h7>
            </div>
          </section>

        </Right>
      </Split>
    );
  }

}
