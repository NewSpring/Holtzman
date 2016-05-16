import { Component, PropTypes} from "react"
import { connect } from "react-redux"

import { GraphQL } from "../../../core/graphql"
import OnBoard from "../../../core/blocks/accounts"


// @TODO refactor once giving is converted to sagas
import {
  modal,
  accounts as accountsActions,
  nav as navActions,
  collections as collectionActions
} from "../../../core/store"



import { AccountType } from "../../components"

import { give as giveActions } from "../../store"

import Give from "../Give"
import ChangePayments from "../ChangePayments"

import { PrimaryButton, SecondaryButton, Guest as TertiaryButton } from "./Buttons"


function getPaymentDetails(id) {

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

/*

  The give now button is presented in the following order:

  1. Give with existing account if found
  2. Give now (if signed in)
  3. Give as guest (in small text) if not signed in

*/
const map = (store) => ({
  authorized: store.accounts.authorized,
  savedAccounts: store.collections.savedAccounts,
  savedAccount: store.give.savedAccount,
})
@connect(map)
export default class GiveNow extends Component {

  state = {
    paymentDetails: false,
  }

  componentDidMount(){
    this.getData();
  }

  getData = () => {
    const id = Meteor.userId()
    const { dispatch, savedAccounts } = this.props

    if (id && (!savedAccounts || !Object.keys(savedAccounts).length)) {
      getPaymentDetails(id, dispatch)
        .then(paymentDetails => {

          dispatch(collectionActions.upsertBatch(
            "savedAccounts", paymentDetails, "id"
          ))

        })
    }
  }

  componentWillReceiveProps(nextProps){
    if (!this.props.authorized && nextProps.authorized) {
      this.getData();
    }
  }

  getAccount = () => {

    if (this.props.savedAccount && this.props.savedAccount.id) {
      return this.props.savedAccount
    }

    let account = {}
    if (this.props.savedAccounts && Object.keys(this.props.savedAccounts).length) {
      let accounts = []
      for (let acc in this.props.savedAccounts) {
        accounts.push(this.props.savedAccounts[acc])
      }
      account = _.sortBy(accounts, "date")[accounts.length - 1]
    }

    return account
  }

  buttonClasses = () => {
    let classes = ["btn"]

    if (this.props.savedAccounts && Object.keys(this.props.savedAccounts).length) {
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

    if (this.props.savedAccounts && Object.keys(this.props.savedAccounts).length) {
      // const details = this.props.savedAccount[Object.keys(this.props.savedAccount)[0]]
      const details = this.getAccount()
      this.props.dispatch(giveActions.setAccount(details))
    }

    if (Meteor.userId() && !this.props.disabled) {
      this.props.dispatch(modal.render(Give))
    } else if (!Meteor.userId()){

      this.props.dispatch(modal.render(OnBoard, {
        onSignin: this.getPaymentDetailsAfterLogin,
        onFinished: this.renderAfterLogin,
      }))

      this.props.dispatch(accountsActions.setAccount(true))

    }

    this.props.dispatch(navActions.setLevel("MODAL"))

  }

  getPaymentDetailsAfterLogin = () => {
    const { dispatch } = this.props
    const id = Meteor.userId();
    return getPaymentDetails(id)
      .then(paymentDetails => {
        if (!paymentDetails.length) {
          return
        }

        dispatch(collectionActions.upsertBatch(
          "savedAccounts", paymentDetails, "id"
        ));

        return paymentDetails
      })
      .then((paymentDetails) => {
        if (paymentDetails) {
          const details = _.sortBy(paymentDetails, "date")[paymentDetails.length - 1]
          this.props.dispatch(giveActions.setAccount(details))
        }
      });
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
    this.props.dispatch(accountsActions.setAccount(false))
    this.props.dispatch(modal.render(OnBoard, {
      onFinished: this.renderAfterLogin
    }))
    // this.props.dispatch(navActions.setLevel("MODAL"))

  }

  changePayments = (e) => {
    e.preventDefault();

    let accounts = [];
    for (let account in this.props.savedAccounts) {
      accounts.push(this.props.savedAccounts[account]);
    }

    this.props.dispatch(modal.render(ChangePayments, {
      // onFinished: () => {},
      savedAccounts: accounts,
      currentAccount: this.getAccount(),
    }));
  }

  buttonText = () => {

    let text = "Give Now"
    if (this.props.text) {
      text = this.props.text
    }

    if (this.props.savedAccounts && Object.keys(this.props.savedAccounts).length && !this.props.hideCard) {

      // const details = this.props.savedAccount[Object.keys(this.props.savedAccount)[0]]
      const details = this.getAccount()
      let { accountNumber } = details.payment
      accountNumber = accountNumber.slice(-4).trim()
      text = "Review"
      text += ` Using ${accountNumber}`

    }

    if (!Meteor.userId()) {
      text = "Sign In"
    }

    return text

  }

  icon = () => {

    if (this.props.savedAccounts && Object.keys(this.props.savedAccounts).length && this.props.authorized && !this.props.hideCard) {
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
          {(() => {
            if (!this.props.authorized && !Meteor.userId()) {
              return (
                <SecondaryButton

                  onClick={this.register}
                />
              )
            }

          })()}
          {(() => {
            if (!this.props.disabledGuest && !Meteor.userId()) {
              return (
                <TertiaryButton
                  disabled={this.props.disabled}
                  onClick={this.giveAsGuest}
                />
              )
            }
          })()}

          {(() => {
            if (this.props.savedAccounts && Object.keys(this.props.savedAccounts).length && !this.props.hideCard) {
              return (
                <TertiaryButton
                  onClick={this.changePayments}
                  text={"Change payment account"}
                />
              )
            }
          })()}

        </span>

      )
    } catch (e) {
      console.log(e)
      return null
    }

  }
}
