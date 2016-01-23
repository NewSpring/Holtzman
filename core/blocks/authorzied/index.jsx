import { Component, PropTypes} from "react"
import { connect } from "react-redux"
import ReactMixin from "react-mixin"

import { GraphQL } from "./../../graphql"

import { onBoard as onBoardActions, modal } from "../../store"
import OnBoard from "../onBoard"

import { People } from "../../collections"

const map = (state) => ({ auth: state.onBoard.authorized, modal: state.modal })
@connect(map)
export default class Authorized extends Component {


  componentWillMount(){
    const authorized = Meteor.userId()
    if (!authorized) {
      this.props.dispatch(modal.render(OnBoard))
    }
  }

  componentWillReceiveProps(nextProps) {

    if (this.props.auth && !nextProps.auth) {
      this.props.dispatch(modal.render(OnBoard))
    }

    if (!this.props.auth && nextProps.auth) {
      this.props.dispatch(modal.hide())
    }
  }


  render () {
    return this.props.children
  }
}
