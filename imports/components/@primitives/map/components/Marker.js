import PropTypes from 'prop-types';
import { Component } from "react";
import shouldPureComponentUpdate from "react-pure-render/function";

import { base, hover, active } from "./styles";

export default class Marker extends Component {
  static propTypes = {
    // GoogleMap pass $hover props to hovered components
    // to detect hover it uses internal mechanism, explained in x_distance_hover example
    $hover: PropTypes.bool,
    hover: PropTypes.bool,
    active: PropTypes.bool,
    children: PropTypes.any, // eslint-disable-line
  };

  static defaultProps = {};

  shouldComponentUpdate = shouldPureComponentUpdate;

  render() {
    let style = (this.props.$hover || this.props.hover) ? hover : base;

    if (this.props.active) style = active;

    return (
      <div className="relative" style={style}>
        {this.props.children}
      </div>
    );
  }
}
