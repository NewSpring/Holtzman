import { Component, PropTypes } from "react";

import { Switch } from "../../../core/components/controls"

export default class FollowingItem extends Component {

  static propTypes = {
    item: PropTypes.object.isRequired
  }

  render() {

    return (
      <div className="push-left soft-ends soft-right text-left floating outlined--light outlined--bottom">
        <h6 className="soft-half-left three-quarters flush floating__item">{this.props.item.name}</h6>
        <Switch id={this.props.item.id} containerClasses="float-right" containerStyle={ { marginTop: "-30px" } } />
      </div>
    );

  }

}
