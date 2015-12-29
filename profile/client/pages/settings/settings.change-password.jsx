import { Component, PropTypes} from "react"
import { Link } from "react-router"
import { connect } from "react-redux"

import { nav } from "../../../../core/client/actions"
import { Forms } from "../../../../core/client/components"

@connect()
export default class ChangePassword extends Component {

  componentWillMount(){
    this.props.dispatch(nav.setLevel("CONTENT"))
  }

  componentWillUnmount(){
    this.props.dispatch(nav.setLevel("TOP"))
  }


  render () {
    return (
      <div className="one-whole text-center push-double-top@lap-and-up">
        <Forms.Form
          id="reset-password"
          classes={["soft", "one-whole", "two-thirds@portable", "one-half@anchored", "display-inline-block"]}
        >
          <div className="push-double">
            <h4 className="text-center">
              Change Password
            </h4>
          </div>

          <Forms.Input
            name="current-password"
            label="Current Password"
            ref="current-password"
            type="password"
          />

          <Forms.Input
            name="new-password"
            label="New Password"
            ref="new-password"
            type="password"
          />

          <Link to="/profile/settings" tabIndex={-1} className="btn--small btn--dark-tertiary display-inline-block">
            Back
          </Link>

          {() => {
            let btnClasses = ["push-left"];
            let ready = true
            if (!ready){
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
