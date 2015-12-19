import { Component, PropTypes } from "react"
import { connect } from "react-redux"

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

  state = {
    showForgotPassword: false
  }

  goPassword = (e) => {
    e.preventDefault();
    this.setState({showForgotPassword: true})
  }

  goSignIn = (e) => {
    e.preventDefault();
    this.setState({showForgotPassword: false})
  }

  render () {

    const { data, errors, account, state, success } = this.props.onboard

    if (this.state.showForgotPassword) {
      return (
        <ForgotPassword
          save={this.props.save}
          email={data.email}
          errors={errors}
          account={account}
          back={this.goSignIn}
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
        success={success}
        back={this.goPassword}
      />
    )
  }
}

export default OnBoard;
