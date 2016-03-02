import { Component, PropTypes} from "react"
import { connect } from "react-redux"
import { Link } from "react-router"
import { VelocityComponent } from "velocity-react"

import { GraphQL } from "../../../../core/graphql"
import { onBoard as onBoardActions } from "../../../../core/store"

import { avatar } from "../../../../core/methods/files/client"

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
      dispatch(onBoardActions.person(person.person))
    })
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
      runOnMount={this.context.shouldAnimate}
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
            <button className="plain text-dark-secondary display-inline-block one-whole" style={{position: "relative"}}>
              <div className="push-left soft-ends soft-right text-left outlined--light outlined--bottom">
                <h6 className="soft-half-left flush display-inline-block">Change Profile Photo</h6>
                {() => {
                  let icon = "icon-arrow-next"
                  switch (this.state.upload) {
                    case "default":
                      icon = "icon-arrow-next"
                      break;
                    case "loading":
                      // @TODO replace with loading icon
                      icon = "icon-leaf-outline"
                      break;
                    case "uploaded":
                      // @TODO replace with loading icon
                      icon = "icon-check-mark text-primary"
                      break;
                  }

                  return <i className={`float-right ${icon}`}></i>

                }()}
              </div>
              <input onChange={this.upload} type="file" className="locked-ends locked-sides" style={{opacity: 0}} />
            </button>
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
            <Link to="/give/schedules" className="plain text-dark-secondary">
              <div className="push-left soft-ends soft-right text-left outlined--light outlined--bottom">
                <h6 className="soft-half-left flush display-inline-block">Scheduled Gifts</h6>
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
