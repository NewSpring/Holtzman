import { Component, PropTypes } from "react";

import { Switch } from "../../../core/components/controls"

export default class FollowingItem extends Component {

  static propTypes = {
    item: PropTypes.string.isRequired,
    changed: PropTypes.func.isRequired
  }

  render() {

    return (
      <div className="push-left soft-ends soft-right text-left floating outlined--light outlined--bottom">
        <h6 className="soft-half-left three-quarters flush floating__item">{this.props.item}</h6>
        <Switch
          id={this.props.switchId}
          containerClasses="float-right"
          containerStyle={ { marginTop: "-30px" } }
          changed={this.props.changed}
        />
      </div>
    );

  }

}
