import { Component, PropTypes} from "react"
import { connect } from "react-redux"
import ReactMixin from "react-mixin"
import { routeActions } from "react-router-redux"

import { onBoard as onBoardActions, modal } from "../../store"
import OnBoard from "../onBoard"

import { People } from "../../collections"

const map = (state) => ({ auth: state.onBoard.authorized })

const bindMeteorPerson = (props) => {
  const { dispatch, auth } = props

  let handle = {}
  let authorized = false
  Tracker.autorun((computation) => {
    handle = computation

    const user = Meteor.user()
    Meteor.subscribe("people")
    dispatch(onBoardActions.person(People.find().fetch()[0]))

    if (user) {
      authorized = true
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

    if (this.props.modal.visible && !nextProps.modal.visible && !nextProps.auth) {
      this.props.dispatch(routeActions.push("/"))
    }

    if (this.props.auth && !nextProps.auth) {
      this.props.dispatch(modal.render(OnBoard))
    }

    // if (!this.props.auth && nextProps.auth) {
    //   this.props.dispatch(modal.hide())
    // }
  }

  componentWillUnmount(){
    this.handle.stop()
  }

  render () {
    if (this.props.auth) {
      return this.props.children
    }

    return null
  }
}
