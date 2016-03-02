import { PropTypes } from "react"
import { VelocityComponent } from "velocity-react"

import Split, { Left, Right } from "../../../core/blocks/split"

const Layout = ({ classes, childClasses, photo, markers, children, right }, context) => (
  <VelocityComponent
    animation={"transition.fadeIn"}
    duration={500}
    runOnMount={context.shouldAnimate}
  >
    <Split nav={true}>

      <Right
        mobile={true}
        classes={classes}
        ratioClasses={childClasses}
        background={photo}
      >
        {right()}

      </Right>

      <Left scroll={true} classes={["background--light-primary"]}>
        {children}
      </Left>

    </Split>
  </VelocityComponent>
)

Layout.propTypes = {
  classes: PropTypes.array,
  childClasses: PropTypes.array,
  photo: PropTypes.string,
  hash: PropTypes.string,
  markers: PropTypes.array,
}

Layout.contextTypes = { shouldAnimate: PropTypes.bool };

export default Layout
