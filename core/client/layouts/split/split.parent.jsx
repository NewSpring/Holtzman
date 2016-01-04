import { Component, PropTypes} from "react"
import { connect } from "react-redux"

import styles from "../../blocks/nav/nav.offset.css"

function map(state) {
  return {
    navigation: state.nav
  }
}

@connect(map)
export default class Split extends Component {

  static propTypes = {
    classes: PropTypes.array,
    theme: PropTypes.string,
    styles: PropTypes.object,
    nav: PropTypes.bool
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

  styles = () => { return {} }

  render () {
    return (
      <div
        className={ this.props.theme || this.layoutClasses() }
        style={ this.props.styles || this.styles() }
      >
        {this.props.children}
      </div>
    )
  }
}
