import { Component, PropTypes} from "react"
import { AccountType } from "../../../components"
import Moment from "moment"

import { Forms } from "../../../../core/components"

export default class Confirm extends Component {

  static propTypes = {
    data: PropTypes.object.isRequired,
    save: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    clear: PropTypes.func.isRequired,
    next: PropTypes.func.isRequired
  }


  state = {
    save: false
  }

  header = () => {
    return (
      <h4 className="text-center">
        Review And Complete Your Gift
      </h4>
    )
  }

  scheduleHeader = () => {
    return (
      <h4 className="text-center">
        Review Your Schedule
      </h4>
    )
  }

  buttonText = () => {

    let { payment } = this.props.data

    if (!payment.accountNumber && !payment.cardNumber) {
      payment = {...this.props.savedAccount.payment}
      payment.type = "ach"
    }

    let text = "Give Now"

    if (Object.keys(this.props.schedules).length) {
      text = "Schedule Now"
    }

    if (payment.accountNumber || payment.cardNumber) {

      const masked = payment.type === "ach" ? payment.accountNumber : payment.cardNumber;
      text += ` using ${masked.slice(-4)}`

    }

    return text

  }

  icon = () => {

    const { payment } = this.props.data
    const { savedAccount } = this.props

    if (savedAccount && savedAccount.payment && savedAccount.payment.paymentType) {
      return (
        // replace with SVG
        <AccountType width="30px" height="20px" type={savedAccount.payment.paymentType}/>
      )
    }

    const masked = payment.type === "ach" ? payment.accountNumber : payment.cardNumber;

    if (payment.type === "ach") {
      return (
        <AccountType width="30px" height="20px" type="Bank"/>
      )
    }

    if (payment.type === "cc") {

      const getCardType = (card) => {

        const d = /^6$|^6[05]$|^601[1]?$|^65[0-9][0-9]?$|^6(?:011|5[0-9]{2})[0-9]{0,12}$/gmi

        const defaultRegex = {
          Visa: /^4[0-9]{0,15}$/gmi,
          MasterCard: /^5$|^5[1-5][0-9]{0,14}$/gmi,
          AmEx: /^3$|^3[47][0-9]{0,13}$/gmi,
          Discover: d
        }

        for (let regex in defaultRegex) {
          if (defaultRegex[regex].test(card.replace(/-/gmi, ""))) {
            return regex
          }
        }

        return null

      }

      return (
        // replace with SVG
        <AccountType width="30px" height="20px" type={getCardType(masked)}/>
      )
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

  listItem = (transaction, key) => {
    return (
      <div key={key} className="soft-ends hard-sides outlined--light outlined--bottom">

        <div className="grid" style={{verticalAlign: "middle"}}>

          <div className="grid__item five-eighths" style={{verticalAlign: "middle"}}>
            <h5 className="text-dark-tertiary flush text-left">
              {transaction.label}
            </h5>
          </div>

          <div className="grid__item three-eighths text-right" style={{verticalAlign: "middle"}}>
            <h3 className="text-dark-secondary flush">
              {this.monentize(transaction.value)}
            </h3>
          </div>

        </div>
      </div>
    )
  }

  scheduleItem = (schedule, key) => {

    return (
      <div className="display-inline-block one-whole" key={key}>

        <p>
          Starting on {Moment(schedule.start).format("MMM D, YYYY")}, I will give <span clasName="text-primary">{this.monentize(this.props.total)}</span> to {schedule.label}. This will occur {schedule.frequency}.
        </p>

      </div>

    )


  }

  savePayment = () => {
    this.setState({save: !this.state.save})

    if (this.state.save) {
      this.props.save({ payment: { name: null }})
    }
  }

  saveName = (value) => {
    if (value.length > 0) {
      this.props.save({ payment: { name: value }})
    }

    return (value.length > 0)

  }

  renderScheduleConfirm = () => {
    let schedules = []

    for (let schedule in this.props.schedules) {
      schedules.push(this.props.schedules[schedule])
    }

    return (
      <div>
        <div className="push-double@lap-and-up push">
          {this.props.header || this.scheduleHeader()}
        </div>

        <div className="soft">
          {schedules.map((schedule, key) => {
            return this.scheduleItem(schedule, key)
          })}

          <button className="btn one-whole push-top" type="submit">
            {this.buttonText()} {this.icon()}
          </button>
        </div>


      </div>
    )
  }

  render () {

    let transactions = []

    for (let transaction in this.props.transactions) {
      transactions.push(this.props.transactions[transaction])
    }

    if (Object.keys(this.props.schedules).length) {
      return this.renderScheduleConfirm()
    }

    return (
      <div>
        <div className="push-double@lap-and-up push">
          {this.props.header || this.header()}
        </div>

        <div className="soft">
          {transactions.map((transaction, key) => {
            return this.listItem(transaction, key)
          })}

          <div className="soft-ends hard-sides">

            <div className="grid" style={{verticalAlign: "middle"}}>

              <div className="grid__item five-eighths" style={{verticalAlign: "middle"}}>
                <h5 className="text-dark-tertiary flush text-left">
                  Total
                </h5>
              </div>

              <div className="grid__item three-eighths text-right" style={{verticalAlign: "middle"}}>
                <h3 className="text-primary flush">
                  {this.monentize(this.props.total)}
                </h3>
              </div>

            </div>
          </div>
          {() => {
            if (
              this.props.savedAccount.id === null &&
              this.props.transactionType != "guest" &&
              Object.keys(this.props.schedules).length === 0
            ) {
              return (
                <Forms.Checkbox
                  name="savePayment"
                  defaultValue={false}
                  clicked={this.savePayment}
                >
                  Save this payment for future gifts
                </Forms.Checkbox>
              )
            }
          }()}


          {() => {
            if (this.state.save) {
              return (
                <Forms.Input
                  name="accountName"
                  label="Saved Account Name"
                  errorText="Please enter a name for the account"
                  validation={this.saveName}
                  ref="accountName"
                />
              )
            }
          }()}

          <button className="btn one-whole" type="submit">
            {this.buttonText()} {this.icon()}
          </button>

          {() => {
            if (this.props.savedAccount.id === null) {
              let classes = [
                "outlined--bottom",
                "outlined--light"
              ]

              let style = {
                display: "inline"
              }

              // if (disabled) {
              //   classes.push("text-light-tertiary")
              //   style = {...style, ...{ cursor: "text" } }
              // } else {
                classes.push("text-dark-tertiary")
                style = {...style, ...{ cursor: "pointer" } }
              // }

              return (
                <div className="display-block soft-top text-left">
                  <h6 className={classes.join(" ")} style={style} onClick={this.props.back}>
                    Edit Gift Details
                  </h6>
                </div>
              )
            }
          }()}


        </div>


      </div>
    )
  }
}
