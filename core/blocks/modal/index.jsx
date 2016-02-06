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

  componentWillReceiveProps(nextProps) {

    if (nextProps.modal.visible && nextProps.navigation.level != "MODAL" && nextProps.modal.props.keepNav != true) {
      this.props.dispatch(navActions.setLevel("MODAL"))
    }

    if (!nextProps.modal.visible && nextProps.navigation.level === "MODAL" && !this.props.modal.props.keepNav) {
      this.props.dispatch(navActions.setLevel("TOP"))
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
        root.className += "modal--opened"
      }
    }


  }

  close = (e) => {
    const { target } = e

    if (target.className != "panel overlay--solid-dark") {
      return
    }

    this.props.dispatch(modalActions.hide())
  }

  render () {

    let enter = "fadeIn"
    let exit = "fadeOut"

    const { visible, content, props } = this.props.modal

    if (typeof window != "undefined")

    return (
      <Motion defaultStyle={{opacity: 0}} style={{opacity: spring(1, presets.wobbly)}}>
        {interpolatingStyle => (
          <Modal
            close={this.close}
            component={content}
            props={props}
            visible={visible}
            style={interpolatingStyle}
            {...this.props}
          />
        )}
      </Motion>

    )
  }
}
