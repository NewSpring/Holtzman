// @flow

import { Component } from "react";
import { VelocityComponent } from "velocity-react";
import { css } from "aphrodite";
import styles from "./modal-css";
import offsetStyles from "../nav/offset-css";

type IPromptModal = {
  component: Function,
  heroImage: string, // assuming this is the url to the image
  profileImage: string // assuming this is the url to the image
};

export default class PromptModal extends Component {
  // set the types of the props.
  props: IPromptModal;

  // set default property values.
  defaultProps = {
    component: () => {},
    heroImage: "",
    profileImage: "",
  };

  getContainerStyle() {
    return {
      zIndex: 100,
      position: "fixed",
    };
  }

  layoutClasses = () => {
    const classList = ["hard", "flush", "background--light-primary push-half-left"];

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
      "https://s3.amazonaws.com/ns.assets/apollos/group-profile-placeholder.png";
    return (
      <div className="panel overlay--solid-dark fixed" style={this.getContainerStyle()}>
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
                    style={{ border: "5px solid #ddd" }}
                  />
                </div>}
              {(!this.props.heroImage || this.props.heroImage.length === 0) &&
                (!this.props.profileImage || this.props.profileImage.length === 0) &&
                <div className="text-center">
                  <img src={defaultPersonImage} alt="default" width="64px" height="64px" />
                </div>}
              <div
                style={{ marginTop: "-35px" }}
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
