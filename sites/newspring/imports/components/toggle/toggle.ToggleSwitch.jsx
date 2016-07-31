import { Component, PropTypes } from "react";

export default class ToggleSwitch extends Component {

  static propTypes = {
    followingId: PropTypes.string
  }

  render() {

    const followingId = this.props.followingId;

    return (
      <div className="float-right toggle-wrap floating__item">
        <input className="toggle-switch" type="checkbox" name="toggle-switch" id={followingId}></input>
        <label htmlFor={followingId}></label>
      </div>
    );

  }

}
