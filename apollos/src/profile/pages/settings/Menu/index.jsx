import { Component, PropTypes} from "react"
import ReactMixin from "react-mixin"
import { connect } from "react-apollo";
import gql from "apollo-client/gql";
import { Link } from "react-router"

import { Headerable } from "../../../../core/mixins/"

import {
  accounts as accountsActions,
  nav as navActions,
} from "../../../../core/store";

import { avatar } from "../../../../core/methods/files/client"
import inAppLink from "../../../../core/util/inAppLink"

const RenderCell = ({name, iconFunc, last, children}) => {
  let icon = "icon-arrow-next";
  if (typeof iconFunc === "function") {
    icon = iconFunc();
  }
  if (process.env.NATIVE) {
    let classes = ["push-left", "soft-ends", "soft-right", "text-left"];
    if (!last) classes.push("outlined--light", "outlined--bottom");
    return (
      <div className={classes.join(" ")}>
        <h6 className="soft-half-left flush display-inline-block">{name}</h6>
        <i className={`float-right ${icon}`}></i>
        {children}
      </div>
    )
  } else {
    return (
      <div className="card soft-ends soft-right text-left outlined--light">
        <h6 className="soft-left flush display-inline-block">{name}</h6>
        <i className={`float-right ${icon}`}></i>
        {children}
      </div>
    )
  }
}
const mapQueriesToProps = () => ({
  data: {
    query: gql`
      query GetPhoto {
        currentPerson {
          photo
        }
      }
    `,
  }
});
@connect({ mapQueriesToProps })
@ReactMixin.decorate(Headerable)
export default class Menu extends Component {

  static contextTypes = {
    shouldAnimate: PropTypes.bool
  }

  componentWillMount() {
    this.props.dispatch(navActions.setLevel("TOP"));
    this.headerAction({
      title: "Profile"
    });
  }

  state = {
    upload: "default"
  }

  signout = (e) => {
    e.preventDefault()
    Meteor.logout()
  }

  upload = (e) => {
    e.preventDefault()
    let files = e.target.files
    if (!Meteor.settings.public.rock) {
      return
    }

    this.setState({
      upload: "loading"
    })
    var data = new FormData()
    data.append('file', files[0])

    const { baseURL, token, tokenName } = Meteor.settings.public.rock

    fetch(`${baseURL}api/BinaryFiles/Upload?binaryFileTypeId=5`, {
      method: 'POST',
      headers: { [tokenName]: token },
      body: data
    })
      .then((response) => {
        return response.json()
       })
      .then((id) => {
        avatar(id, (err, response) => {
          this.props.data.refetch()
            .then((result) => {
              this.setState({
                upload: "uploaded"
              })

              setTimeout(() => {
                this.setState({
                  upload: "default"
                })
              }, 2000)
            })
        })
      })

  }

  uploadIcon = () => {
    switch (this.state.upload) {
      case "default":
        return "icon-arrow-next"
      case "loading":
        // @TODO replace with loading icon
        return "icon-leaf-outline"
      case "uploaded":
        // @TODO replace with loading icon
        return "icon-check-mark text-primary"
    }
  }

  sectionClasses = () => {
    if (process.env.NATIVE) return "hard";
  }

  showFeedback = () => {
    if (process.env.NATIVE){
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
    let classes = ["push-double-ends@lap-and-up", "push-half-ends"];
    if (process.env.NATIVE) classes.push("background--light-primary");
    return classes.join(" ")
  }

  outlineClasses = () => {
    if (process.env.NATIVE) return "outlined--light one-whole";
  }

  containerStyles = () => ({ marginTop: process.env.NATIVE ? "45px" : "0px" });

  render() {
    return (
      <div
        className="background--light-secondary soft-double-bottom soft-double-sides@lap-and-up"
        style={this.containerStyles()}
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
                <RenderCell name="Change Profile Photo" iconFunc={this.uploadIcon}>
                  <input onChange={this.upload} type="file" className="locked-ends locked-sides" style={{opacity: 0, zIndex: 1}} />
                </RenderCell>
              </button>
              <Link to="/profile/settings/change-password" className="plain text-dark-secondary">
                <RenderCell name="Change Password" last={true} />
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
                <RenderCell name="Giving History" last={true} />
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
                <RenderCell name="Terms of Use" last={true} />
              </a>
            </div>
          </div>

          <div className="one-whole text-center push-double-bottom">
            <button onClick={this.signout} className="btn--dark-tertiary push-top soft-half-ends">Sign Out</button>
          </div>
        </section>
      </div>

    )
  }
}
