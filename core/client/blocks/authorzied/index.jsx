import { Component, PropTypes} from "react"
import { connect } from "react-redux"
import ReactMixin from "react-mixin"

import { onBoard as onBoardActions, modal } from "../../actions"
import OnBoard from "../on-board"

import { People } from "../../../../rock/lib/collections"

const map = (state) => ({ auth: state.onBoard.authorized })

const bindMeteorPerson = (props) => {
  const { dispatch, auth } = props

  let handle = {}
  let authorized = false
  Tracker.autorun((computation) => {
    handle = computation

    const user = Meteor.user()
    if (user) {
      Meteor.subscribe("people")
      authorized = true
      dispatch(onBoardActions.person(People.findOne()))
    } else {
      authorized = false
      dispatch(onBoardActions.signout())
    }

  })

  return { handle, authorized }

}

@connect(map)
export default class Authorized extends Component {

  componentWillMount(){
    let { handle, authorized } = bindMeteorPerson(this.props)
    this.handle = handle

    if (!authorized) {
      this.props.dispatch(modal.render(OnBoard))
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.auth) {
      this.props.dispatch(modal.render(OnBoard))
    }

    if (!this.props.auth && nextProps.auth) {
      this.props.dispatch(modal.hide())
    }
  }

  componentWillUnmount(){
    this.handle.stop()
  }

  render () {
    return this.props.children
  }
}
