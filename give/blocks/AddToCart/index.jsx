/*global serverWatch */
import { Component, PropTypes} from "react"
import { connect } from "react-redux"

import { Forms, Loading } from "../../../core/components"

import { give as giveActions } from "../../store"


import Layout from "./Layout"
import Square from "./Square"


// We only care about the give state
const map = (state) => ({ give: state.give })

@connect(map, giveActions)
export default class CartContainer extends Component {

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

  componentWillMount() {

    if (typeof window != undefined && window != null) {
      let match,
          pl     = /\+/g,  // Regex for replacing addition symbol with a space
          search = /([^&=]+)=?([^&]*)/g,
          decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
          query  = window.location.search.substring(1);

      let urlParams = {};
      while (match = search.exec(query))
         urlParams[decode(match[1])] = decode(match[2]);

      for (let account of this.props.accounts) {
        if (urlParams[account.name]) {
          let value = urlParams[account.name]
          let id = account.id

          value = this.monentize(value)

          this.props.addTransactions({ [id]: {
            value: Number(value.replace(/[^0-9\.]+/g, '')),
            label: account.Name
          }})
        }
      }
    }


  }

  preFillValue = (id) => {
    const { total, transactions } = this.props.give

    if (transactions[id] && transactions[id].value) {
      return `$${transactions[id].value}`
    }

    return null
  }


  render () {

    const { total, transactions } = this.props.give

    let accounts = this.props.accounts.filter((x) => {
      // return x.description && x.image
      return true
    }).map((x) => ({
      label: x.name,
      value: x.id
    }))

    /*

      The primary instance of the subfund selector gets an overall copy of
      the entire accounts list. Then each new instance gets a copy of the
      previous list minus the selected account.

    */
    return (
      <Layout
        accounts={accounts}
        save={this.saveData}
        monentize={this.monentize}
        format={this.format}
        preFill={this.preFillValue}
        total={total}
        transactions={{...this.props.give.transactions}}
      />

    )
  }
}
