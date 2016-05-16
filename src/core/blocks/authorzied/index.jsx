import { Component, PropTypes} from "react"
import { connect } from "react-redux"
import ReactMixin from "react-mixin"

import { accounts as accountsActions, modal } from "../../store"
import { routeActions } from "../../store/routing"
import OnBoard from "../accounts"

import { People } from "../../collections"

const map = (state) => ({ auth: state.accounts.authorized, modal: state.modal })
@connect(map)
export default class Authorized extends Component {


  componentWillMount(){
    const authorized = Meteor.userId()
    if (!authorized) {
      this.props.dispatch(modal.render(OnBoard))
    }

    // fail safe if for some reason we are logged in but not authorized in
    // the application
    if (authorized && !this.props.auth) {
      this.props.dispatch(accountsActions.authorize(true))
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
    if (Meteor.userId()) {
      return this.props.children
    }

    /*

      This is a temporary work around to a bug with webkit on iOS
      If there is not relative DOM behind a fixed DOM container with inputs
      inside of it, the inputs will not show a focused state, or show as you type

      I'm not sure of a good solution yet, hence the hackery

    */
    if (Meteor.isCordova) {
      return (
        <section className="push-double-ends">
          <section className="push-double-ends">
            <section className="push-double-ends">
              <section className="push-double-ends">
                <section className="push-double-ends">
                  <section className="push-double-ends">

                  </section>
                </section>
              </section>
            </section>
          </section>
        </section>
      )
    }
    return null
  }
}
