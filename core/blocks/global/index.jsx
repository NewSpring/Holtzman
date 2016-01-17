import { Component, PropTypes} from "react"
import { connect } from "react-redux"

import Nav from "../nav"
import Modal from "../modal"
import { People, Likes } from "../../collections"

import {
  onBoard as onBoardActions,
  liked as likedActions
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



@connect()
export default class Global extends Component {

  componentWillMount(){
    let { handle, authorized } = bindMeteorPerson(this.props)
    this.handle = handle

  }

  componentWillUnmount(){
    this.handle.stop()
  }

  render() { return <App {...this.props} /> }

}
