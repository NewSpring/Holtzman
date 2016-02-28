import { Component, PropTypes} from "react"


const Layout = ({ group, join }) => {

  let leaders = group.members.filter((x) => (x.role.toLowerCase() === "leader"))
  return (
    <section className="background--light-primary hard@handheld hard@lap">

      <div className="ratio--landscape@lap-wide-and-up ratio--square background--fill overlay--gradient push-double-bottom" style={{
          overflow: "visible",
          backgroundImage: `url(${group.photo})`
        }}>
        <div className="ratio__item one-whole floating--bottom">
          <div className="floating__item text-left one-whole soft-double-sides@lap-wide-and-up soft-sides soft-double-bottom">
            <h3 className="text-light-primary push-half-bottom">{group.name}</h3>
            {() => {
              if (leaders.length) {
                return (
                  <div>
                    <h7 className="text-light-primary">
                      <small>Group Leaders</small>
                    </h7>
                    <h6 className="text-light-primary">{
                      leaders
                        .map((x, i) => {
                          let string = `${x.person.nickName || x.person.firstName} ${x.person.lastName}`

                          if (leaders.length - 1 != i) {
                            string += ", "
                          }

                          return <span key={i}>{string}</span>
                        })
                    }</h6>

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

      <section className="hard-sides soft-double-ends">
        <div className="grid">
          <div className="grid__item three-fifths@lap-wide-and-up one-whole">
            <div className="soft-double-left@lap-wide-and-up soft-left soft-double-bottom">
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
          <div className="grid__item two-fifths@lap-wide-and-up one-whole">

            <div className="card outlined outlined--light">
              <div className="card__item soft background--light-secondary">
                <div className="soft-double-bottom@lap-wide-and-up soft-bottom">
                  <h7 className="text-dark-tertiary">Time</h7>
                  <h5 className="text-dark-tertiary soft-half-top flush-bottom">
                    {group.schedule.scheduleText}
                  </h5>
                </div>

                {() => {
                  if (group.locations.length) {
                    let loc = group.locations[0]
                    return (
                      <div className="soft-double-bottom@lap-wide-and-up soft-bottom">
                        <h7 className="text-dark-tertiary">Address                             {loc.location.distance ? `- ${loc.location.distance.toFixed(2)} miles away`: ""}</h7>
                          <h5 className="text-dark-tertiary soft-half-top flush-bottom">
                            {loc.location.city}, {loc.location.state}
                          </h5>
                      </div>
                    )
                  }
                }()}


                <button className="one-whole btn" onClick={join}>
                  Join Group
                </button>
                {/*
                <button className="underlined h7 text-dark-tertiary text-center one-whole soft-half-top">
                  Contact for more details
                </button>
                */}
              </div>


            </div>
          </div>
        </div>
        <div className="one-whole text-center soft@handheld soft-sides">
          <p>
            <em>
              <small>
                If you are the leader of this group, you can manage it <a target="_blank" href={`${Meteor.settings.public.rock.baseURL}groups/leader?GroupId=${group.id}`}>here</a>
              </small>
            </em>
          </p>
        </div>

      </section>

    </section>
  )
}


export default Layout
