import { PropTypes } from "react";

import { Switch } from "../../components/controls";

const FollowingItem = ({ item, changed, switchId, active }) => (
  <div className="push-left soft-ends soft-right text-left floating outlined--light outlined--bottom">
    <h6 className="soft-half-left three-quarters flush floating__item">{item}</h6>
    <Switch
      id={switchId}
      containerClasses="one-quarter floating__item"
      containerStyle={{ marginTop: "-12px" }}
      changed={changed}
      active={active}
    />
  </div>
);

FollowingItem.propTypes = {
  item: PropTypes.string.isRequired,
  changed: PropTypes.func.isRequired,
  switchId: PropTypes.number.isRequired,
  active: PropTypes.bool.isRequired,
};

export default FollowingItem;

