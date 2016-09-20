import { Component } from "react";

export default class ComingSoon extends Component {

  overlayStyles = {
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: "2",
    height: "100%",
    position: "fixed",
  }

  overlayClasses = () =>
    [
      "one-whole",
      "soft-double-top",
      "floating--top",
    ].join(" ");

  containerClasses = () =>
    [
      "background--light-secondary",
      "rounded",
      "three-quarters",
      "soft",
      "floating__item",
      "push-double-top",
    ].join(" ");

  render() {
    return (
      <div style={this.overlayStyles} className={this.overlayClasses()}>
        <div style={this.containerStyles} className={this.containerClasses()}>
          <h3 className="text-dark-secondary">Discover Is Coming Soon!</h3>
        </div>
      </div>
    );
  }

}
