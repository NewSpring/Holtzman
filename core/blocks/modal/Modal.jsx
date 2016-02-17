import { Component, PropTypes} from "react";
import {VelocityComponent } from "velocity-react";

import styles from "./modal.css"
import offsetStyles from "../nav/offset.css"

export default class SideModal extends Component {

  static propTypes = {
    childClasses: PropTypes.array,
    float: PropTypes.bool,
    classes: PropTypes.array,
    offset: PropTypes.bool,
    styles: PropTypes.object,
    close: PropTypes.func.isRequired,
    component: PropTypes.func,
    props: PropTypes.object.isRequired
  }

  static defaultProps = {
    childClasses: [],
    float: false,
    classes: [],
    offset: true,
    styles: {},
    props: {}
  }

  childClasses = () => {

    const { childClasses, float } = this.props

    let classes = [
      "hard",
      "one-whole",
      styles["interior"],
    ];

    if (childClasses.length) {
      classes.concat(childClasses);
    }

    if (float) {
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

    const { float, offset } = this.props
    const { classes } = this.props.modal.props

    let classList = [
      "hard",
      "flush",
      "background--light-primary",
    ];

    if (classes && classes.length) {
      classList.concat(classes);
    } else {
      classList.push(styles["side-panel"])
    }

    if (float) {
      classList.push("floating")
    }

    if (offset) {
      classList.push(offsetStyles["offset"])
    }

    return classList.join(" ");
  }

  render () {

    let slide = {
      opacity: [1, 0],
      translateZ: 0
    }

    const { close, component, props, visible } = this.props

    let ChildComponent = component

    if (!visible || !component) {
      return <div></div>
    }

    if (typeof window != "undefined" && window != null) {
      if (window.matchMedia("(max-width: 480px)").matches) {
        slide.translateY = [0, 80]
        if (typeof this.props.styles != "undefined") {
          this.props.styles.transform = `translateY(80px)`
          this.props.styles.opacity = 0
        } else {
          this.props.style.transform = `translateY(80px)`
          this.props.style.opacity = 0
        }
      } else {
        slide.translateX = [0, -20]
        if (typeof this.props.styles != "undefined") {
          this.props.styles.transform = `translateY(-20px)`
          this.props.styles.opacity = 0
        } else {
          this.props.style.transform = `translateY(-20px)`
          this.props.style.opacity = 0
        }
      }
    }


    return (
      <div className="panel overlay--solid-dark" onClick={close}>
        <VelocityComponent
          animation={slide}
          duration={300}
          runOnMount={true}
        >
          <section
            className={ this.props.theme || this.layoutClasses() }
            style={ this.props.styles || this.props.style }
          >
            <div className={ this.childClasses() }>
              <ChildComponent {...props} />
            </div>
          </section>
        </VelocityComponent>
      </div>
    )
  }
}
