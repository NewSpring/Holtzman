import { Component, PropTypes } from "react"
import { connect } from "react-redux"
import { goBack } from "redux-router"

import { onBoard as onBoardActions } from "../../actions"

import SignIn from "./signin"
import ForgotPassword from "./forgot-password"


/*

  States of the OnBoard component

  1. SignIn / SignUp
  2. Forgot Password

*/
// We only care about the navigation state
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

  render () {

    const { data, errors, account, state, success, forgot } = this.props.onboard

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
