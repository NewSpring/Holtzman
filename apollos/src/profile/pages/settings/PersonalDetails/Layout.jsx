import { Component, PropTypes} from "react"
import { Forms } from "../../../../core/components"
import Meta from "../../../../core/components/meta"
import Validate from "../../../../core/util/validate"

import Back from "../Back"

// import { VelocityComponent } from "velocity-react"

//
export default class Layout extends Component {

  static propTypes = {
    submit: PropTypes.func.isRequired,
    person: PropTypes.object,
    months: PropTypes.array.isRequired,
    saveMonth: PropTypes.func.isRequired,
    days: PropTypes.array.isRequired,
    years: PropTypes.array.isRequired,
  }

  submit = (e) => {
    e.preventDefault()

    let data = {}
    for (let ref in this.refs) {
      let value = this.refs[ref].getValue()
      if (ref === "Email" && !Validate.isEmail(value)) {
        continue
      }

      let number = Number(value)
      if (number) {
        value = number
      }

      data[ref] = value
    }

    this.props.submit(data)
  }

  containerStyles = () => {
    return {
      marginTop: process.env.NATIVE? "50px" : "0px",
    }
  }

  render () {

    const { submit, person, months, saveMonth, days, years, campuses } = this.props

    const {
      campus,
      firstName,
      lastName,
      nickName,
      email,
      birthDay,
      birthMonth,
      birthYear
    } = person

    return (
      <div
        className="background--light-primary one-whole text-center push-double-top@lap-and-up soft-double-bottom push-double-bottom"
        style={this.containerStyles()}
      >
      <Meta title="Update your details" />
        <Back />
        <Forms.Form
          id="reset-password"
          classes={["soft", "one-whole", "two-thirds@portable", "one-half@anchored", "display-inline-block"]}
          submit={this.submit}
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
              defaultValue={nickName}
            />

          <div className="grid">
            <div className="grid__item one-half">

              <Forms.Input
                name="FirstName"
                label="First Name"
                ref="FirstName"
                type="text"
                defaultValue={firstName}
              />
            </div>
            <div className="grid__item one-half">

              <Forms.Input
                name="LastName"
                label="Last Name"
                ref="LastName"
                type="text"
                defaultValue={lastName}
              />
            </div>
          </div>



        <h6 className="soft-bottom">Contact</h6>
          <Forms.Input
            name="Email"
            placeholder="user@email.com"
            label="Email"
            type="email"
            ref="Email"
            errorText="Please enter a valid email"
            validation={Validate.isEmail}
            defaultValue={email}
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
                  defaultValue={birthMonth}
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
                  defaultValue={birthDay}
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
              defaultValue={birthYear}
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
          defaultValue={campus && campus.id || false}
          ref="Campus"
          includeBlank={true}
          items={campuses ? campuses : []}
        />

        {/*
          <Link to="/profile/settings" tabIndex={-1} className="btn--small btn--dark-tertiary display-inline-block">
            Back
          </Link>
           */}
          {(() => {
            let btnClasses = [];
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
          })()}
        </Forms.Form>
      </div>
    )
  }
}
