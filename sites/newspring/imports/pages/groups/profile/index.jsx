import { Component, PropTypes} from "react"
import { connect } from "react-apollo"
import gql from "apollo-client/gql";
import Meta from "apollos/dist/core/components/meta";
// import { nav as navActions } from "apollos/dist/core/store"

const Layout = ({ group, leaders, isLeader }) => (
  <section className="background--light-secondary hard">
    {/* Meta */}
    <Meta title={group.name} image={group.photo} description={group.description} />

    {/* Hero */}
    <div
      className="ratio--landscape@lap-wide-and-up ratio--square background--fill overlay--gradient"
      style={{
        overflow: "visible",
        backgroundImage: `url(${group.photo})`,
        zIndex:10
      }}
    >
      <div className="soft-sides@anchored ratio__item one-whole floating--bottom">
        <div className="floating__item text-left one-whole soft-double-sides@lap-wide-and-up soft-sides soft-double-bottom">
          <h3 className="text-light-primary push-half-bottom">{group.name}</h3>
          <div className="locked">
            {leaders.map((leader, i) => (
              <div
                className="ratio--square round display-inline-block push-right background--fill"
                key={i}
                style={{
                  backgroundImage: `url(${leader.person.photo})`,
                  width: "80px",
                  height: "80px"
                }}
              >
                <div className="ratio__item"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

    {/* Group Leader List*/}
    <div className="push-double-sides@anchored push-half-sides soft-double-top flush-ends card outlined outlined--light">
      <div className="card__item soft">
        <h7 className="text-dark-secondary">
          <small>Group Leaders</small>
        </h7>
        <h5 className="text-dark-secondary soft-half-top">
          {leaders.map((x, i) => {
            let string = `${x.person.nickName || x.person.firstName} ${x.person.lastName}`;
            if (leaders.length - 1 != i) string += ", ";
            return <span key={i}>{string}</span>
          })}</h5>
      </div>
    </div>

    {/* Main card stacks */}
    <section className="soft-double-sides@lap-wide-and-up soft-half-sides soft-half-ends flush-sides">

      {/* Join Group CTA */}
      {/* XXX shows manage group if you are a leader / can manage */}
      <div className="card outlined outlined--light">
        <div className="grid card__item soft ">
          <h5 className="flush-bottom push-half-bottom@handheld push-half-bottom@lap push-half-top grid__item one-half@lap-wide-and-up one-whole text-center@handheld text-center@lap text-dark-secondary">#TheseAreMyPeople</h5>
          <div className="grid__item text-right@lap-wide-and-up text-center one-whole one-half@lap-wide-and-up">
            <button className="flush-bottom push-half-bottom@handheld btn">
              {isLeader ? "Manage" : "Join}"} Group
            </button>
          </div>
        </div>
      </div>

      <div className="card outlined outlined--light hard one-whole">
        <div className="card__item push-half-top@handheld">
          <div className="soft-left@lap-wide-and-up soft soft-double-bottom soft-half-bottom@handheld">

            {/* Group Meeting Schedule */}
            {(() => {
              if (!group.schedule) return null;
              if (!group.schedule.description) return null;
              return (
                <div className="soft-double-bottom@lap-wide-and-up soft-bottom">
                  <h7 className="text-dark-secondary">Time</h7>
                  <h5 className="text-dark-secondary soft-half-top flush-bottom">
                    {group.schedule.description}
                  </h5>
                </div>
              );
            })()}

            {/* Group Location */}
            {(() => {
              if (!group.locations) return null;
              const loc = group.locations[0]
              if (!loc) return null;
              return (
                <div className="soft-double-bottom@lap-wide-and-up soft-bottom">
                  <h7 className="text-dark-secondary">
                    Address {loc.location.distance ? `- ${loc.location.distance.toFixed(2)} miles away`: ""}
                  </h7>
                  <h5 className="text-dark-secondary soft-half-top flush-bottom">
                    {loc.location.city}, {loc.location.state}
                  </h5>
                </div>
              );
            })()}

            {/* Group Information */}
            <div className="soft-double-bottom@lap-wide-and-up soft-bottom">
              <h7 className="text-dark-secondary">Information</h7>
              <h5 className="text-dark-secondary soft-half-top flush-bottom">
                {group.kidFriendly ? "Children Welcome" : "Adults Only"}
                {group.ageRange ? `,${group.ageRange[0]} - ${group.ageRange[1]}` : ""}
              </h5>
            </div>

            {/* Group Description */}
            <div className="soft-double-bottom@lap-wide-and-up soft-bottom">
              <h7 className="text-dark-secondary">Description</h7>
              <h5 className="text-dark-secondary soft-half-top flush-bottom">
                {group.description}
              </h5>
            </div>

            {/* Group Members */}
            <div className="soft-double-bottom@lap-wide-and-up soft-bottom">
              <h7 className="text-dark-secondary">Members</h7>
              <div className="soft-half-top flush-bottom">
                {group.members.map((member, i) => (
                  <div
                    className="ratio--square round display-inline-block push-half-right background--fill"
                    key={i}
                    style={{
                      backgroundImage: `url(${member.person.photo})`,
                      width: "40px",
                      height: "40px"
                    }}
                  >
                    <div className="ratio__item"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="soft-double-bottom@lap-wide-and-up soft-bottom">
              <h7 className="text-dark-secondary">Tags</h7>
              <div className="soft-half-top flush-bottom">
                {group.tags.map((tag, i) => (
                  <span className="tag push-half-right" key={i}>{tag.value}</span>
                ))}
                {(() => {
                  if (!group.type) return null;
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
    </section>
  </section>
)

const mapQueriesToProps = ({ ownProps }) => ({
  data: {
    query: gql`
      query GetGroup($id: ID!) {
        person: currentPerson {
          id
        }
        group: node(id: $id) {
          id
          ... on Group {
            name
            entityId
            type
            demographic
            description
            photo
            kidFriendly
            ageRange
            tags {
              id
              value
            }
            locations {
              location {
                distance
                city
                state
              }
            }
            schedule {
              description
              name
            }
            members {
              role
              person {
                photo
                firstName
                nickName
                lastName
              }
            }
          }
        }
      }
    `,
    variables: { id: ownProps.params.id }
  },
});
const defaultArray = [];
@connect({ mapQueriesToProps })
export default class Template extends Component {
  render () {
    const { data } = this.props;

    if (data.loading) return null;
    const { group, person } = data;
    let isLeader;
    const leaders = group && group.members && group.members
      .filter(x => x.role.toLowerCase() === "leader");

    isLeader = person && leaders.filter(x => x.id === person.id).length;
    group.photo || (group.photo = "//s3.amazonaws.com/ns.assets/apollos/group-profile-placeholder.png");

    return <Layout isLeader={isLeader} group={group} leaders={leaders || defaultArray} />
  }
}
