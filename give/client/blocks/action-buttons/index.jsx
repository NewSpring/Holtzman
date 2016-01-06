import { Component, PropTypes} from "react"
import { connect } from "react-redux"
import ReactMixin from "react-mixin"

import { OnBoard } from "../../../../core/client/blocks"

import {
  modal,
  onBoard as onBoardActions,
  nav as navActions
} from "../../../../core/client/actions"


import Give from "../give"
import { AccountType } from "../../components"
import { PaymentDetails } from "../../../lib/collections"

import { give as giveActions } from "../../actions"

/*

  The give now button is presented in the following order:

  1. Give with existing account if found
  2. Give now (if signed in)
  3. Give as guest (in small text) if not signed in

*/
@connect()
@ReactMixin.decorate(ReactMeteorData)
export default class GiveNow extends Component {

  getMeteorData() {
    let paymentDetails

    Meteor.subscribe("paymentDetails")
    let details = PaymentDetails.find().fetch()
    return {
      paymentDetails: details[0],
      authorized: Meteor.user()
    }
  }

  buttonClasses = () => {
    let classes = ["btn"]

    if (this.data.paymentDetails) {
      classes.push("has-card")
    }

    if (this.props.disabled) {
      classes.push("btn--disabled")
    }
    if (this.props.classes) {
      classes = classes.concat(this.props.classes)
    }

    return classes.join(" ")
  }

  click = () => {
    if (this.props.disabled) {
      return
    }

    this.props.dispatch(giveActions.setTransactionType("default"))

    if (this.data.authorized) {
      this.props.dispatch(modal.render(Give))
    } else {
      this.props.dispatch(modal.render(OnBoard))

      this.props.dispatch(onBoardActions.setAccount(true))
    }

    this.props.dispatch(navActions.setLevel("MODAL"))

    if (this.data.paymentDetails) {
      this.props.dispatch(giveActions.setAccount(
        this.data.paymentDetails.Id
      ))
    }

  }

  giveAsGuest = () => {
    if (this.props.disabled) {
      return
    }
    this.props.dispatch(giveActions.setTransactionType("guest"))
    this.props.dispatch(modal.render(Give))
    this.props.dispatch(navActions.setLevel("MODAL"))
  }

  register = () => {
    this.props.dispatch(modal.render(OnBoard))
    this.props.dispatch(onBoardActions.setAccount(false))
    this.props.dispatch(navActions.setLevel("MODAL"))

  }

  buttonText = () => {

    let text = "Give Now"

    if (this.data.paymentDetails) {
      const details = this.data.paymentDetails
      let { AccountNumberMasked } = details.FinancialPaymentDetail
      AccountNumberMasked = AccountNumberMasked.slice(-4).trim()

      text += ` using ${AccountNumberMasked}`

    }

    if (!this.data.authorized) {
      text = "Sign In"
    }

    return text

  }

  icon = () => {

    if (this.data.paymentDetails) {
      const details = this.data.paymentDetails

      if (details.FinancialPaymentDetail.CurrencyTypeValue &&
        details.FinancialPaymentDetail.CurrencyTypeValue.Description === "Credit Card"
      ) {
        return (
          // replace with SVG
          <AccountType width="30px" height="20px" type={details.FinancialPaymentDetail.CreditCardTypeValue.Value}/>
        )
      } else {

        return (
          // replace with SVG
          <AccountType width="30px" height="20px" type="Bank"/>
        )

      }
    }

  }

  secondaryButton = () => {

    let classes = [
      "btn--thin",
      "btn--small",
      "display-inline-block",
      "push-left@lap-and-up",
      "push-half-left@handheld"
    ]
    let style = {}

    if (this.props.disabled) {
      classes.push("btn--disabled")
      // this should be fixed in junction
      style = {
        backgroundColor: "transparent !important" // handle hover :(
      }
    } else {
      classes.push("btn--dark-tertiary")
    }



    if (!this.data.authorized) {
      return (
        <button style={style} disabled={this.props.disabled} className={classes.join(" ")} onClick={this.register}>
          Register
        </button>
      )
    }
  }


  render () {
    return (
      <div>

        <button
          className={this.props.theme || this.buttonClasses()}
          styles={this.props.styles || {}}
          onClick={this.click}
          disabled={this.props.disabled}
        >
          {this.buttonText()} {this.icon()}
        </button>

        {this.secondaryButton()}

        {() => {
          let classes = [
            "outlined--bottom",
            "outlined--light"
          ]

          let style = {
            display: "inline"
          }

          if (this.props.disabled) {
            classes.push("text-light-tertiary")
            style = {...style, ...{ cursor: "text" } }
          } else {
            classes.push("text-dark-tertiary")
            style = {...style, ...{ cursor: "pointer" } }
          }

          if (!this.data.authorized && !this.props.disabledGuest){
            return (
              <div className="display-block soft-half-top">
                <h6 className={classes.join(" ")} style={style} onClick={this.giveAsGuest}>
                  Give as Guest
                </h6>
              </div>

            )
          }
        }()}
      </div>

    )
  }
}
