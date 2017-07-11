import { PropTypes } from "react";
import { Link } from "react-router";
import { Meteor } from "meteor/meteor";

import Meta from "../../../components/shared/meta";

const rockUrl = Meteor.settings.public.rock.baseURL;

const Layout = ({ group, leaders, isLeader, join, loginParam }) => (
  <section className="background--light-secondary hard">
    {/* Meta */}
    <Meta
      title={group.name}
      image={group.photo}
      description={group.description}
      id={group.id}
    />

    {/* Hero */}
    <div
      className="ratio--landscape background--fill"
      style={{
        overflow: "visible",
        backgroundImage: `url('${group.photo}')`,
        zIndex: 10,
      }}
    >
      <div className="ratio__item" />
    </div>

    {/* Group Information */}
    <div
      style={{ borderRadius: "0 0 6px 6px" }}
      className={
        "push-double-sides@lap-wide-and-up push-half-sides " +
        "flush-ends card outlined outlined--light"
      }
    >
      <div className="card__item soft">
        <h3 className="text-dark-primary push-half-top push-bottom">{group.name}</h3>

        <h7 className="text-dark-secondary">
          <small>Group Leaders</small>
        </h7>
        <h5 className="text-dark-secondary soft-half-top">
          {leaders.map((x, i) => {
            let string = `${x.person.nickName || x.person.firstName} ${x.person.lastName}`;
            if (leaders.length - 1 !== i) string += ", ";
            return <span key={i}>{string}</span>;
          })}
        </h5>
        {leaders.map((leader, i) => (
          <div
            className="ratio--square round display-inline-block push-right background--fill"
            key={i}
            style={{
              backgroundImage: `url('${leader.person.photo}')`,
              width: "80px",
              height: "80px",
            }}
          >
            <div className="ratio__item" />
          </div>
        ))}
      </div>
    </div>

    {/* Main card stacks */}
    <section
      className="soft-double-sides@lap-wide-and-up soft-half-sides soft-half-ends flush-sides"
    >

      {/* Join Group CTA */}
      {/* shows manage group if you are a leader / can manage */}
      <div className="card outlined outlined--light soft-sides-@lap-and-up">
        <div className="grid card__item soft push-half flush">
          <h4
            className={
              "flush-bottom hard-left push-bottom@handheld push-bottom@lap " +
              "push-half-top grid__item one-half@lap-wide-and-up one-whole " +
              "text-center@handheld text-center@lap text-dark-primary"
            }
          >
            #TheseAreMyPeople
          </h4>
          <div
            className={
              "grid__item hard-left text-right@lap-wide-and-up " +
              "text-center one-whole one-half@lap-wide-and-up"
            }
          >
            {(() => {
              const className = "flush-bottom push-half-bottom@handheld btn";
              if (isLeader) {
                return (
                  <a
                    rel="noopener noreferrer"
                    target="_blank"
                    className={className}
                    href={
                      `${rockUrl}page/521?GroupId=${group.entityId}&${loginParam}`
                    }
                  >
                    Manage Group
                  </a>
                );
              }

              let newloginParam = loginParam;

              if (loginParam) {
                newloginParam = `&${loginParam}`;
              }

              return (
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  className={className}
                  href={
                    `${rockUrl}Workflows/304?Group=${group.guid}${newloginParam}`
                  }
                >
                  Contact
                </a>
              );
            })()}
          </div>
        </div>
      </div>

      {/* General Information */}
      <div className="card outlined outlined--light hard one-whole">
        <div className="card__item push-half-top@handheld">
          <div className="soft-left@lap-wide-and-up soft soft-double-bottom">

            <h5 className="soft-half-ends">Group Details</h5>

            {/* Group Meeting Schedule */}
            {(() => {
              if (!group.schedule) return null;
              if (!group.schedule.description) return null;
              return (
                <div className="soft-bottom">
                  <h7 className="text-dark-secondary">Time</h7>
                  <h6 className="text-dark-secondary soft-half-top flush-bottom">
                    {group.schedule.description}
                  </h6>
                </div>
              );
            })()}

            {/* Group Location */}
            {(() => {
              if (!group.locations) return null;
              const loc = group.locations[0];
              if (!loc) return null;
              return (
                <div className="soft-bottom">
                  <h7 className="text-dark-secondary">
                    Address
                  </h7>
                  <h6 className="text-dark-secondary soft-half-top flush-bottom">
                    {loc.location.city}, {loc.location.state}
                  </h6>
                </div>
              );
            })()}

            {/* Campus  */}
            {(() => {
              if (!group.campus || !group.campus.name) return null;
              return (
                <div className="soft-bottom">
                  <h7 className="text-dark-secondary">
                    Campus
                  </h7>
                  <h6 className="text-dark-secondary soft-half-top flush-bottom">
                    {group.campus.name}
                  </h6>
                </div>
              );
            })()}

            {/* Group Information */}
            <div>
              <h7 className="text-dark-secondary">Information</h7>
              <h6 className="text-dark-secondary soft-half-top flush-bottom">
                {group.kidFriendly ? "Children Welcome" : "Adults Only"}
                {group.ageRange ? `, ${group.ageRange[0]} - ${group.ageRange[1]}` : ""}
              </h6>
            </div>

          </div>
        </div>
      </div>

      {/* More Information */}
      <div className="card outlined outlined--light hard one-whole">
        <div className="card__item push-half-top@handheld">
          <div className="soft-left@lap-wide-and-up soft soft-bottom">

            <h5 className="soft-half-ends">More Information</h5>

            {/* Group Description */}
            <div className="soft-double-bottom@lap-wide-and-up soft-bottom">
              <h7 className="text-dark-secondary">Description</h7>
              <p className="soft-half-top flush-bottom">
                {group.description && group.description.split("\n").map((text, key) => (
                  <span key={key}>
                    {text}
                    <br />
                  </span>
                ))}
              </p>
            </div>

            {/* Group Members */}
            <div className="soft-double-bottom@lap-wide-and-up soft-bottom">
              <h7 className="text-dark-secondary">Members</h7>
              <div className="soft-half-top flush-bottom">
                {group.members.filter((x) => x.person && x.person.photo).map((member, i) => (
                  <div
                    className={
                      "ratio--square round display-inline-block " +
                      "push-half-right background--fill"
                    }
                    key={i}
                    style={{
                      backgroundImage: `url('${member.person.photo}')`,
                      width: "40px",
                      height: "40px",
                    }}
                  >
                    <div className="ratio__item" />
                  </div>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div>
              <h7 className="text-dark-secondary">Tags</h7>
              <div className="soft-half-top flush-bottom">
                {group.tags && group.tags.map((tag, i) => (
                  <span className="tag push-half-right" key={i}>{tag.value}</span>
                ))}
                {(() => {
                  if (!group.type || group.type === "Interests") return null;
                  return <span className="tag push-half-right">{group.type}</span>;
                })()}
                {(() => {
                  if (!group.kidFriendly) return null;
                  return <span className="tag push-half-right">kid friendly</span>;
                })()}
                {(() => {
                  if (!group.demographic) return null;
                  return <span className="tag push-half-right">{group.demographic}</span>;
                })()}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="card outlined outlined--light soft-sides-@lap-and-up push-bottom">
        <div className="card__item soft-double">
          <h4 className=" push-bottom one-whole text-center text-dark-secondary">
            Looking for another group?
          </h4>
          <div className="text-center one-whole">
            <Link
              to="/groups/finder"
              className="flush-bottom push-half-bottom@handheld btn--dark-tertiary"
            >
              Find A Group
            </Link>
          </div>
        </div>
      </div>
    </section>
  </section>
);

Layout.propTypes = {
  group: PropTypes.object.isRequired,
  leaders: PropTypes.array.isRequired,
  isLeader: PropTypes.bool.isRequired,
  join: PropTypes.func.isRequired,
};

export default Layout;
