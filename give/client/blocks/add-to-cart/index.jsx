import { Component, PropTypes} from "react"
import { connect } from "react-redux"

import { Forms, Loading } from "../../../../core/client/components"

import GiveNow from "./../action-buttons"

import SubFund from "./add-to-cart.subfund"
import Styles from "./add-to-cart.styles.css"

import { give as giveActions } from "../../actions"


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
    let match,
        pl     = /\+/g,  // Regex for replacing addition symbol with a space
        search = /([^&=]+)=?([^&]*)/g,
        decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
        query  = window.location.search.substring(1);

    let urlParams = {};
    while (match = search.exec(query))
       urlParams[decode(match[1])] = decode(match[2]);

    for (let account of this.props.accounts) {
      if (urlParams[account.Name]) {
        let value = urlParams[account.Name]
        let id = account.Id

        value = this.monentize(value)

        this.props.addTransactions({ [id]: {
          value: Number(value.replace(/[^0-9\.]+/g, '')),
          label: account.Name
        }})
      }
    }

  }

  preFillValue = (id) => {
    const { total, transactions } = this.props.give

    if (transactions[id] && transactions[id].value) {
      return transactions[id].value
    }

    return null
  }


  render () {

    const { total, transactions } = this.props.give

    let primaryAccount = {}
    let remainingAccounts = []
    let otherAccounts = []

    if (this.props.accounts.length) {

      for (let account of this.props.accounts) {
        if (account.Order === 0 && !Object.keys(primaryAccount).length){
          primaryAccount = account
          continue
        }

        otherAccounts.push(account)

        if (transactions[account.Id]) {
          continue
        }

        remainingAccounts.push(account)
      }
    }

    let mulitpleAccounts = (this.props.accounts && this.props.accounts.length > 1)

    return (
      <div className="push-top@handheld soft-half-top@lap-and-up">
        <Forms.Form
          classes={["text-left", "hard"]}
          submit={(e) => {e.preventDefault()}}
          id="add-to-cart"
        >
          <h3 className="text-dark-tertiary display-inline-block push-half-bottom push-half-right">
            I'd like to {() => {
              if (this.props.accounts.length > 1) {
                return "tithe"
              }

              return `give`
            }()}
          </h3>

          <Forms.Input
            id={primaryAccount.Id}
            name={primaryAccount.Name}
            type="tel"
            hideLabel={true}
            ref="primary-account"
            classes={["soft-bottom", "input--active", "display-inline-block"]}
            inputClasses={`outlined--dotted outlined--light h3 hard-top flush-bottom text-dark-primary ${Styles["show-placeholder"]}`}
            placeholder="$0.00"
            validate={this.saveData}
            format={this.format}
            defaultValue={this.preFillValue(primaryAccount.Id)}
          />


          <div className="clearfix"></div>
          <div className="display-inline-block">
            {() => {

              if (mulitpleAccounts || !this.props.accounts.length) {
                let transactions = {...this.props.give.transactions}
                if (primaryAccount.Id) {
                  delete transactions[primaryAccount.Id]
                } else {
                  delete transactions[-1]
                }

                return (
                  <div>
                    {() => {

                      // for (let transaction in this.props.give.transactions) {
                      //   return (
                      //     <SubFund
                      //       accounts={otherAccounts}
                      //       transaction={this.props.give.transactions[transaction]}
                      //     />
                      //   )
                      // }
                      return (
                        <SubFund
                          accounts={otherAccounts}
                          preFillValue={this.preFillValue}
                        />
                      )
                    }()}

                    <div className="clearfix"></div>
                  </div>

                )
              }

              return (
                <h3 className="text-dark-tertiary display-inline-block push-half-bottom">
                  {`to ${this.props.accounts[0].PublicName || this.props.accounts[0].Name} `}&nbsp;
                </h3>
              )

            }()}

            <h3 className="display-inline-block text-dark-tertiary push-half-bottom push-half-right">so my gift total is</h3>
            <h3 className="display-inline-block text-brand push-half-bottom">{this.monentize(total, true)}</h3>
          </div>

          <div className="push-top">
            <GiveNow
              disabled={total <= 0}
            />
          </div>

        </Forms.Form>
      </div>

    )
  }
}
