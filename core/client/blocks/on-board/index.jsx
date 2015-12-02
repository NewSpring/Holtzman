import React, { PropTypes } from "react"

import SignIn from "./signin"
import ForgotPassword from "./forgot-password"

/*

  States of the OnBoard component

  1. SignIn / SignUp
  2. Forgot Password

*/
class OnBoard extends React.Component {

  constructor(props) {
    super(props);
    this.email = "";
    this.state = {
      showForgotPassword: false
    }
  }

  goPassword = (e) => {
    e.preventDefault();
    this.setState({showForgotPassword: true})
  }

  goSignIn = (e) => {
    e.preventDefault();
    this.setState({showForgotPassword: false})
  }

  saveEmail = (email) => {
    this.email = email;
  }

  render () {

    if (this.state.showForgotPassword) {
      return (
        <ForgotPassword
          saveEmail={this.saveEmail}
          email={this.email} back={this.goSignIn}
        />
      )
    }

    return (
      <SignIn
        saveEmail={this.saveEmail}
        email={this.email}
        back={this.goPassword}
      />
    )
  }
}

export default OnBoard;
