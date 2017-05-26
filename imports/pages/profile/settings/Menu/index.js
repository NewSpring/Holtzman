/* eslint-disable no-undef */
import { Component, PropTypes } from "react";
import ReactMixin from "react-mixin";
import { graphql } from "react-apollo";
import { connect } from "react-redux";
import gql from "graphql-tag";
import { Link } from "react-router";
import { Meteor } from "meteor/meteor";

import Headerable from "../../../../deprecated/mixins/mixins.Header";

import {
  nav as navActions,
} from "../../../../data/store";

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
  }
  return (
    <div className="card soft-ends soft-right text-left outlined--light">
      <h6 className="soft-left flush display-inline-block">{name}</h6>
      <i className={`float-right ${icon}`} />
      {children}
    </div>
  );
};

RenderCell.propTypes = {
  name: PropTypes.string.isRequired,
  iconFunc: PropTypes.func.isRequired,
  last: PropTypes.bool.isRequired,
  children: PropTypes.object.isRequired,
};

class MenuWithoutData extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    data: PropTypes.shape({
      refetch: PropTypes.func,
    }),
    upload: PropTypes.func,
  }

  state = {
    upload: "default",
    capture: "default",
  }

  componentWillMount() {
    this.props.dispatch(navActions.setLevel("TOP"));
    if (this.headerAction) {
      this.headerAction({
        title: "Profile",
      });
    }
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
      });
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
      default:
        return null;
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
      default:
        return null;
    }
  }

  sectionClasses = () => {
    if (process.env.NATIVE) return "hard";
    return "";
  }

  dividerClasses = () => {
    const classes = ["push-double-ends@lap-and-up", "push-half-ends"];
    if (process.env.NATIVE) classes.push("background--light-primary");
    return classes.join(" ");
  }

  outlineClasses = () => {
    if (process.env.NATIVE) return "outlined--light one-whole";
    return "";
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
              <button className="plain text-dark-secondary display-inline-block one-whole" style={{ position: "relative" }}>
                <RenderCell name="Upload Profile Photo" iconFunc={this.uploadIcon}>
                  {(() => {
                    if (!process.env.NATIVE) {
                      return (
                        <input onChange={(e) => this.upload(e, "upload")} type="file" className="locked-ends locked-sides" style={{ opacity: 0, zIndex: 1 }} />
                      );
                    }

                    return (
                      <div onClick={(e) => this.upload(e, "upload")} className="locked-ends locked-sides" style={{ opacity: 0, zIndex: 1 }} />
                    );
                  })()}
                </RenderCell>
              </button>
              {(() => {
                if (process.env.NATIVE) {
                  return (
                    <button className="plain text-dark-secondary display-inline-block one-whole" style={{ position: "relative" }}>
                      <RenderCell name="Take Profile Photo" iconFunc={this.captureIcon}>
                        <div onClick={(e) => this.upload(e, "capture", { sourceType: Camera.PictureSourceType.CAMERA })} className="locked-ends locked-sides" style={{ opacity: 0, zIndex: 1 }} />
                      </RenderCell>
                    </button>
                  );
                }
                return null;
              })()}
              <Link to="/profile/settings/change-password" className="plain text-dark-secondary">
                <RenderCell name="Change Password" last />
              </Link>
            </div>
          </div>

          <div className={this.dividerClasses()}>
            <div className={this.outlineClasses()} style={{ borderLeft: 0, borderRight: 0 }}>
              <a
                href="mailto:web.helpdesk@newspring.cc"
                className="plain text-dark-secondary"
              >
                <RenderCell name="Give Feedback" last />
              </a>
            </div>
          </div>


          <div className={this.dividerClasses()}>
            <div className={this.outlineClasses()} style={{ borderLeft: 0, borderRight: 0 }}>
              <Link to="/give/home#saved-payments" className="plain text-dark-secondary">
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
              <a
                href="//newspring.cc/privacy"
                rel="noopener noreferrer"
                onClick={inAppLink}
                target="_blank"
                className="plain text-dark-secondary"
              >
                <RenderCell name="Privacy Policy" />
              </a>
              <a
                href="//newspring.cc/terms"
                rel="noopener noreferrer"
                onClick={inAppLink}
                target="_blank"
                className="plain text-dark-secondary"
              >
                <RenderCell name="Terms of Use" last />
              </a>
            </div>
          </div>

          <div className="one-whole text-center push-double-bottom">
            <button
              onClick={this.signout}
              className="btn--dark-tertiary push-top soft-half-ends"
            >
              Sign Out
            </button>
          </div>
        </section>
      </div>

    );
  }
}

const GET_PHOTO_QUERY = gql`
  query GetPhoto {
    currentPerson(cache: false) {
      photo
    }
  }
`;

const withGetPhoto = graphql(GET_PHOTO_QUERY);

export default withGetPhoto(
  withProfileUpload(
    connect()(
      ReactMixin.decorate(Headerable)(
        MenuWithoutData
      )
    )
  )
);

export {
  MenuWithoutData,
  RenderCell,
  GET_PHOTO_QUERY,
};
