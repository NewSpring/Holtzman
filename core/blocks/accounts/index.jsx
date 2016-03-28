import { Component, PropTypes } from "react"
import { connect } from "react-redux"

import { Loading, Error as Err } from "../../components/states"
import accountsActions from "../../store/accounts"
import modalActions from "../../store/modal"

// import Loading from "./Loading"
import SignIn from "./Signin"
import Success from "./Success"
import ForgotPassword from "./ForgotPassword"
import SuccessCreate from "./SuccessCreate"

// We only care about the accounts state
const map = (state) => ({ accounts: state.accounts })
@connect(map, {...accountsActions, ...modalActions})
export default class AccountsContainer extends Component {

  static propTypes = {
    back: PropTypes.func,
    onFinished: PropTypes.func
  }

  componentWillReceiveProps(nextProps) {
    // if logged in, go to the next action
    if (!this.props.accounts.authorized && nextProps.accounts.authorized) {
      // let the UI show the welcome
      let user = Meteor.user()
      let isOld = user && user.profile && user.profile.lastLogin < new Date()

      if (nextProps.accounts.showWelcome  && !isOld) {
        return
      }

      // follow up action
      if (this.props.onFinished) {
        return this.props.onFinished()
      }

      // close the modal
      this.props.hide()
    }
  }

  componentDidUpdate(prevProps, prevState){
    const { reset } = this.props

    if (Object.keys(this.props.accounts.errors).length) {
      setTimeout(() => {
        reset()
      }, 2000)
    }

  }

  goBack = (e) => {
    e.preventDefault();
    if (typeof window != "undefined" && window != null) {
      window.history.back()
    }
  }

  goSignIn = (e) => {
    if (e) {
      e.preventDefault();
    }

    this.props.remember()
  }

  goBackToDefaultOnBoard = (e) => {
    if (e) {
      e.preventDefault();
    }

    this.props.resetAccount()
  }

  goForgotPassword = (e) => {
    e.preventDefault();
    this.props.forgot()
  }

  signout = (e) => {
    e.preventDefault()
    Meteor.logout()

    this.props.authorize(false)
  }


  render () {

    const {
      data,
      errors,
      state,
      success,
      forgot,
      authorized,
      person,
      showWelcome,
      alternateAccounts,
      peopleWithoutAccountEmails,
      resettingAccount,
    } = this.props.accounts


    let account = this.props.accounts.account

    if (typeof this.props.account != "undefined") {
      account = this.props.account
    }


    if (Object.keys(errors).length) {
      let primaryError;
      for (let error in errors) {
        primaryError = errors[error]
        break
      }
      return <Err msg="There was an error" error={primaryError} />
    }




    if (state === "loading") {
      let msg = account ? "Signing you in..." : "Creating your account..."
      return <Loading msg={msg} />
    }


    if (forgot) {
      return (
        <ForgotPassword
          save={this.props.save}
          clear={this.props.clear}
          email={data.email}
          errors={errors}
          back={this.goSignIn}
          submit={this.props.submit}
        />
      )
    }

    if (authorized && showWelcome) {
      return (
        <Success
          person={person}
          onExit={this.props.hide}
        />
      )
    }

    if (data.personId && !authorized && resettingAccount) {
      let email = data.email
      for (let p of peopleWithoutAccountEmails) {
        if (p.id === data.personId) {
          email = p.email
          break;
        }
      }
      return (
        <SuccessCreate
          email={email}
          goBack={this.goBackToDefaultOnBoard}
        />
      )
    }

    return (
      <SignIn
        save={this.props.save}
        clear={this.props.clear}
        data={this.props.data || data}
        errors={errors}
        account={account}
        state={state}
        submit={this.props.submit}
        success={success}
        back={this.goBack}
        completeAccount={this.props.completeAccount}
        forgot={this.goForgotPassword}
        setAccount={this.props.setAccount}
        alternateAccounts={alternateAccounts}
        peopleWithoutAccountEmails={peopleWithoutAccountEmails}
      />
    )
  }
}
