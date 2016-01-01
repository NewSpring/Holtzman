import { Component, PropTypes} from "react"
import { Link } from "react-router"

export default class Menu extends Component {

  signout = (e) => {
    e.preventDefault()

    Meteor.logout()
  }

  render() {
    return (
      <div className="locked-ends locked-sides background--light-secondary scrollable">
        <section className="hard ">
          <div className="soft text-center background--light-primary outlined--light outlined--bottom">
            <h5 className="soft-left display-inline-block flush">Settings</h5>
            <Link to="/profile" className="float-right h6 flush plain visuallyhidden@lap-and-up">Done</Link>
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
            <Link to="/profile/settings/saved-accounts" className="plain text-dark-secondary">
              <div className="push-left soft-ends soft-right text-left outlined--light outlined--bottom">
                <h6 className="soft-half-left flush display-inline-block">Saved Accounts</h6>
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
            <a href="//newspring.cc/about" target="_blank" className="plain text-dark-secondary">
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

    )
  }
}
