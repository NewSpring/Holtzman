import { PropTypes } from "react"

import Split, { Left, Right } from "../../../core/blocks/split"

const Layout = ({ classes, childClasses, photo, markers, children, right }) => (
  <Split nav={true}>

    <Right
      mobile={true}
      classes={classes}
      ratioClasses={childClasses}
      background={photo}
    >
      {right()}

    </Right>

    <Left scroll={true} >
      {children}
    </Left>

  </Split>
)

Layout.propTypes = {
  classes: PropTypes.array,
  childClasses: PropTypes.array,
  photo: PropTypes.string,
  hash: PropTypes.string,
  markers: PropTypes.array,
}

export default Layout
