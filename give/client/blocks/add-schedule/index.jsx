import { Component, PropTypes} from "react"
import { connect } from "react-redux"

import { Forms, Loading } from "../../../../core/client/components"

import GiveNow from "./../action-buttons"
import Styles from "./add-schedule.styles.css"

import { give as giveActions } from "../../actions"


// We only care about the give state
function mapStateToProps(state) {
  return {
    give: state.give
  }
}

@connect(mapStateToProps, giveActions)
export default class CartContainer extends Component {

  state = {
    fundId: false,
    fundLabel: null,
    frequency: null
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

  setFund = (id) => {
    let selectedFund = this.props.accounts.filter((fund) => {
      return fund.Id === Number(id)
    })

    const { PublicName, Name } = selectedFund[0]

    let fund = PublicName ? PublicName : Name

    this.setState({fundId: id, fundLabel: fund})
  }

  setFrequency = (value) => {
    this.setState({frequency: value})
    this.props.saveSchedule({frequency: value})
  }

  render () {

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

    let mappedAccounts = this.props.accounts.map((account) => {
      return {
        value: account.Id,
        label: account.PublicName || account.Name
      }
    })

    if (!mappedAccounts.length) {
      return null
    }

    // <div className="display-inline-block">
    //
    //
    //   <h3 className="text-dark-tertiary display-inline-block push-half-bottom">
    //     I want this to start on&nbsp;
    //   </h3>
    //
    //   <Forms.Input
    //     name="date"
    //     hideLabel={true}
    //     ref="date"
    //     classes={["soft-bottom", "input--active", "display-inline-block"]}
    //     inputClasses={`outlined--dotted outlined--light h3 hard-top flush-bottom text-dark-primary ${Styles["show-placeholder"]}`}
    //     placeholder="select date"
    //     style={{width: "200px"}}
    //   />
    //
    // </div>

    return (
      <div className="push-top@handheld soft-half-top@lap-and-up">
        <Forms.Form
          classes={["text-left", "hard"]}
          submit={(e) => {e.preventDefault()}}
          id="add-to-cart"
        >
          <Forms.Select
            items={schedules}
            name="schedules"
            id={`schedules`}
            hideLabel={true}
            ref="schedules"
            classes={["soft-bottom", "display-inline-block"]}
            inputClasses={`outlined--dotted outlined--light h3 hard-top flush-bottom`}
            includeBlank={true}
            placeholder="Choose frequency"
            onChange={this.setFrequency}
          />

          <h3 className="text-dark-tertiary display-inline-block push-half-bottom push-half-right">
            &nbsp;I'd like to give to&nbsp;
          </h3>
          <Forms.Select
            items={mappedAccounts}
            name="select-account"
            id={`select`}
            hideLabel={true}
            ref="select-account"
            classes={["soft-bottom", "display-inline-block"]}
            inputClasses={`outlined--dotted outlined--light h3 hard-top flush-bottom`}
            placeholder="select fund here"
            onChange={this.setFund}
          />

          <div className="display-inline-block">


            <h3 className="text-dark-tertiary display-inline-block push-half-bottom">
              with&nbsp;
            </h3>

            <Forms.Input
              id={this.state.fundId || -1}
              name={this.state.fundLabel || "primary-account"}
              hideLabel={true}
              ref="primary-account"
              classes={["soft-bottom", "input--active", "display-inline-block"]}
              inputClasses={`outlined--dotted outlined--light h3 hard-top flush-bottom text-dark-primary ${Styles["show-placeholder"]}`}
              placeholder="$0.00"
              validate={this.saveData}
              format={this.format}
              style={{width: "200px"}}
              disabled={!this.state.fundId}
            />

          </div>



          <div className="push-top">
            <GiveNow
              disabled={total <= 0}
              disabledGuest={true}
            />
          </div>

        </Forms.Form>
      </div>

    )
  }
}
