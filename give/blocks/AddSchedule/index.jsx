import { Component, PropTypes} from "react"
import { connect } from "react-redux"
import ReactMixin from "react-mixin"
import Moment from "moment"

import { give as giveActions } from "../../store"
import { Offline } from "../../components/status"

import Layout from "./Layout"

// We only care about the give state
const map = (state) => ({ give: state.give })

@connect(map, giveActions)
@ReactMixin.decorate(ReactMeteorData)
export default class CartContainer extends Component {

  state = {
    fundId: false,
    fundLabel: null,
    frequency: null,
    startDate: null
  }

  componentWillMount(){
    this.props.clearTransactions()
  }

  getMeteorData(){
    let alive = true;

    try {
      alive = serverWatch.isAlive("ROCK")
    } catch (e) {}

    return {
      alive
    }
  }

  monentize = (value, fixed) => {

    if (typeof value === "number") {
      value = `${value}`
    }

    if (!value.length) {
      return `$0.00`
    }

    value = value.replace(/[^\d.-]/g, "")

    let decimals = value.split(".")[1]
    if ((decimals && decimals.length >= 2) || fixed) {
      value = Number(value).toFixed(2)
      value = String(value)
    }

    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    return `$${value}`
  }

  format = (value, target) => {
    const { id, name } = target

    value = this.monentize(value)

    this.props.addTransactions({ [id]: {
      value: Number(value.replace(/[^0-9\.]+/g, '')),
      label: name
    }})

    return value
  }

  saveData = (value, target) => {
    const { id, name } = target

    value = this.monentize(value)

    this.props.addTransactions({ [id]: {
      value: Number(value.replace(/[^0-9\.]+/g, '')),
      label: name
    }})

    return true

  }

  saveDate = (value, target) => {

    const { fundId, fundLabel, frequency } = this.state

    let date = Moment(new Date(value)).format("YYYYMMDD")

    this.setState({ startDate: date })

    if (fundId ) {
      this.props.saveSchedule(fundId, { start: Moment(new Date(value)).date() })
    }

    return true
  }

  setFund = (id) => {
    let selectedFund = this.props.accounts.filter((fund) => {
      return fund.id === Number(id)
    })

    const { name } = selectedFund[0]

    if (this.state.fundId != id) {
      this.props.removeSchedule(this.state.fundId)
    }

    this.setState({fundId: id, fundLabel: name})
    this.props.saveSchedule(id, {
      label: name,
      frequency: this.state.frequency,
      start: this.state.start
    })

    this.props.setTransactionType("recurring")
  }

  setFrequency = (value) => {
    this.setState({frequency: value})
    if (this.state.fundId) {
      this.props.saveSchedule(this.state.fundId, { frequency: value })
    }

  }

  render () {

    if (!this.data.alive) {
      return <Offline />
    }

    const { total, transactions } = this.props.give

    let schedules = [
      {
        label: "One Time",
        value: "One-Time"
      },
      {
        label: "Every Week",
        value: "Weekly"
      },
      {
        label: "Every Two Weeks",
        value: "Bi-Weekly"
      },
      // {
      //   label: "Twice a Month",
      //   value: "Twice a Month"
      // },
      {
        label: "Once a Month",
        value: "Monthly"
      }
    ]

    let mappedAccounts = this.props.accounts.filter((x) => {
      return x.description && x.image
      // return true
    }).map((x) => ({
      value: x.id,
      label: x.name
    }))

    if (!mappedAccounts.length) {
      return null
    }

    return (
      <Layout
        schedules={schedules}
        setFrequency={this.setFrequency}
        accounts={mappedAccounts}
        setFund={this.setFund}
        state={this.state}
        format={this.format}
        save={this.saveData}
        saveDate={this.saveDate}
        total={total}
      />
    )
  }
}
