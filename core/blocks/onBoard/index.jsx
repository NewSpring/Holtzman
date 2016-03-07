import { Component, PropTypes } from "react"
import { connect } from "react-redux"

import { Loading, Error as Err } from "../../components/states"
import onBoardActions from "../../store/onBoard"
import modalActions from "../../store/modal"

// import Loading from "./Loading"
import SignIn from "./Signin"
import Success from "./Success"
import ForgotPassword from "./ForgotPassword"

// We only care about the onboard state
const map = (state) => ({ onboard: state.onBoard })
@connect(map, {...onBoardActions, ...modalActions})
export default class OnBoardContainer extends Component {

  static propTypes = {
    back: PropTypes.func,
    onFinished: PropTypes.func
  }

  componentWillReceiveProps(nextProps) {
    // if logged in, go to the next action
    if (!this.props.onboard.authorized && nextProps.onboard.authorized) {
      // let the UI show the welcome
      let user = Meteor.user()
      let isOld = user && user.profile && user.profile.lastLogin < new Date()

      if (nextProps.onboard.showWelcome  && !isOld) {
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
    if (e) {
      e.preventDefault();
    }

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
      authorized,
      person,
      showWelcome
    } = this.props.onboard


    let account = this.props.onboard.account

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
