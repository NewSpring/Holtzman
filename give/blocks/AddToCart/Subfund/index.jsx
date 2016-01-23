import { Component, PropTypes} from "react"
import { connect } from "react-redux"

import { give as giveActions } from "../../../store"

import Layout from "./Layout"

@connect(null, giveActions)
export default class SubFund extends Component {

  state = {
    active: false,
    focused: false,
    fund: false,
    id: `select-account_${Date.now()}_${Math.floor((Math.random() * 100))}`
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

    let numberValue = Number(value.replace(/[^\d.-]/g, ""))

    if (numberValue > 0) {
      this.setState({active: true})
      this.props.addTransactions({ [id]: {
        value: Number(value.replace(/[^0-9\.]+/g, '')),
        label: name
      }})
    } else {
      this.setState({
        active: false,
        fund: false,
        id: `select-account_${Date.now()}_${Math.floor((Math.random() * 100))}`
      })
      this.props.clearTransactions(id)
    }

    return value
  }


  showInputs = (id) => {

    let selectedFund = this.props.accounts.filter((fund) => {
      return fund.id === Number(id)
    })

    const { PublicName, Name } = selectedFund[0]

    let fund = PublicName ? PublicName : Name

    let updatedState = { fund }

    if (id != this.state.id) {
      updatedState = {...updatedState, ...{ id }}
    }

    this.setState(updatedState)

  }

  statusClass = () => {
    if (this.state.fund) {
      return "text-dark-tertiary"
    } else {
      return "text-light-tertiary"
    }
  }

  render () {

    let mappedAccounts = this.props.accounts.map((account) => {
      return {
        value: account.id,
        label: account.name
      }
    })

    if (!mappedAccounts.length) {
      return null
    }

    return (
      <Layout
        classes={this.statusClass()}
        accounts={mappedAccounts}
        state={this.state}
        showInputs={this.showInputs}
        format={this.format}
        preFill={this.props.preFill}
      />
    )
  }
}
