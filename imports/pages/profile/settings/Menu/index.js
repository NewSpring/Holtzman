import { Component, PropTypes } from "react";
import ReactMixin from "react-mixin";
import { connect } from "react-apollo";
import gql from "graphql-tag";
import { Link } from "react-router";

import Headerable from "../../../../mixins/mixins.Header";

import {
  accounts as accountsActions,
  nav as navActions,
} from "../../../../store";

import inAppLink from "../../../../util/inAppLink";
import withProfileUpload from "../../profile-photo";

const RenderCell = ({ name, iconFunc, last, children }) => {
  let icon = "icon-arrow-next";
  if (typeof iconFunc === "function") {
    icon = iconFunc();
  }
  if (process.env.NATIVE) {
    const classes = ["push-left", "soft-ends", "soft-right", "text-left"];
    if (!last) classes.push("outlined--light", "outlined--bottom");
    return (
      <div className={classes.join(" ")}>
        <h6 className="soft-half-left flush display-inline-block">{name}</h6>
        <i className={`float-right ${icon}`} />
        {children}
      </div>
    );
  } else {
    return (
      <div className="card soft-ends soft-right text-left outlined--light">
        <h6 className="soft-left flush display-inline-block">{name}</h6>
        <i className={`float-right ${icon}`} />
        {children}
      </div>
    );
  }
};
const mapQueriesToProps = () => ({
  data: {
    query: gql`
      query GetPhoto {
        currentPerson(cache: false) {
          photo
        }
      }
    `,
    forceFetch: true,
  },
});
@withProfileUpload
@connect({ mapQueriesToProps })
@ReactMixin.decorate(Headerable)
export default class Menu extends Component {

  static contextTypes = {
    shouldAnimate: PropTypes.bool,
  }

  componentWillMount() {
    this.props.dispatch(navActions.setLevel("TOP"));
    this.headerAction({
      title: "Profile",
    });
  }

  state = {
    upload: "default",
    capture: "default",
  }

  signout = (e) => {
    e.preventDefault();
    Meteor.logout();
  }

  upload = (e, key, opts) => {
    this.setState({ [key]: "loading" });
    this.props.upload(e, opts)
      .then(() => {
        this.setState({ [key]: "uploaded" });
        this.props.data.refetch();
        setTimeout(() => this.setState({ [key]: "default" }), 2000);
      })
      .catch(() => {
        this.setState({ [key]: "failed" });
        setTimeout(() => this.setState({ [key]: "default" }), 2000);
      })
  }

  uploadIcon = () => {
    switch (this.state.upload) {
      case "default":
        return "icon-arrow-next";
      case "loading":
        // @TODO replace with loading icon
        return "icon-leaf-outline";
      case "uploaded":
        return "icon-check-mark text-primary";
      case "failed":
        return "icon-close text-alert";
    }
  }

  captureIcon = () => {
    switch (this.state.capture) {
      case "default":
        return "icon-arrow-next";
      case "loading":
        // @TODO replace with loading icon
        return "icon-leaf-outline";
      case "uploaded":
        return "icon-check-mark text-primary";
      case "failed":
        return "icon-close text-alert";
    }
  }

  sectionClasses = () => {
    if (process.env.NATIVE) return "hard";
  }

  showFeedback = () => {
    if (process.env.NATIVE) {
      return (
        <a href="#" onClick={this.giveFeedback} className="plain text-dark-secondary">
          <RenderCell name="Give Feedback" />
        </a>
      );
    }
  }

  giveFeedback = () => {
    if (process.env.NATIVE && typeof hockeyapp != "undefined") hockeyapp.feedback();
  }

  dividerClasses = () => {
    const classes = ["push-double-ends@lap-and-up", "push-half-ends"];
    if (process.env.NATIVE) classes.push("background--light-primary");
    return classes.join(" ");
  }

  outlineClasses = () => {
    if (process.env.NATIVE) return "outlined--light one-whole";
  }

  render() {
    return (
      <div
        className="background--light-secondary soft-double-bottom soft-double-sides@lap-and-up"
      >
        <section className={this.sectionClasses()}>
          <div className={this.dividerClasses()}>
            <div className={this.outlineClasses()} style={{ borderLeft: 0, borderRight: 0 }}>
              <Link to="/profile/settings/personal-details" className="plain text-dark-secondary">
                <RenderCell name="Personal Details" />
              </Link>
              <Link to="/profile/settings/home-address" className="plain text-dark-secondary">
                <RenderCell name="My Address" />
              </Link>
              <button className="plain text-dark-secondary display-inline-block one-whole" style={{position: "relative"}}>
                <RenderCell name="Upload Profile Photo" iconFunc={this.uploadIcon}>
                  {(() => {
                    if (!process.env.NATIVE) {
                      return (
                        <input onChange={e => this.upload(e, "upload")} type="file" className="locked-ends locked-sides" style={{opacity: 0, zIndex: 1}} />
                      )
                    }

                    return (
                      <div onClick={e => this.upload(e, "upload")} className="locked-ends locked-sides" style={{opacity: 0, zIndex: 1}} />
                    )
                  })()}
                </RenderCell>
              </button>
              {(() => {
                if (process.env.NATIVE) {
                  return (
                    <button className="plain text-dark-secondary display-inline-block one-whole" style={{position: "relative"}}>
                      <RenderCell name="Take Profile Photo" iconFunc={this.captureIcon}>
                        <div onClick={(e) => this.upload(e, "capture", { sourceType: Camera.PictureSourceType.CAMERA})} className="locked-ends locked-sides" style={{opacity: 0, zIndex: 1}} />
                      </RenderCell>
                    </button>
                  )
                }
              })()}
              <Link to="/profile/settings/change-password" className="plain text-dark-secondary">
                <RenderCell name="Change Password" last />
              </Link>
            </div>
          </div>


          <div className={this.dividerClasses()}>
            <div className={this.outlineClasses()} style={{ borderLeft: 0, borderRight: 0 }}>
              <Link to="/profile/settings/saved-accounts" className="plain text-dark-secondary">
                <RenderCell name="Saved Accounts" />
              </Link>
              <Link to="/give/schedules" className="plain text-dark-secondary">
                <RenderCell name="Scheduled Contributions" />
              </Link>
              <Link to="/give/history" className="plain text-dark-secondary">
                <RenderCell name="Giving History" last />
              </Link>
            </div>
          </div>

          <div className={this.dividerClasses()}>
            <div className={this.outlineClasses()} style={{ borderLeft: 0, borderRight: 0 }}>
              {this.showFeedback()}
              <a href="//newspring.cc/privacy" onClick={inAppLink} target="_blank" className="plain text-dark-secondary">
                <RenderCell name="Privacy Policy" />
              </a>
              <a href="//newspring.cc/terms" onClick={inAppLink} target="_blank" className="plain text-dark-secondary">
                <RenderCell name="Terms of Use" last />
              </a>
            </div>
          </div>

          <div className="one-whole text-center push-double-bottom">
            <button onClick={this.signout} className="btn--dark-tertiary push-top soft-half-ends">Sign Out</button>
          </div>
        </section>
      </div>

    );
  }
}
