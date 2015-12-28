import { Component, PropTypes} from "react"
import { connect } from "react-redux"

import { Forms } from "../../../../core/client/components"


import { give as giveActions } from "../../actions"
import Styles from "./add-to-cart.styles.css"


// We only care about the give state
function mapStateToProps(state) {
  return {
    give: state.give
  }
}

@connect(mapStateToProps, giveActions)
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
      return fund.Id === Number(id)
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
        value: account.Id,
        label: account.PublicName || account.Name
      }
    })

    if (!mappedAccounts.length) {
      return null
    }

    return (
      <div>
        <div
          className={`display-inline-block push-half-bottom h3 push-half-right ${this.statusClass()}`}>
          and give to
        </div>
        <Forms.Select
          items={mappedAccounts}
          name="select-account"
          id={`${this.state.id}_select`}
          hideLabel={true}
          ref="select-account"
          classes={["soft-bottom", "display-inline-block"]}
          inputClasses={`${this.statusClass()} outlined--dotted outlined--light h3 hard-top flush-bottom`}
          placeholder="select fund here"
          onChange={this.showInputs}
        />

        {() => {
          if (this.state.fund) {
            return (
              <div className="display-block">
                <h3 className={`${this.statusClass()} push-half-bottom push-half-right display-inline-block`}>
                  with
                </h3>
                <Forms.Input
                  id={this.state.id}
                  name={this.state.fund || "secondary-account"}
                  hideLabel={true}
                  ref="secondary-account"
                  classes={["soft-bottom", "input--active", "display-inline-block"]}
                  inputClasses={`outlined--dotted outlined--light h3 hard-top flush-bottom text-dark-primary ${Styles["show-placeholder"]}`}
                  placeholder="$0.00"
                  format={this.format}
                />
              </div>
            )
          }
        }()}


      </div>
    )
  }
}
