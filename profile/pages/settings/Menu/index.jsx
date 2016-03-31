import { Component, PropTypes} from "react"
import { connect } from "react-redux"
import { Link } from "react-router"
// import { VelocityComponent } from "velocity-react"

import { GraphQL } from "../../../../core/graphql"
import { accounts as accountsActions } from "../../../../core/store"

import { avatar } from "../../../../core/methods/files/client"

import inAppLink from "../../../../core/util/inAppLink"

function updateUser(id, dispatch) {
  let personQuery = `
    {
      person(mongoId: "${id}", cache: false) {
        age
        birthdate
        birthDay
        birthMonth
        birthYear
        campus {
          name
          shortCode
          id
        }
        home {
          city
          country
          id
          zip
          state
          street1
          street2
        }
        firstName
        lastName
        nickName
        email
        phoneNumbers {
          number
          formated
        }
        photo
      }
    }
  `

  return GraphQL.query(personQuery)
    .then((person) => {
      dispatch(accountsActions.person(person.person))
    })
}

const Header = () => (
  <div className="soft text-center background--light-primary outlined--light outlined--bottom" style={{position: "relative"}}>
    <h5 className="soft-left display-inline-block flush">Settings</h5>
    <Link to="/profile" className="visuallyhidden@lap-and-up soft locked-top locked-right floating">
      <h6 className="plain floating__item flush">Done</h6>
    </Link>
  </div>
)

const RenderCell = ({name, iconFunc, last, children}) => {
  let icon = "icon-arrow-next";
  if (typeof iconFunc === "function") {
    icon = iconFunc();
  }
  if (Meteor.isCordova) {
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

@connect()
export default class Menu extends Component {

  static contextTypes = {
    shouldAnimate: PropTypes.bool
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
          updateUser(Meteor.userId(), this.props.dispatch)
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
    if (Meteor.isCordova) {
      return "hard"
    }
  }

  dividerClasses = () => {
    let classes = ["push-double-ends"];

    if (Meteor.isCordova) classes.push("background--light-primary");

    return classes.join(" ")
  }

  outlineClasses = () => {
    if (Meteor.isCordova) {
      return "outlined--light one-whole"
    }
  }

  render() {
    return (
      <div className="background--light-secondary soft-double-bottom soft-double-sides@lap-and-up">
        {() => {
          if (Meteor.isCordova) {
            return <Header />
          }
        }()}
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
              {/*
              <a onClick={inAppLink} href="//newspring.cc/about" target="_blank" className="plain text-dark-secondary">
                <div className="card soft-ends soft-right text-left outlined--light">
                  <h6 className="soft-left flush display-inline-block">About Us</h6>
                  <i className="float-right icon-arrow-next"></i>
                </div>
              </a>
              */}
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
