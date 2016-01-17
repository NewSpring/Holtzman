import { Component, PropTypes } from "react";

import Styles from "./switch.css"

export default class Swtich extends Component {

  static propTypes = {
    id: PropTypes.string.isRequired
  }

  layoutClasses = () => {
    let classes = [
      Styles[".toggle-switch"]
    ];


    if (this.props.classes) {
      classes.concat(this.props.classes);
    }

    return classes.join(" ");
  }


  render() {

    const id = this.props.id;

    return (
      <div>
        <input
          className={ this.props.theme || this.layoutClasses()}
          styles={this.props.styles || {}}
          type="checkbox"
          name={this.props.name || id || "toggle-switch"}
          id={id}
        />
        <label htmlFor={id}></label>
      </div>
    );

  }

}
