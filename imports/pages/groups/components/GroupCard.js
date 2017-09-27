import PropTypes from 'prop-types';
import truncate from "truncate";
import { withRouter } from "react-router";

import SideBySide from "../../../components/@primitives/UI/cards/SideBySideCard";

import Tag from "../../../components/@primitives/UI/tags";

export const GroupCardWithoutData = ({ group, router, onHover }) => {
  const theGroup = group || {};

  return (
    <button
      onMouseOver={onHover}
      id={theGroup.id}
      onClick={() => router.push(`/groups/${theGroup.id}`)}
      className="relative one-whole push-bottom@lap-and-up plain"
    >
      <SideBySide
        defaultImage={
          theGroup.photo ?
            theGroup.photo :
            "//s3.amazonaws.com/ns.assets/apollos/group-profile-placeholder.png"
        }
        left={["one-whole", "two-thirds@lap-and-up"]}
        right={["one-whole", "one-third@lap-and-up"]}
      >
        {/* Name */}
        <h4 className="plain text-dark-primary push-half-top push-top@anchored">
          {theGroup.name}
        </h4>

        {/* Schedule */}
        {theGroup.schedule && theGroup.schedule.description && (
          <h6 className="plain text-dark-tertiary">
            {theGroup.schedule.description}
          </h6>
        )}

        {/* Distance */}
        {theGroup.distance && (
          <h6 className="em text-dark-tertiary push-half-bottom">
            {theGroup.distance.toFixed(2)} miles away
          </h6>
        )}


        {/* Description */}
        <p className="plain text-dark-primary">{truncate(theGroup.description, 120)}</p>

        {/* Tags */}
        <div className="soft-half-top">
          {theGroup.tags && theGroup.tags.filter(x => x).map((tag, i) => (
            <Tag val={tag.value} key={i} />
          ))}

          {theGroup.type && theGroup.type !== "Interests" && <Tag val={theGroup.type} />}

          {theGroup.kidFriendly && <Tag val="kid friendly" />}

          {theGroup.demographic && <Tag val={group.demographic} />}

          {group.campus && group.campus.name && <Tag val={group.campus.name} urlKey="campus" />}

        </div>

      </SideBySide>
    </button>
  );
};

GroupCardWithoutData.propTypes = {
  group: PropTypes.object,
  router: PropTypes.object,
  onHover: PropTypes.func,
};

export default withRouter(({ group, router, onHover }) => (
  <GroupCardWithoutData group={group} router={router} onHover={onHover} />
));

