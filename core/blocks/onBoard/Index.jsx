import { Component, PropTypes } from "react"
import { connect } from "react-redux"

import { onBoard as onBoardActions } from "../../store"

import Loading from "./Loading"
import SignIn from "./Signin"
import SignOut from "./Signout"
import ForgotPassword from "./ForgotPassword"


// We only care about the onboard state
const map = (state) => ({ onboard: state.onBoard })
@connect(map, onBoardActions)
class OnBoardContainer extends Component {

  goBack = (e) => {
    e.preventDefault();
    if (typeof window != "undefined" && window != null) {
      window.history.back()
    }
  }

  goSignIn = (e) => {
    e.preventDefault();
    this.props.remember()
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
      account,
      state,
      success,
      forgot,
      authorized
    } = this.props.onboard

    if (typeof this.props.account != "undefined") {
      account = this.props.account
    }

    if (state === "loading") {
      return (
        <Loading
          account={account}
          forgot={forgot}
        />
      )
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

    if (authorized) {
      return (
        <SignOut
          signout={this.signout}
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
        forgot={this.goForgotPassword}
        setAccount={this.props.setAccount}
      />
    )
  }
}

export default OnBoard;
