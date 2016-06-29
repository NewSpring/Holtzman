import { Component, PropTypes} from "react"
import { connect } from "react-redux"
import ReactMixin from "react-mixin"
import Moment from "moment"
import { createContainer } from "../../../core/blocks/meteor/react-meteor-data";

import { give as giveActions } from "../../store"
import { Offline } from "../../components/status"

import Layout from "./Layout"

// We only care about the give state
const map = (state) => ({ give: state.give })

@connect(map, giveActions)
class CartContainer extends Component {

  state = {
    fundId: false,
    fundLabel: null,
    frequency: null,
    startDate: null,
    amount: null,
  }

  componentWillMount(){
    this.props.clearTransactions()

    if (this.props.existing) {
      const { existing } = this.props
      if (existing.details && existing.details.length && existing.details[0].account) {
        this.setState({
          fundId: Number(existing.details[0].account.id),
          fundLabel: existing.details[0].account.name,
          frequency: existing.frequency,
          amount:   Number(existing.details[0].amount.replace(/[^0-9\.]+/g, ''))
        })

        // if (existing.details[0].amount) {
        //   this.props.addTransactions({ [Number(existing.details[0].account.id)]: {
        //     value: Number(existing.details[0].amount.replace(/[^0-9\.]+/g, '')),
        //     label: existing.details[0].account.name
        //   }})
        // }

      }
    }
  }

  componentWillUnmount() {
    this.props.clearSchedules()
  }

  componentWillReceiveProps(nextProps) {
    let { transactions, schedules } = nextProps.give;

    if (Object.keys(transactions).length === 0 && Object.keys(schedules).length === 0) {
      let form = document.getElementById("add-to-cart");
      if (form) form.reset();

      // this works, but the input--active never comes back
      // let inputs = document.getElementsByClassName("input");
      // for (let i = 0; i < inputs.length; i++) {
      //   inputs[i].className = inputs[i].className.replace(/\binput--active\b/gmi,'');
      // }
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

    this.setState({
      fundId: id,
      fundLabel: name,
      amount: Number(value.replace(/[^0-9\.]+/g, ''))
    })

    return value
  }

  saveData = (value, target) => {
    const { id, name } = target

    value = this.monentize(value)
    this.setState({
      fundId: id,
      fundLabel: name,
      amount: Number(value.replace(/[^0-9\.]+/g, ''))
    })

    return true
  }

  saveDate = (value, target) => {

    const { fundId, fundLabel, frequency } = this.state

    let date = Moment(new Date(value)).format("YYYYMMDD")

    this.setState({ startDate: date })

    if (fundId ) this.props.saveSchedule(fundId, { start: new Date(value) });
    return true
  }

  setFund = (id) => {
    let selectedFund = this.props.accounts.filter((fund) => {
      return fund.id === Number(id)
    })

    const { name } = selectedFund[0]

    if (this.state.fundId != id) this.props.removeSchedule(this.state.fundId);

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

  onClick = (e) => {
    e.preventDefault()

    let keepGoing = true
    if (this.state.fundId) {
      this.props.clearAllSchedulesExcept(Number(this.state.fundId))

      this.props.saveSchedule(this.state.fundId, {
        label: this.state.fundLabel,
        frequency: this.state.frequency,
        start: this.state.startDate
      })

      this.props.clearTransactions()
      this.props.addTransactions({ [this.state.fundId]: {
        value: Number(this.state.amount),
        label: this.state.fundLabel,
      }})

    }

    if (this.props.onClick) keepGoing = this.props.onClick(e);
    return keepGoing

  }

  render () {

    if (!this.props.alive) {
      return <Offline />
    }

    const { transactions } = this.props.give

    let schedules = [
      { label: "one time", value: "One-Time" },
      { label: "every week", value: "Weekly" },
      { label: "every two weeks", value: "Bi-Weekly" },
      { label: "once a month", value: "Monthly" },
    ]

    console.log(this.props)
    let mappedAccounts = this.props.accounts.map((x) => ({
      value: x.id,
      label: x.name
    }))

    if (!mappedAccounts.length) {
      return null
    }

    const { fundId, fundLabel, startDate, frequency } = this.state
    try {
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
          total={this.state.amount}
          existing={this.props.existing}
          date={this.state.startDate}
          text={this.props.text}
          onSubmitSchedule={this.onClick}
          ready={fundId && fundLabel && startDate && frequency}
          dataId={this.props.dataId}
        />
      )
    } catch (e) {
      console.log(e);
    }

  }
}

export default createContainer(() => {
  let alive = true;
  try { alive = serverWatch.isAlive("ROCK") } catch(e) {};
  return { alive };
}, CartContainer)
