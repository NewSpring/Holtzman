import PropTypes from "prop-types";
import { Component } from "react";

import ScriptureItem from "./ScriptureItem";

import scriptures from "../../../util/scriptures";

export default class ScriptureWrapper extends Component {

  static propTypes = {
    studyEntry: PropTypes.object.isRequired,
    classes: PropTypes.array,
  }

  getClasses = () => {
    let classes = [
      "hard-sides",
      "hard-top",
      "background--light-primary",
      "soft-sides@palm-wide-and-up",
    ];

    if (this.props.classes) {
      classes = classes.concat(this.props.classes);
    }

    return classes.join(" ");
  }

  render() {
    const studyEntry = this.props.studyEntry;

    // `data-status-scroll-container` is set in the react-swipe-views module
    return (
      <section
        className={this.getClasses()}
        data-status-scroll-item
        data-status-scroll-offset={-50}
      >

        {scriptures.list(studyEntry, { commas: false }).map((scripture, i) => (
          <ScriptureItem scripture={scripture} key={i} />
        ))}

        <p className="small italic push-sides">
          Scripture taken from The Holy Bible, English Standard Version. Copyright &copy;2001 by <a href="http://www.crosswaybibles.org">Crossway Bibles</a>, a publishing ministry of Good News Publishers. Used by permission. All rights reserved. Text provided by the <a href="http://www.gnpcb.org/esv/share/services/">Crossway Bibles Web Service</a>.
        </p>
      </section>
    );
  }
}
