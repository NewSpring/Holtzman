import { Component, PropTypes} from "react"
import { connect } from "react-redux"

import {VelocityComponent, VelocityTransitionGroup } from "velocity-react"

import { modal as modalActions, nav as navActions } from "../../actions"
import offset from "../../blocks/nav/nav.offset.css"
import styles from "./modal.css"


function map(state) {
  return {
    navigation: state.nav,
    modal: state.modal
  }
}

@connect(map)
export default class SideModal extends Component {

  childClasses = () => {

    const { props } = this.props.modal

    let classes = [
      "hard",
      "one-whole",
    ];

    if (props.childClasses) {
      classes.concat(props.childClasses);
    }

    if (props.float) {
      classes.push("floating__item")
    } else {
      classes = classes.concat([
        "inline-block",
        "locked-top"
      ])
    }

    return classes.join(" ");

  }

  layoutClasses = () => {

    const { props } = this.props.modal

    let classes = [
      "hard",
      "flush",
      "background--light-primary",
    ];

    if (props.classes.length) {
      classes.concat(props.classes);
    } else {
      classes.push(styles["side-panel"])
    }

    if (props.float) {
      classes.push("floating")
    }

    if (this.props.navigation.visible) {
      classes.push(offset["offset"])
    }

    return classes.join(" ");
  }

  styles = () => {
    return {}
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.modal.visible && nextProps.navigation.level != "MODAL" && nextProps.modal.props.keepNav != true) {
      this.props.dispatch(navActions.setLevel("MODAL"))
    }

    if (!nextProps.modal.visible && nextProps.navigation.level === "MODAL" && !this.props.modal.props.keepNav) {
      // this will need to be expanded...
      this.props.dispatch(navActions.setLevel("TOP"))
    }
  }

  componentWillUpdate(nextProps){
    let root = document.documentElement

    if (!nextProps.modal.visible) {
      root.className = root.className.split(" ").filter((className) => {
        return className != "modal--opened"
      }).join(" ")

    } else if (!this.props.modal.visible && nextProps.modal.visible) {
      root.className += "modal--opened"
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
    let slide = "transition.slideLeftIn"

    // if (typeof window != "undefined" || window != null) {
    //   const width = window.innerWidth
    //   if (width < 768) {
    //     enter = "transition.slideUpIn"
    //     exit = "slideDown"
    //     slide = "slideUp"
    //   }
    // }

    return (

      <VelocityTransitionGroup
        enter={{
          animation: enter, duration: 250
        }}
        leave={{
          animation: exit, duration: 250
        }}
      >

        {() => {

          if (!this.props.modal.visible) {
            return null
          }

          return (
            <div className="panel overlay--solid-dark" onClick={this.close}>

              <VelocityComponent
                animation={slide}
                duration={500}
                runOnMount={true}
              >
                <section
                  className={ this.props.theme || this.layoutClasses() }
                  style={ this.props.styles || this.styles() }
                >
                  <div className={this.props.childClasses || this.childClasses()}>
                    <this.props.modal.content {...this.props.modal.props}/>
                  </div>

                </section>
              </VelocityComponent>
            </div>
          )
        }()}
      </VelocityTransitionGroup>
    )
  }
}
