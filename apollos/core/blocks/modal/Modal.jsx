import { Component, PropTypes } from "react";
import { connect } from "react-redux"
import { VelocityComponent } from "velocity-react";

import styles from "./modal.css"
import offsetStyles from "../nav/offset.css"

import { audio as audioActions } from "app/client/actions"

const mapStateToProps = (state) => {
  return {
    audio: {
      visibility: state.audio.visibility
    }
  };
};

@connect(mapStateToProps)
export default class SideModal extends Component {

  state = {
    coverHeader: false
  }

  static contextTypes = {
    shouldAnimate: PropTypes.bool
  }

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
      "scrollable"
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
    const { classes, layoutOverride, coverHeader, modalBackground } = this.props.modal.props

    let classList = [
      "hard",
      "flush",
    ];

    if (classes && classes.length) {
      classList.concat(classes);
    } else {
      classList.push(styles["side-panel"])
    }

    if (modalBackground === "dark") {
      classList.push("background--dark-primary");
    } else {
      classList.push("background--light-primary");
    }

    if (layoutOverride && layoutOverride.length) {
      classList.push(layoutOverride);
    }

    if (float) {
      classList.push("floating")
    }

    if (offset) {
      classList.push(offsetStyles["offset"])
    }

    return classList.join(" ");
  }

  componentWillUpdate (nextProps) {
    const coverHeader = !!nextProps.props.coverHeader;

    if(coverHeader != this.state.coverHeader) {
      this.setState({ coverHeader });
    }
  }

  componentDidUpdate(previousProps) {
    if(previousProps.visible && !this.props.visible &&
      previousProps.audio.visibility === "expand" &&
      previousProps.component.displayName.indexOf("FullPlayer") === -1) {
      // Modal, that was not the Full Player, closed but the audio player
      // was still set to be expanded
      this.props.dispatch(audioActions.setVisibility("expand"));
    }
  };

  styles = () => {
    let style = { ... (this.props.styles || this.props.style) };
    style.top = this.state.coverHeader ? "0px" : "46px";

    return style;
  };

  getContainerStyle () {
    return {
      zIndex: this.props.props.coverMiniPlayer ? 102 : 100,
      position: "fixed"
    };
  };

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
      window.scrollTo(0, 0);

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
      <div className="panel overlay--solid-dark fixed" id="@@modal" onClick={close} style={this.getContainerStyle()}>
        <VelocityComponent
          animation={slide}
          duration={300}
          runOnMount={this.context.shouldAnimate}
        >
          <section
            className={ this.props.theme || this.layoutClasses() }
            style={ this.styles() }
          >
            <div className={ this.childClasses() } style={{ height: "100%" }}>
              <ChildComponent {...props} />
            </div>
          </section>
        </VelocityComponent>
      </div>
    )
  }
}
