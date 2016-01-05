
import { Component, PropTypes} from "react"

export default class Loading extends Component {

  styles = () => {

    const defaults = {
      position: "fixed",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 9999
    }

    return {...defaults, ...this.props.styles}

  }

  getClasses = () => {
    let classes = []

    if (this.props.classes) {
      classes = [...classes, ...this.props.classes]
    }

    return classes.join(" ")
  }


  render () {
    return (
      <div
        className={this.props.theme || this.getClasses()}
        style={this.styles()}>
        {this.props.children}
      </div>
    )

  }
}
