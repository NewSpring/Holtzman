import { Component, PropTypes} from "react"
import { connect } from "react-redux"
import { Link } from "react-router"
import ReactMixin from "react-mixin"
import Moment from "moment"
import { VelocityComponent } from "velocity-react"
import { pushPath } from "redux-simple-router"



import { Forms } from "../../../../core/client/components"
import { WindowLoading, Spinner } from "../../../../core/client/components/loading"

import { GroupTopics } from "../../../lib/collections"
import { Campuses } from "../../../../rock/lib/collections"

import { nav } from "../../../../core/client/actions"


const map = (state) => ({ person: state.onBoard.person })

@connect(map)
@ReactMixin.decorate(ReactMeteorData)
export default class HomeAddress extends Component {

  state = {
    state: "default"
  }

  getMeteorData() {

    Meteor.subscribe("groupTopics")

    let topics = GroupTopics.find().fetch()

    topics = topics.map((topic) => {
      return {
        value: topic.Id,
        label: topic.Value
      }
    })

    return {
      topics
    }
  }


  updateAddress = (e) => {
    e.preventDefault()

    let data = {}
    for (let ref in this.refs) {
      let value = this.refs[ref].getValue()
      let number = Number(value)
      if (number) {
        value = number
      }

      data[ref] = value
    }

    this.setState({ state: "loading" })

    let refs = this.refs
    console.log(data)
    setTimeout(() => {
      this.setState({ state: "default" })
      this.props.history.pushState({}, "/groups/finder/list/10")
    }, 3000)

    // updateHome(data, (err, result) => {
    //
    //   if (err) {
    //     this.setState({ state: "error", err: err })
    //     setTimeout(() => {
    //       this.setState({ state: "default"})
    //     }, 3000)
    //     return
    //   }
    //
    //
    //   this.setState({ state: "success" })
    //
    //   setTimeout(() => {
    //     this.setState({ state: "default"})
    //   }, 3000)
    //
    // })


  }

  days = () => {
    return [
      { label: "Sunday", value: "sunday"},
      { label: "Monday", value: "monday"},
      { label: "Tuesday", value: "tuesday"},
      { label: "Wednesday", value: "wednesday"},
      { label: "Thursday", value: "thursday"},
      { label: "Friday", value: "friday"},
      { label: "Saturday", value: "saturday"}
    ]
  }

  render () {

    let {
      City,
      Country,
      PostalCode,
      State,
      Street1,
      Street2
    } = this.props.person.Home

    if (this.state.state === "error") {

      return (
        <VelocityComponent
          animation={"transition.fadeIn"}
          runOnMount={true}
        >
          <WindowLoading classes={["background--alert"]}>
            <div className="locked-top locked-bottom one-whole floating">
              <div className="floating__item">
                <h4 className="text-light-primary">Looks like there was a problem :(</h4>
                <p className="text-light-primary">{this.state.err.error}</p>
              </div>
            </div>
          </WindowLoading>
        </VelocityComponent>
      )
    }

    if (this.state.state === "loading") {
      return (
        <VelocityComponent
          animation={"transition.fadeIn"}
          runOnMount={true}
        >
          <WindowLoading classes={["background--primary"]} styles={{position: "absolute"}}>
            <div className="locked-top locked-bottom one-whole floating">
              <div className="floating__item">
                <Spinner styles={{borderColor: "#fff #6BAC43 #fff #fff", borderWidth: "7px"}}/>
                <h4 className="text-light-primary">Finding a group for you...</h4>
              </div>
            </div>
          </WindowLoading>
        </VelocityComponent>
      )
    }

    if (this.state.state === "success") {
      return (
        <div className="one-whole text-center push-double-top soft-double-top@lap-and-up">
          <h4>Your information has been updated!</h4>
        </div>
      )
    }

    return (
      <div className="one-whole text-center push-double-top@lap-and-up">
        <Forms.Form
          id="reset-password"
          classes={["soft", "one-whole", "two-thirds@portable", "one-half@anchored", "display-inline-block"]}
          submit={this.updateAddress}
        >
          <div className="push-double">
            <h4 className="text-center">
              Find a Group
            </h4>
          </div>

          <Forms.Input
            name="Street1"
            label="Street"
            ref="Street1"
            type="text"
            defaultValue={Street1}
          />
          <Forms.Input
            name="Street2"
            label="Street 2 (Optional)"
            ref="Street2"
            type="text"
            defaultValue={Street2}
          />
          <div className="grid">

            <div className="grid__item two-fifths">
              <Forms.Input
                name="City"
                label="City"
                defaultValue={City}
                ref="City"
              />
            </div>

            <div className="grid__item three-fifths">

              <div className="grid">

                <div className="grid__item one-half">
                  <Forms.Input
                    name="State"
                    label="State"
                    defaultValue={State}
                    ref="State"
                  />

                </div>
                <div className="grid__item one-half">
                  <Forms.Input
                    name="PostalCode"
                    label="Zip"
                    defaultValue={PostalCode}
                    ref="PostalCode"
                  />
                </div>
              </div>
            </div>
          </div>

          <Forms.Select
            name="DayOfWeek"
            label="Day of Week"
            includeBlank={true}
            items={this.days()}
            ref="DayOfWeek"
          />

          <Forms.Select
            name="Topic"
            label="Topic/Demographic"
            includeBlank={true}
            items={this.data.topics}
            ref="Topic"
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
                Search
              </button>
            )
          }()}
        </Forms.Form>
      </div>
    )
  }
}
