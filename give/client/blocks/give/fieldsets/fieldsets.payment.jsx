import { Component, PropTypes } from "react"
import ReactDom from "react-dom"
import { connect } from "react-redux"
import { goBack } from "redux-router"


import { Controls, Forms } from "../../../../../core/client/components"
import { Validate } from "../../../../../core/lib"
import { Format } from "../../../../../core/lib"


export default class Payment extends Component {


  header = () => {
    return (
      <h4 className="text-center">
        Payment Details
      </h4>
    )
  }

  toggles = [
    { label: "Bank Account" },
    { label: "Credit Card" }
  ]


  bankFields = () => {
    const { payment } = this.props.data
    return (
      <div>
        <Forms.Input
          name="billing-account-name"
          type="hidden"
          classes="visuallyhidden"
          ref="accountName"
        />

        <Forms.Input
          id="accountNumber"
          name="billing-account-number"
          label="Account Number"
          errorText="Please enter your account number"
          defaultValue={payment.accountNumber}
          validation={this.saveData}
          ref="accountNumber"
        />
        <Forms.Input
          id="routingNumber"
          name="billing-routing-number"
          label="Routing Number"
          errorText="Please enter your routing number"
          defaultValue={payment.accountNumber}
          validation={this.saveData}
          ref="routingNumber"
        />
      </div>

    )
  }

  saveData = (value, target) => {
    const { id } = target

    let isValid = false
    const validationMap = {
      accountNumber: (value) => (value.length > 0),
      routingNumber: (value) => (value.length > 0),
      cardNumber: Validate.isCreditCard,
      expiration: Validate.isExpiry,
      ccv: Validate.isCCV
    }

    console.log(validationMap, id)
    isValid = validationMap[id](value)

    if (isValid) {
      this.props.save({ payment: { [id]: value }})
    } else {
      this.props.clear("payment", id)
    }

    return isValid

  }

  cardFields = () => {
    const { payment } = this.props.data
    return (
      <div>
        <Forms.Input
          name="billing-cc-number"
          id="cardNumber"
          label="Card Number"
          errorText="Please enter your card number"
          defaultValue={payment.cardNumber}
          format={Format.creditCard}
          validation={this.saveData}
          ref="cardNumber"
        />
        <div className="grid">
          <div className="grid__item one-half">
            <Forms.Input
              id="expiration"
              name="billing-cc-exp"
              label="Expiration Number"
              errorText="Please enter a valid expiration number"
              defaultValue={payment.expiration}
              validation={this.saveData}
              ref="expiration"
            />
          </div>
          <div className="grid__item one-half">
            <Forms.Input
              id="ccv"
              name="cvv"
              label="CCV"
              errorText="Please enter a valid ccv number"
              defaultValue={payment.ccv}
              validation={this.saveData}
              ref="ccv"
            />
          </div>
        </div>
      </div>

    )
  }

  toggle = () => {
    let type = "ach"
    if (this.props.data.payment.type === type) {
      type = "cc"
    }

    this.props.save({ payment: { type } })
  }

  render () {
    const { payment } = this.props.data
    return (
      <div>
        <div className="push-double">
          {this.props.header || this.header()}
        </div>

        {this.props.children}

        <Controls.Toggle
          items={this.props.toggles || this.toggles}
          state={payment.type === "ach"}
          toggle={this.toggle}
        />


        <div className="soft">
          {() => {
            if (payment.type === "ach") {
              return this.bankFields()
            } else {
              return this.cardFields()
            }
          }()}

        </div>


        <div>
          <a href="#" tabIndex={-1} onClick={this.props.back} className="btn--small btn--dark-tertiary display-inline-block">
            Back
          </a>

          {() => {
            const { billing } = this.props.data
            let btnClasses = ["push-left"];

            const ach = (payment.type === "ach" && payment.account && payment.routing)
            const cc = (payment.type === "cc" && payment.cardNumber && payment.expiration && payment.ccv)


            let submit = this.props.sumbit
            if (ach || cc){
              btnClasses.push("btn")
              submit = this.props.sumbit
            } else {
              btnClasses.push("btn--disabled");
              submit = (e) => (e.preventDefault())
            }

            return (
              <button  className={btnClasses.join(" ")} type="submit" onClick={submit}>
                Enter
              </button>
            )
          }()}

        </div>

      </div>
    )
  }
}
