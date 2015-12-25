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
          defaultValue="checking"
          ref="accountName"
        />

        <Forms.Input
          name="billing-account-number"
          label="Account Number"
          errorText="Please enter your account number"
          defaultValue={payment.accountNumber}
          ref="accountNumber"
        />
        <Forms.Input
          name="billing-routing-number"
          label="Routing Number"
          errorText="Please enter your routing number"
          defaultValue={payment.accountNumber}
          ref="routingNumber"
        />
      </div>

    )
  }

  cardFields = () => {
    const { payment } = this.props.data
    return (
      <div>
        <Forms.Input
          name="billing-cc-number"
          label="Card Number"
          errorText="Please enter your card number"
          defaultValue={payment.cardNumber}
          format={Format.creditCard}
          validation={Validate.isCreditCard}
          ref="cardNumber"
        />
        <div className="grid">
          <div className="grid__item one-half">
            <Forms.Input
              name="billing-cc-exp"
              label="Expiration Number"
              errorText="Please enter a valid expiration number"
              defaultValue={payment.expiration}
              ref="expiration"
            />
          </div>
          <div className="grid__item one-half">
            <Forms.Input
              name="cvv"
              label="CCV"
              errorText="Please enter a valid ccv number"
              defaultValue={payment.ccv}
              ref="ccv"
            />
          </div>
        </div>
      </div>

    )
  }

  render () {
    const { payment } = this.props.data
    return (
      <div>
        <div className="push-double">
          {this.props.header || this.header()}
        </div>

        <Controls.Toggle
          items={this.props.toggles || this.toggles}
          state={payment.type}
        />


        <div className="soft">
          {() => {
            // if (payment.type === "ach") {
            //   return this.bankFields()
            // } else {
              return this.cardFields()
            // }
          }()}

        </div>


        <div>
          <a href="#" tabIndex={-1} onClick={this.props.back} className="btn--small btn--dark-tertiary display-inline-block">
            Back
          </a>

          {() => {
            const { billing } = this.props.data
            let btnClasses = ["push-left"];

            if (!billing.streetAddress || !billing.city || !billing.state || !billing.zip){
              btnClasses.push("btn--disabled");
            } else {
              btnClasses.push("btn");
            }

            return (
              <button className={btnClasses.join(" ")} type="submit" onClick={this.props.submit}>
                Enter
              </button>
            )
          }()}

        </div>

      </div>
    )
  }
}
