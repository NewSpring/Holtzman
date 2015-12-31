import { Component, PropTypes} from "react"
import { Link } from "react-router"
import { connect } from "react-redux"
import { VelocityComponent } from "velocity-react"


import { nav } from "../../../../core/client/actions"
import { Forms } from "../../../../core/client/components"
import { WindowLoading } from "../../../../core/client/components/loading"

import { reset } from "../../../../rock/client/methods/auth"

@connect()
export default class ChangePassword extends Component {

  state = {
    current: null,
    newP: null,
    newPDup: null,
    state: "default",
  }

  componentWillMount(){
    this.props.dispatch(nav.setLevel("CONTENT"))
  }

  componentWillUnmount(){
    this.props.dispatch(nav.setLevel("TOP"))
  }

  submit = (e) => {
    e.preventDefault()
    this.setState({ state: "loading" })

    reset(this.state.current, this.state.newP, (err, result) => {
      if (err) {
        this.setState({ state: "error", err: err })
        setTimeout(() => {
          this.setState({ state: "default"})
        }, 5000)
        return
      }


      this.setState({ state: "success" })

      setTimeout(() => {
        this.setState({ state: "default"})
      }, 5000)

    })


  }

  save = (value, input) => {
    const { id } = input

    if (id === "newPDup" && this.state.newP && this.state.newP != value) {
      return false
    }

    if (id === "newP" && this.state.newPDup && this.state.newPDup != value) {
      return false
    }

    this.setState({[id]: value})

    return true
  }


  render () {

    if (this.state.state === "error") {

      return (
        <VelocityComponent
          animation={"transition.fadeIn"}
          runOnMount={true}
        >
          <WindowLoading classes={["background--alert"]}>
            <div className="locked-top locked-bottom one-whole floating">
              <div className="floating__item">
                <h4 className="text-light-primary">Looks like there was a problem :(</h4>
                <p className="text-light-primary">{this.state.err.error}</p>
              </div>
            </div>
          </WindowLoading>
        </VelocityComponent>
      )
    }

    if (this.state.state === "loading") {
      return (
        <VelocityComponent
          animation={"transition.fadeIn"}
          runOnMount={true}
        >
          <WindowLoading classes={["background--primary"]}>
            <div className="locked-top locked-bottom one-whole floating">
              <div className="floating__item">
                <h4 className="text-light-primary">Updating your password...</h4>
              </div>
            </div>
          </WindowLoading>
        </VelocityComponent>
      )
    }

    if (this.state.state === "success") {
      return (
        <div className="one-whole text-center push-double-top@lap-and-up">
          <h4>Your password has been updated!</h4>
        </div>
      )
    }

    return (
      <div className="one-whole text-center push-double-top@lap-and-up">
        <Forms.Form
          id="reset-password"
          classes={["soft", "one-whole", "two-thirds@portable", "one-half@anchored", "display-inline-block"]}
          submit={this.submit}
        >
          <div className="push-double">
            <h4 className="text-center">
              Change Password
            </h4>
          </div>

          <Forms.Input
            name="current"
            label="Current Password"
            validation={this.save}
            type="password"
          />

          <Forms.Input
            name="newP"
            label="New Password"
            validation={this.save}
            errorText="New password does not match"
            type="password"
          />

          <Forms.Input
            name="newPDup"
            label="Repeat New Password"
            validation={this.save}
            errorText="New password does not match"
            type="password"
          />

          <Link to="/profile/settings" tabIndex={-1} className="btn--small btn--dark-tertiary display-inline-block">
            Back
          </Link>

          {() => {
            let btnClasses = ["push-left"];
            const { current, newP, newPDup } = this.state
            if (!current || !newP || !newPDup){
              btnClasses.push("btn--disabled");
            } else {
              btnClasses.push("btn");
            }

            return (
              <button className={btnClasses.join(" ")}>
                Enter
              </button>
            )
          }()}
        </Forms.Form>
      </div>
    )
  }
}
