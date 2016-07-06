import { Component, PropTypes} from "react"
import { connect } from "react-apollo"
import gql from "graphql-tag";

import OnBoard from "../../../core/blocks/accounts"


// @TODO refactor once giving is converted to sagas
import {
  modal,
  accounts as accountsActions,
  nav as navActions,
} from "../../../core/store"


import { AccountType } from "../../components"

import { give as giveActions } from "../../store"

import Give from "../Give"
import ChangePayments from "../ChangePayments"

import {
  PrimaryButton,
  SecondaryButton,
  Guest as TertiaryButton,
} from "./Buttons"


const mapQueriesToProps = ({ ownProps }) => ({
  savedPayments: {
      query: gql`
        query GetSavedPaymentAccounts {
          savedPayments {
            name
            id
            date
            payment {
              accountNumber
              paymentType
            }
          }
        }
      `,
      variables: {
        // even though this is unused, we include it to trigger a recal when a person
        // logs in or logs out
        authorized: ownProps.authorized,
      }
    }
});
/*

  The give now button is presented in the following order:

  1. Give with existing account if found
  2. Give now (if signed in)
  3. Give as guest (in small text) if not signed in

*/
const mapStateToProps = (store) => ({
  authorized: store.accounts.authorized,
  savedAccount: store.give.savedAccount,
})
@connect({ mapStateToProps, mapQueriesToProps })
export default class GiveNow extends Component {

  state = {
    paymentDetails: false,
  }

  getAccount = () => {
    const { savedAccount } = this.props;
    if (savedAccount && savedAccount.id) return savedAccount;

    if (!this.props.savedPayments) return {};

    const { savedPayments } = this.props.savedPayments;
    if (!savedPayments || !savedPayments.length) return {};

    return _.sortBy(savedPayments, "date")[savedPayments.length - 1];
  }

  buttonClasses = () => {
    let classes = ["btn"]

    if (this.props.savedPayments.savedPayments) {
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

    if (this.props.savedPayments.savedPayments) {
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
        coverHeader: true
      }))

      this.props.dispatch(accountsActions.setAccount(true))

    }

    this.props.dispatch(navActions.setLevel("MODAL"))

  }

  giveAsGuest = () => {
    if (this.props.disabled) return;

    this.props.dispatch(giveActions.setTransactionType("guest"))
    this.props.dispatch(modal.render(Give))
    // this.props.dispatch(navActions.setLevel("MODAL"))
  }

  register = () => {
    this.props.dispatch(accountsActions.setAccount(false))
    this.props.dispatch(modal.render(OnBoard, {
      onFinished: this.renderAfterLogin,
      coverHeader: true
    }))
    // this.props.dispatch(navActions.setLevel("MODAL"))

  }

  changePayments = (e) => {
    e.preventDefault();

    this.props.dispatch(modal.render(ChangePayments, {
      // onFinished: () => {},
      savedAccounts: this.props.savedPayments.savedPayments,
      currentAccount: this.getAccount(),
    }));
  }

  buttonText = () => {

    let text = "Give Now"
    if (this.props.text) {
      text = this.props.text
    }
    const { savedPayments } = this.props.savedPayments;
    if (savedPayments && savedPayments.length && !this.props.hideCard) {

      const details = this.getAccount()
      let { accountNumber } = details.payment
      accountNumber = accountNumber.slice(-4).trim()
      text = `Review Using ${accountNumber}`

    }

    if (!Meteor.userId()) {
      text = "Sign In"
    }

    return text

  }

  icon = () => {
    if (this.props.savedPayments.savedPayments && this.props.authorized && !this.props.hideCard) {
      // const detail = this.props.savedAccount[Object.keys(this.props.savedAccount)[0]]
      const detail = this.getAccount()
      if (detail.payment && detail.payment.paymentType === "ACH") {
        return (
          <AccountType width="30px" height="21px" type="Bank"/>
        )
      } else if (detail.payment && detail.payment.paymentType) {
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
            const { savedPayments } = this.props.savedPayments;
            if (savedPayments && savedPayments.length && !this.props.hideCard && Meteor.userId()) {
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
