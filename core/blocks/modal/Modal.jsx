import { Component, PropTypes} from "react";
import {VelocityComponent } from "velocity-react";

export default class SideModal extends Component {

  static propTypes = {
    childClasses: PropTypes.array,
    float: PropTypes.bool,
    classes: PropTypes.array,
    offset: PropTypes.bool,
    styles: PropTypes.obj,
    close: PropTypes.func.isRequired,
    component: PropTypes.func.isRequired,
    props: PropTypes.obj.isRequired
  }

  static defaultProps = {
    childClasses: [],
    float: false,
    classes: [],
    offset: false,
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

    const { classes, float, offset } = this.props.modal

    let classes = [
      "hard",
      "flush",
      "background--light-primary",
    ];

    if (classes.length) {
      classes.concat(classes);
    } else {
      classes.push(styles["side-panel"])
    }

    if (float) {
      classes.push("floating")
    }

    if (offset) {
      classes.push(offset["offset"])
    }

    return classes.join(" ");
  }

  render () {
    
    let slide = "transition.slideLeftIn"

    const { close, component, props } = this.props

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
              <component {...props} />
            </div>
          </section>
        </VelocityComponent>
      </div>
    )

  }
}
