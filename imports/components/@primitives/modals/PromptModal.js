// @flow

import { Component } from "react";
import { VelocityComponent } from "velocity-react";
import { css } from "aphrodite";
import styles from "./modal-css";
import offsetStyles from "../nav/offset-css";

type IPromptModal = {
  close: Function,
  component: Function,
  heroImage: string, // assuming this is the url to the image
  profileImage: string, // assuming this is the url to the image
  visible: boolean,
};

export default class PromptModal extends Component {
  // set the types of the props.
  props: IPromptModal;

  // set default property values.
  defaultProps = {
    close: () => {},
    component: () => {},
    heroImage: "",
    profileImage: "",
  };

  getContainerStyle() {
    return {
      zIndex: 200,
      position: "fixed",
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
    };
  }

  layoutClasses = (): string => {
    const classList = ["hard", "flush", "background--light-primary push-half-left rounded-top"];

    classList.push(css(offsetStyles.offset));
    classList.push(css(styles["prompt-panel"]));

    return classList.join(" ");
  };

  profileImageClasses = (): Object => {
    const classes = {};
    if (this.props.heroImage && this.props.heroImage.length > 0) {
      classes.marginTop = "-35px";
    }
    return classes;
  };

  // render the prompt modal component.
  render() {
    const slide: Object = {
      opacity: [1, 0],
      translateZ: 0,
    };
    const { close, component, visible } = this.props;

    const ChildComponent = component;

    if (!visible || !component) {
      return <div />;
    }

    const size = 80;

    return (
      <div
        className="panel overlay--solid-dark fixed"
        style={this.getContainerStyle()}
        onClick={close}
        id="@@modal"
      >
        <VelocityComponent animation={slide} duration={300} runOnMount>
          <section id="letsShowSomethingSection" className={this.layoutClasses()}>
            <div>
              {this.props.heroImage &&
                this.props.heroImage.length > 0 &&
                <div>
                  <img src={this.props.heroImage} alt="hero" />
                </div>}
              {this.props.profileImage && (
                <div style={this.profileImageClasses()} className="text-center">
                  <div
                    style={{
                      border: this.props.heroImage ? "3px solid #fff" : "none",
                      display: "inline-block",
                      width: size,
                      height: size,
                      backgroundImage: `url('${this.props.profileImage}')`,
                    }}
                    className="round background--fill"
                  />
                </div>
              )}
              {!this.props.profileImage && (
                <div style={this.profileImageClasses()} className="text-center">
                  <div
                    style={{
                      border: this.props.heroImage ? "3px solid #fff" : "none",
                      display: "inline-block",
                      width: size,
                      height: size,
                    }}
                    className="round floating background--fill background--primary"
                  >
                    <div 
                      className="icon-logo display-block floating__item"
                      style={{
                        fontSize: "40px",
                        color: "white",
                        marginTop: "-13px"
                      }}
                    />
                  </div>
                </div>
              )}

              {!this.props.heroImage && this.props.profileImage && (
                <div className="text-center">
                  <img src={this.props.profileImage} alt="default" width={size} height={size} />
                </div>
              )}
              <div
                style={{ marginTop: "-40px", backgroundColor: "white" }}
                className={`soft-double-top soft-bottom soft-sides text-center ${this.props.heroImage ? "" : "rounded-top"}`}
              >
                <ChildComponent close={this.props.close} />
              </div>
            </div>
          </section>
        </VelocityComponent>
      </div>
    );
  }
}
