import Truncate from "truncate";
import { withRouter } from "react-router"

import Loading from "apollos/dist/core/components/loading/index";
import SideBySide from "apollos/dist/core/components/cards/SideBySide";

import Tag from "../components/Tag";

export default withRouter(({ group, router, onHover }) => {
  if (!group) group = {};

  return (
    <button
      onMouseOver={onHover}
      id={group.id}
      onClick={() => router.push(`/groups/${group.id}`)}
      className="relative one-whole push-bottom@lap-and-up plain"
    >
      <SideBySide
        defaultImage={group.photo ? group.photo : "//s3.amazonaws.com/ns.assets/apollos/group-profile-placeholder.png" }
        left={["one-whole", "two-thirds@lap-and-up"]}
        right={["one-whole", "one-third@lap-and-up"]}
      >
        {/* Name */}
        <h4 className="plain text-dark-primary push-half-top push-top@anchored">
          {group.name}
        </h4>

        {/* Schedule */}
        {(() => {
          if (!group.schedule || !group.schedule.description) return null;
          return (
            <h6 className="plain text-dark-tertiary">
              {group.schedule.description}
            </h6>
          )
        })()}

        {/* Distance */}
        {(() => {
          if (!group.distance) return null;
          return (
            <h6 className="em text-dark-tertiary push-half-bottom">
              {group.distance.toFixed(2)} miles away
            </h6>
          )
        })()}


        {/* Description */}
        <p className="plain text-dark-primary">{Truncate(group.description, 120)}</p>

        {/* Tags */}
        <div className="soft-half-top">
          {group.tags && group.tags.filter(x => x).map((tag, i) => (
            <Tag val={tag.value} key={i} />
          ))}
          {(() => {
            if (!group.type) return null;
            return <Tag val={group.type} />
          })()}
          {/*{(() => {
            if (!group.kidFriendly) return null;
            return <Tag value="childcare" />
          })()}*/}
          {(() => {
            if (!group.demographic) return null;
            return <Tag val={group.demographic} />
          })()}
        </div>

      </SideBySide>
    </button>
  )
})
