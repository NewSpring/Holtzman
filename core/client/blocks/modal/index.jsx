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

  static propTypes = {
    classes: PropTypes.array,
    theme: PropTypes.string,
    styles: PropTypes.object
  }

  layoutClasses = () => {
    let classes = [
      "hard",
      "flush",
      "floating",
      "background--light-primary",
    ];

    if (this.props.classes) {
      classes.concat(this.props.classes);
    } else {
      classes.push(styles["side-panel"])
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

    if (nextProps.modal.visible && nextProps.navigation.level != "MODAL") {
      this.props.dispatch(navActions.setLevel("MODAL"))
    }

    if (!nextProps.modal.visible && nextProps.navigation.level === "MODAL") {
      // this will need to be expanded...
      this.props.dispatch(navActions.setLevel("TOP"))
    }
  }


  render () {
    let enter = "fadeIn"
    let exit = "fadeOut"
    let slide = "transition.slideLeftIn"

    if (window != null && window != undefined) {
      const width = window.innerWidth
      if (width < 768) {
        enter = "transition.slideUpIn"
        exit = "slideDown"
        slide = "slideUp"
      }
    }

    return (

      <VelocityTransitionGroup
        enter={{
          animation: enter, duration: 300
        }}
        leave={{
          animation: exit, duration: 300
        }}
      >

        {() => {

          if (!this.props.modal.visible) {
            return null
          }

          return (
            <div className="panel overlay--solid-dark">

              <VelocityComponent
                animation={slide}
                duration={500}
                runOnMount={true}
              >
                <section
                  className={ this.props.theme || this.layoutClasses() }
                  style={ this.props.styles || this.styles() }
                >
                  <div className="
                    floating__item
                    one-whole
                    hard"
                  >
                    {this.props.children}
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
