import { PropTypes } from "react";

const ToggleSwitch = (props) => {
  const followingId = props.followingId;

  return (
    <div className="float-right toggle-wrap floating__item">
      <input className="toggle-switch" type="checkbox" name="toggle-switch" id={followingId} />
      <label htmlFor={followingId} />
    </div>
  );
};

ToggleSwitch.propTypes = {
  followingId: PropTypes.string,
};

export default ToggleSwitch;
