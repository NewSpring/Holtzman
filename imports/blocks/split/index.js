import { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { css } from "aphrodite";

import styles from "./panel-css";

import Right from "./Right";
import Left from "./Left";

export {
  Right,
  Left,
};

const map = state => ({ navigation: state.nav });

@connect(map)
export default class SplitContainer extends Component {

  static propTypes = {
    classes: PropTypes.array,
    theme: PropTypes.string,
    styles: PropTypes.object,
    nav: PropTypes.bool,
    children: PropTypes.object,
    navigation: PropTypes.object,
  }

  static defaultProps = {
    styles: {},
  }

  layoutClasses = () => {
    let classes = [
      "panel",
      "fixed@lap-and-up",
      css(styles.panel),
    ];

    if (this.props.classes) {
      classes = classes.concat(this.props.classes);
    }

    if (this.props.navigation.visible && this.props.nav !== false) {
      classes.push(css(styles.offset));
    }

    return classes.join(" ");
  }

  render() {
    return (
      <div
        className={this.props.theme || this.layoutClasses()}
        style={this.props.styles}
      >
        {this.props.children}
      </div>
    );
  }
}
