import { Component, PropTypes} from "react"
import { connect } from "react-redux"

import styles from "../nav/offset.css"

import Right from "./Right"
import Left from "./Left"

export {
  Right,
  Left,
}

const map = (state) => ({ navigation: state.nav })

@connect(map)
export default class SplitContainer extends Component {

  static propTypes = {
    classes: PropTypes.array,
    theme: PropTypes.string,
    styles: PropTypes.object,
    nav: PropTypes.bool
  }

  static defaultProps = {
    styles: {}
  }

  layoutClasses = () => {
    let classes = [
      "panel"
    ];

    if (this.props.classes) {
      classes.concat(this.props.classes);
    }

    if (this.props.navigation.visible && this.props.nav) {
      classes.push(styles["offset"])
    }

    return classes.join(" ");
  }

  render () {
    return (
      <div
        className={ this.props.theme || this.layoutClasses() }
        style={ this.props.styles }
      >
        {this.props.children}
      </div>
    )
  }
}
