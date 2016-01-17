import { Component, PropTypes} from "react"
import ReactMixin from "react-mixin"
import { connect } from "react-redux"

import { nav as navActions } from "../../../../core/store"
import { ScheduledTransactions } from "../../../collections"

import Layout from "./Layout"

const map = (state) => ({ person: state.onBoard.person })
@connect(map)
@ReactMixin.decorate(ReactMeteorData)
export default class Details extends Component {

  state = {
    isActive: true
  }

  componentWillMount() {
    this.props.dispatch(navActions.setLevel("CONTENT"))
  }

  componentWillUnmount() {
    this.props.dispatch(navActions.setLevel("TOP"))
  }

  getMeteorData() {
    Meteor.subscribe("scheduledTransactions")
    const { id } = this.props.params
    const schedule = ScheduledTransactions.findOne({Id: Number(id)});
    return {
      schedule
    };

  }

  stop = (e) => {
    e.preventDefault()

    const { Id, GatewayScheduleId } = this.data.schedule

    this.setState({isActive: false})
    Meteor.call("Give.schedule.cancel", {Id, GatewayScheduleId }, (err, response) => {

    })
  }

  render () {
    return <Layout stop={this.stop} data={this.data} state={this.state} />
  }
}
