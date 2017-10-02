import PropTypes from 'prop-types';
import { Component } from "react";

export default class Toggle extends Component {

  static propTypes = {
    id: PropTypes.number.isRequired,
    changed: PropTypes.func.isRequired,
    classes: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
    ]),
    containerClasses: PropTypes.string,
    containerStyle: PropTypes.object, // eslint-disable-line
    theme: PropTypes.string,
    styles: PropTypes.object, // eslint-disable-line
    name: PropTypes.string,
    active: PropTypes.bool,
  }

  layoutClasses = () => {
    let classes = [
      "toggle-switch",
    ];

    if (this.props.classes) {
      classes = classes.concat(this.props.classes);
    }

    return classes.join(" ");
  }

  changed = () => {
    this.props.changed(this.props.id);
  }

  render() {
    const switchId = `switch-${this.props.id}`;

    return (
      <div className={this.props.containerClasses} style={this.props.containerStyle}>
        <input
          className={this.props.theme || this.layoutClasses()}
          styles={this.props.styles || {}}
          type="checkbox"
          name={this.props.name || switchId || "toggle-switch"}
          id={switchId}
          onChange={this.changed}
          checked={this.props.active}
        />
        <label htmlFor={switchId} className="float-right" />
      </div>
    );
  }

}
