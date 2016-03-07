import { Component, PropTypes} from "react"
import { connect } from "react-redux"

import { GraphQL } from "../../../core/graphql"
import OnBoard from "../../../core/blocks/onBoard"


// @TODO refactor once giving is converted to sagas
import {
  modal,
  onBoard as onBoardActions,
  nav as navActions,
  collections as collectionActions
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
    .then(({ paymentDetails }) => (paymentDetails))
}


function prefillRedux(dispatch) {
  Tracker.autorun((computation) => {

    Meteor.subscribe("recently-liked")

    if (Meteor.userId()) {
      getPaymentDetails(Meteor.userId(), dispatch)
      computation.stop()
    }

  });
}

/*

  The give now button is presented in the following order:

  1. Give with existing account if found
  2. Give now (if signed in)
  3. Give as guest (in small text) if not signed in

*/
const map = (store) => ({
  authorized: store.onBoard.authorized,
  savedAccount: store.collections.savedAccounts
})
@connect(map)
export default class GiveNow extends Component {

  state = {
    paymentDetails: false,
  }

  componentDidMount(){

    const id = Meteor.userId()
    const { dispatch, savedAccount } = this.props

    if (id && (!savedAccount || !Object.keys(savedAccount).length)) {
      getPaymentDetails(id, dispatch)
        .then(paymentDetails => {

          dispatch(collectionActions.upsertBatch(
            "savedAccounts", paymentDetails, "id"
          ))

        })
    } else {
      prefillRedux(dispatch)
    }

  }

  getAccount = () => {
    let account = {}
    if (this.props.savedAccount && Object.keys(this.props.savedAccount).length) {
      let accounts = []
      for (let acc in this.props.savedAccount) {
        accounts.push(this.props.savedAccount[acc])
      }
      account = _.sortBy(accounts, "date")[accounts.length - 1]
    }

    return account
  }

  buttonClasses = () => {
    let classes = ["btn"]

    if (this.props.savedAccount && Object.keys(this.props.savedAccount).length) {
      classes.push("has-card")
    }

    if (this.props.disabled && this.props.authorized && Meteor.userId()) {
      classes.push("btn--disabled")
    }
    if (this.props.classes) {
      classes = classes.concat(this.props.classes)
    }

    return classes.join(" ")
  }

  renderAfterLogin = () => {
    if (this.props.disabled) {
      return this.props.dispatch(modal.hide())
    }

    this.props.dispatch(modal.render(Give))
  }

  onClick = (e) => {

    let keepGoing = true
    if (this.props.onClick) {
      keepGoing = this.props.onClick(e)
    }

    if (!keepGoing) {
      return
    }

    this.props.dispatch(giveActions.setTransactionType("default"))

    if (this.props.savedAccount && Object.keys(this.props.savedAccount).length) {
      // const details = this.props.savedAccount[Object.keys(this.props.savedAccount)[0]]
      const details = this.getAccount()
      this.props.dispatch(giveActions.setAccount(details))
    }

    if (this.props.authorized && Meteor.userId() && !this.props.disabled) {
      this.props.dispatch(modal.render(Give))
    } else if (!this.props.authorized && !Meteor.userId()){

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

    if (this.props.savedAccount && Object.keys(this.props.savedAccount).length && !this.props.hideCard) {

      // const details = this.props.savedAccount[Object.keys(this.props.savedAccount)[0]]
      const details = this.getAccount()
      let { accountNumber } = details.payment
      accountNumber = accountNumber.slice(-4).trim()

      text += ` using ${accountNumber}`

    }

    if (!this.props.authorized && !Meteor.userId()) {
      text = "Sign In"
    }

    return text

  }

  icon = () => {

    if (this.props.savedAccount && Object.keys(this.props.savedAccount).length && this.props.authorized && !this.props.hideCard) {
      // const detail = this.props.savedAccount[Object.keys(this.props.savedAccount)[0]]
      const detail = this.getAccount()
      if (detail.paymentType && detail.payment.paymentType === "ACH") {
        return (
          <AccountType width="30px" height="21px" type="Bank"/>
        )
      } else if (detail.payment.paymentType) {
        return (
          <AccountType width="30px" height="21px" type={detail.payment.paymentType} />
        )
      }

    }

  }


  render () {

    try {
      return (
        <span>
          <PrimaryButton
            classes={this.props.theme || this.buttonClasses()}
            icon={this.icon()}
            text={this.buttonText()}
            onClick={this.onClick}
            value={this.props.value}
            style={this.props.style || {}}
            dataId={this.props.dataId}
          />
          {() => {
            if (!this.props.authorized && !Meteor.userId()) {
              return (
                <SecondaryButton

                  onClick={this.register}
                />
              )
            }

          }()}
          {() => {
            if (!this.props.authorized && !this.props.disabledGuest && !Meteor.userId()) {
              return (
                <Guest

                  onClick={this.giveAsGuest}
                />
              )
            }
          }()}

        </span>

      )
    } catch (e) {
      console.log(e)
    }

  }
}
