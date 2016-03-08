import { Component, PropTypes} from "react"
import { connect } from "react-redux"
import { Motion, spring, presets } from "react-motion";

import { modal as modalActions, nav as navActions } from "../../store"

import Modal from "./Modal.jsx"
import offset from "../../blocks/nav/offset.css"
import styles from "./modal.css"


const map = (state) => ({
  navigation: state.nav,
  modal: state.modal,
  path: state.routing.path,
})

@connect(map)
export default class SideModalContainer extends Component {

  state = {
    previous: null
  }

  bindEsc = (e) => {
    // if key hit is `esc` or template is closed is clicked
    if (event.keyCode === 27) {
      this.props.dispatch(modalActions.hide())
    }

  }

  componentDidMount(){
    if (!this.props.modal.props.keepNav && this.props.modal.visible) {
      this.props.dispatch(navActions.setLevel("MODAL"))
    }

    if (Meteor.isClient) {
      document.addEventListener("keyup", this.bindEsc, false)
    }

  }

  componentWillUnmount() {
    if (Meteor.isClient) {
      document.removeEventListener("keyup", this.bindEsc, false)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.modal.visible && nextProps.navigation.level != "MODAL" && nextProps.modal.props.keepNav != true) {
      this.props.dispatch(navActions.setLevel("MODAL"))
      this.setState({ previous: this.props.navigation.level })
    }

    if (!nextProps.modal.visible && nextProps.navigation.level === "MODAL" && !this.props.modal.props.keepNav) {
      let previous = this.state.previous
      if (previous === "MODAL" || !previous) {
        previous = "TOP"
      }
      this.props.dispatch(navActions.setLevel(previous))
    }

    if (!nextProps.modal.visible && (this.props.path != nextProps.path)) {
      this.props.dispatch(modalActions.hide())
    }

  }

  componentWillUpdate(nextProps){
    if (typeof document != "undefined" && document != null ) {
      let root = document.documentElement

      if (!nextProps.modal.visible) {
        root.className = root.className.split(" ").filter((className) => {
          return className != "modal--opened"
        }).join(" ")

      } else if (!this.props.modal.visible && nextProps.modal.visible) {
        root.className += " modal--opened"
      }
    }


  }

  close = (e) => {
    const { target } = e
    const { id } = target
    if (id != "@@modal") {
      return
    }

    this.props.dispatch(modalActions.hide())
  }

  render () {

    let enter = "fadeIn"
    let exit = "fadeOut"

    const { visible, content, props } = this.props.modal
    return (
      <Modal
        close={this.close}
        component={content}
        props={props}
        visible={visible}
        {...this.props}
      />
    )
  }
}
