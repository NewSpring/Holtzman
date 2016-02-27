import { PropTypes } from "react"
import { Link } from "react-router"

import SideBySide from "../../../../../core/components/cards/SideBySide"

const List = ({
  groups,
  onHover,
  onClick,
  hover,
  active,
  showFilters,
  children,
  filter,
  count,
  showMore,
  status,
  done
}) => (
  <div>
    <section className="background--light-secondary soft-double-sides@lap-and-up hard-bottom">

      <div className="display-inline-block soft-ends one-whole">
        <h5 className="text-dark-tertiary display-inline-block">
          {/*{groups.length} Result{groups.length != 1 ? "s" : ""} near your address */}
          {count} Result{count != 1 ? "s" : ""} near your address
        </h5>
        <button className="display-inline-block h7 text-dark-tertiary float-right" onClick={showFilters} style={{
            textDecoration: "underline",
            marginTop: "6px"
        }}>
          {!filter ? "Filter" : "Close Filter"}
        </button>
      </div>
    </section>
    {children}
    <section className="background--light-secondary soft-double-sides@lap-and-up">

      {groups.map((group, key) => {
        let leaders = group.members.filter((x) => (x.role.toLowerCase() === "leader"))
        return (
          <button
            id={group.id}
            onClick={onClick}
            key={key}
            style={{position:"relative"}}
            className="one-whole push-bottom"
          >
            <SideBySide
              image={{ url: group.photo }}
              left={["one-whole", "two-thirds@lap-and-up"]}
              right={["one-whole", "one-third@lap-and-up"]}
            >
              <h4 className="push-half-top@portable push-top@anchored">
                {group.name}
              </h4>
              <h6 className="text-dark-secondary">
                {
                  leaders
                    .map((x, i) => {
                      let string = `${x.person.nickName || x.person.firstName} ${x.person.lastName}`

                      if (leaders.length - 1 != i) {
                        string += ", "
                      }

                      return <span key={i}>{string}</span>
                    })
                }
              </h6>
              <h6 className="text-dark-tertiary">
                <em>
                  {group.schedule.scheduleText} {group.locations.length && group.locations[0].location.distance ? `- ${group.locations[0].location.distance.toFixed(2)} miles away`: ""}
                </em>
              </h6>
              <p className="flush-bottom">
                <small>
                  {group.description}
                </small>
              </p>

            </SideBySide>
          </button>

        )
      })}

      <div className="one-whole text-center soft-double-top soft-bottom">
        {() => {
          let btnClasses = ["btn", "one-whole", "push-bottom"];

          // if (data.email === null || data.password === null && !data.terms){
          //   btnClasses.push("btn--disabled");
          // } else {
          //   btnClasses.push("btn");
          // }
          if (done) {
            return (
              <button className="disabled one-whole btn" disabled>
                No more groups
              </button>
            )
          }
          if (status === "partial-load") {
            return (
              <button className="disabled one-whole btn" disabled>
                Loading...
              </button>
            )
          }
          return (
            <button className={btnClasses.join(" ")} onClick={showMore}>
              Show More
            </button>
          )
        }()}
      </div>

    </section>
    <section className="background--light-primary hard">
      <div className="one-whole text-center soft-double-top soft-bottom">
        <Link to="/community/finder" className="btn--small btn--dark-tertiary display-inline-block">
          Search Again
        </Link>
      </div>
    </section>
  </div>
)

List.propTypes = {
  markers: PropTypes.array,
  onHover: PropTypes.func,
  onClick: PropTypes.func,
  // hover: PropTypes.number,
  // active: PropTypes.number
}

export default List
