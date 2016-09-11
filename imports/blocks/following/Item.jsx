import { Component, PropTypes } from "react";

import { Switch } from "../../components/controls"

export default class FollowingItem extends Component {

  static propTypes = {
    item: PropTypes.string.isRequired,
    changed: PropTypes.func.isRequired,
    switchId: PropTypes.number.isRequired,
    active: PropTypes.bool.isRequired
  }

  render() {

    return (
      <div className="push-left soft-ends soft-right text-left floating outlined--light outlined--bottom">
        <h6 className="soft-half-left three-quarters flush floating__item">{this.props.item}</h6>
        <Switch
          id={this.props.switchId}
          containerClasses="one-quarter floating__item"
          containerStyle={ { marginTop: "-12px" } }
          changed={this.props.changed}
          active={this.props.active}
        />
      </div>
    );

  }

}
