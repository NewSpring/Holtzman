import { Component, PropTypes} from "react"
import { connect } from "react-redux"

import { GraphQL } from "../../../core/graphql"
import { OnBoard } from "../../../core/blocks"


// @TODO refactor once giving is converted to sagas
import {
  modal,
  onBoard as onBoardActions,
  nav as navActions
} from "../../../core/store"


import Give from "../Give"
import { AccountType } from "../../components"

import { give as giveActions } from "../../store"

import { PrimaryButton, SecondaryButton, Guest } from "./Buttons"


function getPaymentDetails(id, dispatch) {

  let query = `
    {
      paymentDetails: allSavedPaymentAccounts(cache: false, mongoId: "${id}") {
        name
        id
        date
        payment {
          accountNumber
          paymentType
        }
      }
    }
  `
  return GraphQL.query(query)
    .then(({ paymentDetails }) => (paymentDetails[0]))
}

/*

  The give now button is presented in the following order:

  1. Give with existing account if found
  2. Give now (if signed in)
  3. Give as guest (in small text) if not signed in

*/
const map = (store) => ({
  authorized: store.onBoard.authorized,
  savedAccount: store.give.savedAccount
})
@connect(map)
export default class GiveNow extends Component {

  state = {
    paymentDetails: false,
  }

  componentDidMount(){

    const id = Meteor.userId()
    const { dispatch, savedAccount } = this.props

    if (id && !savedAccount.id) {
      getPaymentDetails(id, dispatch)
        .then(paymentDetails => {
          dispatch(giveActions.setAccount(paymentDetails))
        })
    }

  }


  buttonClasses = () => {
    let classes = ["btn"]

    if (this.props.savedAccount.id) {
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

  renderAfterLogin = () => {
    this.props.dispatch(modal.render(Give))
  }

  onClick = () => {
    if (this.props.disabled) {
      return
    }

    this.props.dispatch(giveActions.setTransactionType("default"))

    if (this.props.authorized) {
      this.props.dispatch(modal.render(Give))
    } else {
      this.props.dispatch(modal.render(OnBoard, {
        onFinished: this.renderAfterLogin
      }))

      this.props.dispatch(onBoardActions.setAccount(true))
    }

    this.props.dispatch(navActions.setLevel("MODAL"))

  }

  giveAsGuest = () => {
    if (this.props.disabled) {
      return
    }
    this.props.dispatch(giveActions.setTransactionType("guest"))
    this.props.dispatch(modal.render(Give))
    // this.props.dispatch(navActions.setLevel("MODAL"))
  }

  register = () => {
    this.props.dispatch(onBoardActions.setAccount(false))
    this.props.dispatch(modal.render(OnBoard, {
      onFinished: this.renderAfterLogin
    }))
    // this.props.dispatch(navActions.setLevel("MODAL"))

  }

  buttonText = () => {

    let text = "Give Now"
    if (this.props.text) {
      text = this.props.text
    }

    if (this.props.savedAccount.id) {
      const details = this.props.savedAccount
      let { accountNumber } = details.payment
      accountNumber = accountNumber.slice(-4).trim()

      text += ` using ${accountNumber}`

    }

    if (!this.props.authorized) {
      text = "Sign In"
    }

    return text

  }

  icon = () => {

    if (this.props.savedAccount && this.props.authorized) {
      const detail = this.props.savedAccount.payment

      if (detail.paymentType && detail.paymentType === "ACH") {
        return (
          <AccountType width="30px" height="20px" type="Bank"/>
        )
      } else if (detail.paymentType) {
        return (
          <AccountType width="30px" height="20px" type={detail.paymentType} />
        )
      }

    }

  }


  render () {

    return (
      <div>
        <PrimaryButton
          disabled={this.props.disabled}
          classes={this.props.theme || this.buttonClasses()}
          icon={this.icon()}
          text={this.buttonText()}
          onClick={this.onClick}
        />
        {() => {
          if (!this.props.authorized) {
            return (
              <SecondaryButton
                disabled={this.props.disabled}
                onClick={this.register}
              />
            )
          }

        }()}
        {() => {
          if (!this.props.authorized && !this.props.disabledGuest) {
            return (
              <Guest
                disabled={this.props.disabled}
                onClick={this.giveAsGuest}
              />
            )
          }
        }()}

      </div>

    )
  }
}
