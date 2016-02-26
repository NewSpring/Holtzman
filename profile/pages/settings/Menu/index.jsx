import { Component, PropTypes} from "react"
import { Link } from "react-router"
import { VelocityComponent } from "velocity-react"

export default class Menu extends Component {

  signout = (e) => {
    e.preventDefault()

    Meteor.logout()
  }

  onClick = (e) => {
    if (Meteor.isCordova) {
      if (cordova.InAppBrowser && cordova.InAppBrowser.open) {
        e.preventDefault()
        cordova.InAppBrowser.open(e.currentTarget.href, "_blank")
      }
    }
  }

  render() {
    return (
    <VelocityComponent
      animation={"transition.fadeIn"}
      duration={500}
      runOnMount={true}
    >
      <div className="locked-ends@lap-and-up locked-sides@lap-and-up background--light-secondary scrollable">
        <section className="hard ">
          <div className="soft text-center background--light-primary outlined--light outlined--bottom" style={{position: "relative"}}>
            <h5 className="soft-left display-inline-block flush">Settings</h5>
            <Link to="/profile" className="visuallyhidden@lap-and-up soft locked-top locked-right floating">
              <h6 className="plain floating__item flush">Done</h6>
            </Link>
          </div>
          <div className="outlined--light outlined--top one-whole push-top"></div>
          <div className="background--light-primary outlined--light outlined--bottom text-dark-secondary">
            <Link to="/profile/settings/personal-details" className="plain text-dark-secondary">
              <div className="push-left soft-ends soft-right text-left outlined--light outlined--bottom">
                <h6 className="soft-half-left flush display-inline-block">Personal Details</h6>
                <i className="float-right icon-arrow-next"></i>
              </div>
            </Link>
            <Link to="/profile/settings/home-address" className="plain text-dark-secondary">
              <div className="push-left soft-ends soft-right text-left outlined--light outlined--bottom">
                <h6 className="soft-half-left flush display-inline-block">My Address</h6>
                <i className="float-right icon-arrow-next"></i>
              </div>
            </Link>
            <Link to="/profile/settings/change-password" className="plain text-dark-secondary">
              <div className="push-left soft-ends soft-right text-left">
                <h6 className="soft-half-left flush display-inline-block">Change Password</h6>
                <i className="float-right icon-arrow-next"></i>
              </div>
            </Link>
          </div>
          <div className="outlined--light outlined--top one-whole push-top"></div>
          <div className="background--light-primary outlined--light outlined--bottom text-dark-secondary">
            <Link to="/profile/settings/saved-accounts" className="plain text-dark-secondary">
              <div className="push-left soft-ends soft-right text-left outlined--light outlined--bottom">
                <h6 className="soft-half-left flush display-inline-block">Saved Accounts</h6>
                <i className="float-right icon-arrow-next"></i>
              </div>
            </Link>
            <Link to="/give/recurring" className="plain text-dark-secondary">
              <div className="push-left soft-ends soft-right text-left outlined--light outlined--bottom">
                <h6 className="soft-half-left flush display-inline-block">Recurring Gifts</h6>
                <i className="float-right icon-arrow-next"></i>
              </div>
            </Link>
            <Link to="/give/history" className="plain text-dark-secondary">
              <div className="push-left soft-ends soft-right text-left">
                <h6 className="soft-half-left flush display-inline-block">Giving History</h6>
                <i className="float-right icon-arrow-next"></i>
              </div>
            </Link>
          </div>
          <div className="outlined--light outlined--top one-whole push-top"></div>
          <div className="background--light-primary outlined--light outlined--bottom text-dark-secondary">
            <a onClick={this.onClick} href="//newspring.cc/about" target="_blank" className="plain text-dark-secondary">
              <div className="push-left soft-ends soft-right text-left outlined--light outlined--bottom">
                <h6 className="soft-half-left flush display-inline-block">About Us</h6>
                <i className="float-right icon-arrow-next"></i>
              </div>
            </a>
            <Link to="/profile/settings/privacy-policy" className="plain text-dark-secondary">
              <div className="push-left soft-ends soft-right text-left">
                <h6 className="soft-half-left flush display-inline-block">Privacy Policy</h6>
                <i className="float-right icon-arrow-next"></i>
              </div>
            </Link>
          </div>
          <div className="one-whole ratio--landscape floating">
            <button onClick={this.signout} className="h6 plain text-dark-secondary floating__item">Sign Out</button>
          </div>
        </section>
      </div>
    </VelocityComponent>

    )
  }
}
