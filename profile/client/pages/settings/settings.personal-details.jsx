import { Component, PropTypes} from "react"
import { connect } from "react-redux"
import { Link } from "react-router"
import ReactMixin from "react-mixin"

import { Forms } from "../../../../core/client/components"
import { Campuses } from "../../../../rock/lib/collections"

import { nav } from "../../../../core/client/actions"

const map = (state) => ({ person: state.onBoard.person })

@connect(map)
@ReactMixin.decorate(ReactMeteorData)
export default class PersonalDetails extends Component {

  componentWillMount(){
    this.props.dispatch(nav.setLevel("CONTENT"))
  }

  componentWillUnmount(){
    this.props.dispatch(nav.setLevel("TOP"))
  }

  getMeteorData() {
    Meteor.subscribe("campuses")
    return {
      campuses: Campuses.find().fetch()
    }
  }

  render () {

    let { campuses } = this.data

    campuses || (campuses = [])
    campuses = campuses.map((campus) => {
      return { label: campus.Name, value: campus.Name }
    })

    const {
      BirthDate,
      Campus,
      FirstName,
      LastName,
      NickName,
    } = this.props.person

    return (
      <div className="one-whole text-center push-double-top@lap-and-up">
        <Forms.Form
          id="reset-password"
          classes={["soft", "one-whole", "two-thirds@portable", "one-half@anchored", "display-inline-block"]}
        >
          <div className="push-double">
            <h4 className="text-center">
              My Personal Details
            </h4>
          </div>

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
          <Forms.Input
            name="NickName"
            label="Nickname"
            ref="NickName"
            type="text"
            defaultValue={NickName}
          />

          <Forms.Select
            name="Campus"
            label="Campus"
            type="Campus"
            defaultValue={Campus.Name}
            ref="Campus"
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
}
