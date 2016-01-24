import { Component, PropTypes} from "react"
import { connect } from "react-redux"

import Nav from "../nav"
import Modal from "../modal"
import { People, Likes } from "../../collections"

import {
  onBoard as onBoardActions,
  liked as likedActions,
  topics as topicActions
} from "../../store"


const bindMeteorPerson = (props) => {
  const { dispatch } = props

  let handle = {}
  Tracker.autorun((computation) => {
    handle = computation

    const user = Meteor.user()
    if (user) {
      Meteor.subscribe("people")
      dispatch(onBoardActions.person(People.find().fetch()[0]))

      Meteor.subscribe("likes")
      let likes = Likes.find().fetch().map((like) => like.entryId);

      dispatch(likedActions.set(likes));

      Meteor.subscribe("userData");
      let topics = Meteor.user().topics;
      dispatch(topicActions.set(topics));

    }

    props.dispatch(onBoardActions.authorize(user != null))

  })

  return { handle }

}

const App = ({ children, className }) => (
  <div className="
    push-double-bottom@handheld soft-bottom@handheld
    push-double-left@lap-and-up soft-double-left@lap-and-up
    "
  >
    <div className={className}>
      {children}
      <Nav />
      <Modal/>
    </div>

  </div>
)


// @TODO move to saga?
function getUser(id, dispatch) {

  // this is probably to heavy of a universal call?
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
    .then(({ person }) => {
      if (person) {
        dispatch(onBoardActions.person(person))
      }

    })

}

function bindLogout(dispatch) {
  let handle = {}

  Tracker.autorun((computation) => {
    handle = computation
    const user = Meteor.userId()
    console.log(user)
    if (user) {
      return getUser(user, dispatch)
    }

    dispatch(onBoardActions.signout())

  })

  return handle
}


@connect()
export default class Global extends Component {


  componentWillMount() {
    const { dispatch } = this.props
    const user = Meteor.userId()

    this.handle = bindLogout(dispatch)

  }

  componentWillUnmount(){
    this.handle.stop()
  }

  render() { return <App {...this.props} /> }

}
