import { Component, PropTypes} from "react"
import { connect } from "react-redux"
import ReactDOM from "react-dom"
import Moment from "moment"

import modalActions from "../../../core/store/modal"

import giveActions from "../../store/give"

import Later from "./Later"
import Remind from "./Remind"
import Recover from "./Recover"

const map = (store) => ({ give: store.give })
@connect(map)
export default class RecoverSchedules extends Component {

  state = {
    state: "default", // default, remind, later
  }

  onRemind = (e) => {
    e.preventDefault()

    const input = document.getElementById("remind-frequency")
    let value = input.value

    let time = {
      tomorrow: Moment().add(1, "days").toDate(),
      nextWeek: Moment().add(7, "days").toDate(),
      twoWeeks: Moment().add(14, "days").toDate()
    }

    this.props.dispatch(giveActions.setReminder(time[value]))
    this.props.dispatch(giveActions.clearData())
    this.setState({state: "later"})

    Meteor.users.update(Meteor.userId(), {
      $set: {
        "profile.reminderDate": time[value]
      }
    })

  }


  close = () => {
    this.props.dispatch(modalActions.hide())
  }

  removeSchedule = (id) => {

    Meteor.call("give/schedule/cancel", {id, gateway}, (err, response) => {

    })

  }

  render() {

    const { state } = this.state

    let arr = []
    const { recoverableSchedules, reminderDate } = this.props.give
    // for (let schedule in recoverableSchedules) {
    //   arr.push(recoverableSchedules[schedule])
    // }

    if (state === "later") {
      return <Later date={reminderDate} onClick={this.close} />
    }

    if (state === "remind") {
      return (
        <Remind
          onSubmit={this.onRemind}
          onChange={this.onFrequencyChange}
        />
      )
    }


    return (
      <Recover
        schedules={arr}
        hide={this.close}
        onClick={() => {this.setState({state: "remind"})}}
      />
    )
  }

}
