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

    let slide = "transition.slideLeftIn"

    const { close, component, props, visible } = this.props

    let ChildComponent = component

    if (!visible || !component) {
      return <div></div>
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
