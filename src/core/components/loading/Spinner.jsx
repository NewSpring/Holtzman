import { Component, PropTypes} from "react"

import Styles from "./spinner.css"

function getClasses(mergeClasses) {
  let classes = [
    Styles.loader
  ]

  if (mergeClasses) {
    classes = classes.concat(mergeClasses)
  }

  return classes.join(" ")
}

const Spinner = ({ theme, styles, classes }) => (
  <div
    className={ theme || getClasses(classes) }
    style={ styles || {} }
  ></div>
)

export default Spinner
