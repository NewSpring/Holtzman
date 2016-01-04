import { Component, PropTypes} from "react"

import Styles from "./loading.spinner.css"

export default class Spinner extends Component {

  getClasses = () => {
    let classes = [
      Styles.loader
    ]

    if (this.props.classes) {
      classes = classes.concat(this.props.classes)
    }

    return classes.join(" ")
  }

  render () {
    return (
      <div
        className={this.props.theme || this.getClasses()}
        style={this.props.styles || {}}
      ></div>
    )
  }
}
