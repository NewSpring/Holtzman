import { PropTypes } from "react"
import { Link } from "react-router"
import { Forms } from "../../../../core/components"

const Layout = ({ submit, person, months, saveMonth, days, years, campuses }) => {

  const {
    Campus,
    FirstName,
    LastName,
    NickName,
    BirthDay,
    BirthMonth,
    BirthYear
  } = person

  return (
    <div className="one-whole text-center push-double-top@lap-and-up">
      <Forms.Form
        id="reset-password"
        classes={["soft", "one-whole", "two-thirds@portable", "one-half@anchored", "display-inline-block"]}
        submit={submit}
      >
        <div className="push-double">
          <h4 className="text-center">
            My Personal Details
          </h4>
        </div>

        <h6 className="soft-bottom">Name</h6>
        <Forms.Input
          name="NickName"
          label="Nickname"
          ref="NickName"
          type="text"
          defaultValue={NickName}
        />
        <Forms.Input
          name="FirstName"
          label="First Name"
          ref="FirstName"
          type="text"
          defaultValue={FirstName}
        />
        <Forms.Input
          name="LastName"
          label="Last Name"
          ref="LastName"
          type="text"
          defaultValue={LastName}
        />


      <h6 className="soft-bottom">Birthday</h6>
      <div className="grid">
        <div className="grid__item three-fifths">
          <div className="grid">
            <div className="grid__item one-half">
              <Forms.Select
                name="BirthMonth"
                label="Month"
                ref="BirthMonth"
                type="text"
                defaultValue={BirthMonth}
                includeBlank={true}
                items={months}
                validation={saveMonth}
              />
            </div>
            <div className="grid__item one-half">
              <Forms.Select
                name="BirthDay"
                label="Day"
                ref="BirthDay"
                type="text"
                defaultValue={BirthDay}
                includeBlank={true}
                items={days}
              />
            </div>

          </div>

        </div>
        <div className="grid__item two-fifths">
          <Forms.Select
            name="BirthYear"
            label="Year"
            ref="BirthYear"
            type="text"
            defaultValue={BirthYear}
            includeBlank={true}
            items={years}
          />
        </div>
      </div>

        <h6 className="soft-bottom">Campus</h6>
        <Forms.Select
          name="Campus"
          label="Campus"
          type="Campus"
          defaultValue={Campus.Id || false}
          ref="Campus"
          includeBlank={true}
          items={campuses}
        />


        <Link to="/profile/settings" tabIndex={-1} className="btn--small btn--dark-tertiary display-inline-block">
          Back
        </Link>

        {() => {
          let btnClasses = ["push-left"];
          let ready = true
          if (!ready){
            btnClasses.push("btn--disabled");
          } else {
            btnClasses.push("btn");
          }

          return (
            <button className={btnClasses.join(" ")}>
              Update
            </button>
          )
        }()}
      </Forms.Form>
    </div>
  )
}

Layout.propTypes = {
  submit: PropTypes.func.isRequired,
  person: PropTypes.obj,
  months: PropTypes.array.isRequired,
  saveMonth: PropTypes.func.isRequired,
  days: PropTypes.array.isRequired,
  years: PropTypes.array.isRequired,
  campuses: PropTypes.array.isRequired
}

export default Layout
