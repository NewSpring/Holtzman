import PropTypes from "prop-types";
import React from "react";

export default class FieldSet extends React.Component {
  static propTypes = {
    classes: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
    ]),
    theme: PropTypes.string,
    children: PropTypes.any, // eslint-disable-line
  }

  layoutClasses = () => {
    let classes = [
      "flush-bottom",
    ];

    if (this.props.classes) {
      classes = classes.concat(this.props.classes);
    }

    return classes.join(" ");
  }

  render() {
    return (
      <fieldset className={this.props.theme || this.layoutClasses()}>
        {this.props.children}
      </fieldset>
    );
  }
}
