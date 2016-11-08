import { Component, PropTypes } from "react";
import { VelocityComponent } from "velocity-react";
import { css } from "aphrodite";

import styles from "./modal-css";
import offsetStyles from "../nav/offset-css";

export default class SideModal extends Component {

  static propTypes = {
    childClasses: PropTypes.array, // eslint-disable-line
    float: PropTypes.bool,
    classes: PropTypes.array, // eslint-disable-line
    offset: PropTypes.bool,
    styles: PropTypes.object, // eslint-disable-line
    close: PropTypes.func.isRequired,
    component: PropTypes.func,
    props: PropTypes.object.isRequired, // eslint-disable-line
    layoutOverride: PropTypes.string,
    style: PropTypes.object, // eslint-disable-line
    modalBackground: PropTypes.string,
    modal: PropTypes.object,
    theme: PropTypes.string,
    visible: PropTypes.bool,
  }

  static defaultProps = {
    childClasses: [],
    float: false,
    classes: [],
    offset: true,
    styles: {},
    props: {},
  }

  state = {
    coverHeader: false,
  }

  componentWillUpdate(nextProps) {
    const coverHeader = !!nextProps.props.coverHeader;

    if (coverHeader !== this.state.coverHeader) {
      this.setState({ coverHeader });
    }
  }

  getContainerStyle() {
    const mini = this.props.props && this.props.props.coverMiniPlayer;
    return {
      zIndex: mini ? 102 : 100,
      position: "fixed",
    };
  }

  childClasses = () => {
    const { childClasses, float } = this.props;

    let classes = [
      "hard",
      "one-whole",
      css(styles.interior),
      "scrollable",
    ];

    if (childClasses.length) {
      classes.concat(childClasses);
    }

    if (float) {
      classes.push("floating__item");
    } else {
      classes = classes.concat([
        "inline-block",
        "locked-top",
      ]);
    }

    return classes.join(" ");
  }

  layoutClasses = () => {
    const { float, offset } = this.props;
    const { classes, layoutOverride, modalBackground } = this.props.modal.props;

    const classList = [
      "hard",
      "flush",
    ];

    if (classes && classes.length) {
      classList.concat(classes);
    } else {
      classList.push(css(styles["side-panel"]));
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
      classList.push("floating");
    }

    if (offset) {
      classList.push(css(offsetStyles.offset));
    }

    return classList.join(" ");
  }

  styles = () => {
    const style = { ...(this.props.styles || this.props.style) };
    style.top = (process.env.WEB || this.state.coverHeader) ? "0px" : "46px";

    return style;
  };

  render() {
    const slide = {
      opacity: [1, 0],
      translateZ: 0,
    };

    const { close, component, props, visible } = this.props;

    const ChildComponent = component;

    if (!visible || !component) {
      return <div />;
    }

    if (typeof window !== "undefined" && window !== null) {
      window.scrollTo(0, 0);

      if (window.matchMedia("(max-width: 481px)").matches) {
        slide.translateY = [0, 80];
        if (typeof this.props.styles !== "undefined") {
          this.props.styles.transform = "translateY(80px)";
          this.props.styles.opacity = 0;
        } else {
          this.props.style.transform = "translateY(80px)";
          this.props.style.opacity = 0;
        }
      } else {
        slide.translateX = [0, -20];
        if (typeof this.props.styles !== "undefined") {
          this.props.styles.transform = "translateY(-20px)";
          this.props.styles.opacity = 0;
        } else {
          this.props.style.transform = "translateY(-20px)";
          this.props.style.opacity = 0;
        }
      }
    }

    return (
      <div className="panel overlay--solid-dark fixed" id="@@modal" onClick={close} style={this.getContainerStyle()}>
        <VelocityComponent
          animation={slide}
          duration={300}
          runOnMount
        >
          <section
            className={this.props.theme || this.layoutClasses()}
            style={this.styles()}
          >
            <div className={this.childClasses()} style={{ height: "100%" }}>
              <ChildComponent {...props} />
            </div>
          </section>
        </VelocityComponent>
      </div>
    );
  }
}
