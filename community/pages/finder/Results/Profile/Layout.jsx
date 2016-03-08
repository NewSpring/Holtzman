import { Component, PropTypes} from "react"
import { Link } from "react-router"
// import { VelocityComponent } from "velocity-react"

import Meta from "../../../../../core/components/meta"

const Layout = ({ group, join, hash }, context) => {

  let leaders = group.members.filter((x) => (x.role.toLowerCase() === "leader"))
  let photo = group.photo ? group.photo : "//s3.amazonaws.com/ns.assets/apollos/group-profile-placeholder.png"
  return (

      <section className="background--light-secondary hard" >
        <Meta title={group.name} image={photo} description={group.description} />

        <div className="ratio--landscape@lap-wide-and-up ratio--square background--fill overlay--gradient" style={{
            overflow: "visible",
            backgroundImage: `url(${photo})`,
            zIndex:10
          }}>
          <div className="soft-sides@anchored ratio__item one-whole floating--bottom">
            <div className="floating__item text-left one-whole soft-double-sides soft-double-bottom">
              <h3 className="text-light-primary push-half-bottom">{group.name}</h3>
              {() => {
                if (leaders.length) {
                  return (
                    <div>
                      <div className="locked">
                        {leaders.map((leader, i) => {
                          return (
                            <div className="ratio--square round display-inline-block push-right background--fill" key={i} style={{
                              backgroundImage: `url(${leader.person.photo})`,
                              width: "80px",
                              height: "80px"
                            }}>
                              <div className="ratio__item"></div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )
                }
              }()}
            </div>
          </div>
        </div>

        <div className="push-double-sides@anchored push-sides soft-double-top flush-ends card outlined outlined--light">
          <div className="card__item soft">
            <h7 className="text-dark-tertiary">
              <small>Group Leaders</small>
            </h7>
            <h5 className="text-dark-tertiary soft-half-top">{
              leaders
                .map((x, i) => {
                  let string = `${x.person.nickName || x.person.firstName} ${x.person.lastName}`

                  if (leaders.length - 1 != i) {
                    string += ", "
                  }

                  return <span key={i}>{string}</span>
                })
            }</h5>
          </div>
        </div>

        <section className="soft-double-sides@anchored soft-half-ends flush-sides">
          <div className="card outlined outlined--light">
            <div className="grid card__item soft ">
              <h5 className="flush-bottom push-half-bottom@handheld push-half-bottom@lap push-half-top grid__item one-half@lap-wide-and-up one-whole text-center@handheld text-center@lap text-dark-secondary">#TheseAreMyPeople</h5>
              <div className="grid__item text-right@lap-wide-and-up text-center one-whole one-half@lap-wide-and-up">
                <button className="flush-bottom push-half-bottom@handheld btn" onClick={join}>
                Join Group
                </button>
              </div>
            </div>
          </div>

          <div className="card outlined outlined--light hard one-whole">
            <div className="card__item push-half-top@handheld">
              <div className="soft-left@lap-wide-and-up soft soft-double-bottom soft-half-bottom@handheld">
                <div className="soft-double-bottom@lap-wide-and-up soft-bottom">
                  <h7 className="text-dark-tertiary">Time</h7>
                  <h5 className="text-dark-tertiary soft-half-top flush-bottom">
                    {group.schedule.scheduleText}
                  </h5>
                </div>

                {() => {
                  if (group.locations && group.locations.length) {
                    let loc = group.locations[0]
                    return (
                      <div className="soft-double-bottom@lap-wide-and-up soft-bottom">
                        <h7 className="text-dark-tertiary">Address {loc.location.distance ? `- ${loc.location.distance.toFixed(2)} miles away`: ""}</h7>
                          <h5 className="text-dark-tertiary soft-half-top flush-bottom">
                            {loc.location.city}, {loc.location.state}
                          </h5>
                      </div>
                    )
                  }
                }()}

                <div className="soft-double-bottom@lap-wide-and-up soft-bottom">
                  <h7 className="text-dark-tertiary">Information</h7>
                  <h5 className="text-dark-tertiary soft-half-top flush-bottom">
                    {group.childCare ? "Children Welcome" : "Adults Only"}
                    {group.age ? `,${group.age[0]} - ${group.age[1]}` : ""}
                  </h5>
                </div>

                <div className="soft-double-bottom@lap-wide-and-up soft-bottom">
                  <h7 className="text-dark-tertiary">Description</h7>
                  <h5 className="text-dark-tertiary soft-half-top flush-bottom">
                    {group.description}
                  </h5>
                </div>

                <div className="soft-double-bottom@lap-wide-and-up soft-bottom">
                  <h7 className="text-dark-tertiary">Members</h7>
                  <div className="soft-half-top flush-bottom">
                    {group.members.map((member, i) => {
                      return (
                        <div className="ratio--square round display-inline-block push-half-right background--fill" key={i} style={{
                          backgroundImage: `url(${member.person.photo})`,
                          width: "40px",
                          height: "40px"
                        }}>
                          <div className="ratio__item"></div>
                        </div>
                      )
                    })}
                  </div>

                </div>

              </div>

            </div>

          </div>





          {/*
            <div className="push-bottom hard">
              <div className="card outlined outlined--light">
                <div className="card__item soft soft-half-bottom">
                  <div className="one-whole text-center soft@handheld soft-sides">
                    <p>
                      <em>
                        <small>
                          If you are the leader of this group, you can manage it <a target="_blank" href={`${Meteor.settings.public.rock.baseURL}groups/leader?GroupId=${group.id}`}>here.</a>
                        </small>
                      </em>
                    </p>
                  </div>

                </div>
              </div>
            </div>
            */}
            <div className="one-whole push-top text-center soft@handheld soft-sides">
              <Link to={`/groups/finder/list/${hash}`} className="btn--small btn--dark-tertiary display-inline-block">
                View All Results
              </Link>
            </div>
        </section>


      </section>
  )
}

Layout.contextTypes = { shouldAnimate: PropTypes.bool };

export default Layout
