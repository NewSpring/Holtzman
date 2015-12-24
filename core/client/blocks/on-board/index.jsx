import { Component, PropTypes } from "react"
import { connect } from "react-redux"
import { goBack } from "redux-router"

import { onBoard as onBoardActions } from "../../actions"

import Loading from "./on-board.Loading"
import SignIn from "./on-board.Signin"
import SignOut from "./on-board.SignOut"
import ForgotPassword from "./on-board.ForgotPassword"


/*

  States of the OnBoard component

  1. SignIn / SignUp
  2. Forgot Password

*/
// We only care about the onboard state
function mapStateToProps(state) {
  return {
    onboard: state.onBoard
  }
}

@connect(mapStateToProps, onBoardActions)
class OnBoard extends Component {


  goBack = (e) => {
    e.preventDefault();
    goBack()
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

    const { data, errors, account, state, success, forgot, authorized } = this.props.onboard

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
          email={data.email}
          errors={errors}
          account={account}
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
        data={data}
        errors={errors}
        account={account}
        state={state}
        submit={this.props.submit}
        success={success}
        back={this.goBack}
        forgot={this.goForgotPassword}
      />
    )
  }
}

export default OnBoard;
