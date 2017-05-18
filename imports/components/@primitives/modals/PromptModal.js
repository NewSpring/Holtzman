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
  profileImage: string // assuming this is the url to the image
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

  layoutClasses = () => {
    const classList = ["hard", "flush", "background--light-primary push-half-left rounded-top"];

    classList.push(css(offsetStyles.offset));
    classList.push(css(styles["prompt-panel"]));

    return classList.join(" ");
  };

  profileImageClasses = () => {
    const classes = {};
    if (this.props.heroImage && this.props.heroImage.length > 0) {
      classes.marginTop = "-35px";
    }
    return classes;
  };

  // render the prompt modal component.
  render() {
    const slide = {
      opacity: [1, 0],
      translateZ: 0,
    };
    const ChildComponent = this.props.component;
    const defaultPersonImage =
      "https://pbs.twimg.com/profile_images/640498978539245568/YubwjicR.png";

    return (
      <div
        className="panel overlay--solid-dark fixed"
        style={this.getContainerStyle()}
        onClick={this.props.close}
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
              {this.props.profileImage &&
                this.props.profileImage.length > 0 &&
                <div style={this.profileImageClasses()} className="text-center">
                  <img
                    src={this.props.profileImage}
                    alt="avatar"
                    width="64px"
                    height="64px"
                    style={{ border: "5px solid #fff" }}
                    className="round"
                  />
                </div>}
              {(!this.props.heroImage || this.props.heroImage.length === 0) &&
                (!this.props.profileImage || this.props.profileImage.length === 0) &&
                <div className="text-center">
                  <img src={defaultPersonImage} alt="default" width="64px" height="64px" />
                </div>}
              <div
                style={{ marginTop: "-40px" }}
                className="soft-double-top soft-sides text-center"
              >
                <ChildComponent />
              </div>
            </div>
          </section>
        </VelocityComponent>
      </div>
    );
  }
}
