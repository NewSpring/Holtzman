import { Component, PropTypes } from "react"
import { connect } from "react-redux"

import { Loading, Error } from "../../components/states"
import onBoardActions from "../../store/onBoard"

// import Loading from "./Loading"
import SignIn from "./Signin"
import SignOut from "./Signout"
import ForgotPassword from "./ForgotPassword"

// We only care about the onboard state
const map = (state) => ({ onboard: state.onBoard })
@connect(map, onBoardActions)
export default class OnBoardContainer extends Component {

  componentDidUpdate(prevProps, prevState){
    const { reset } = this.props

    if (Object.keys(this.props.onboard.errors).length) {
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
      state,
      success,
      forgot,
      authorized
    } = this.props.onboard

    let account = this.props.onboard.account

    if (typeof this.props.account != "undefined") {
      account = this.props.account
    }

    if (state === "loading") {
      let msg = account ? "Signing you in..." : "Creating your account..."
      return <Loading msg={msg} />
    }

    if (Object.keys(errors).length) {
      let primaryError;
      for (let error in errors) {
        primaryError = errors[error]
        break
      }

      return <Error msg={primaryError} />
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
