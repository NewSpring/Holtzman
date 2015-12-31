import { Component, PropTypes} from "react"
import { connect } from "react-redux"
import { Link } from "react-router"
import ReactMixin from "react-mixin"
import Moment from "moment"

import { Forms } from "../../../../core/client/components"
import { Campuses } from "../../../../rock/lib/collections"

import { nav } from "../../../../core/client/actions"

const map = (state) => ({ person: state.onBoard.person })

@connect(map)
@ReactMixin.decorate(ReactMeteorData)
export default class PersonalDetails extends Component {

  state = {
    month: null
  }

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

  getDays = () => {

    let totalDays = Moment("1", "M").daysInMonth()
    if (this.state.month) {
      totalDays = Moment(this.state.month, "M").daysInMonth()
    }

    let arr = []
    for (let i = 0; i < totalDays; i++) {
      arr.push({ label: i + 1, value: i + 1})
    }
    return arr
  }

  getMonths = () => {
    return Moment.monthsShort().map((month, i) => {
      return { label: month, value: i + 1}
    })
  }

  getYears = () => {
    let now = new Date().getFullYear()

    let arr = []
    for (let i = 0; i < 150; i++) {
      arr.push({ label: (now - i), value: (now - i)})
    }

    return arr

  }

  saveMonth = (value) => {
    this.setState({month: value})

    return true
  }

  render () {

    let { campuses } = this.data

    campuses || (campuses = [])
    campuses = campuses.map((campus) => {
      return { label: campus.Name, value: campus.Id }
    })

    const {
      Campus,
      FirstName,
      LastName,
      NickName,
      BirthDay,
      BirthMonth,
      BirthYear
    } = this.props.person

    // console.log(this.props.person)
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
                  items={this.getMonths()}
                  validation={this.saveMonth}
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
                  items={this.getDays()}
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
              items={this.getYears()}
            />
          </div>
        </div>

          <h6 className="soft-bottom">Campus</h6>
          <Forms.Select
            name="Campus"
            label="Campus"
            type="Campus"
            defaultValue={Campus.Name || false}
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
}
