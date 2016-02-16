import { Component, PropTypes} from "react"
import { connect } from "react-redux"
import ReactMixin from "react-mixin"

import { onBoard as onBoardActions, modal } from "../../store"
import { routeActions } from "../../store/routing"
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


  render () {
    if (this.props.auth) {
      return this.props.children
    }

    return null
  }
}
