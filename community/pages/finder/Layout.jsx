import { PropTypes } from "react"
// import { VelocityComponent } from "velocity-react"

import Split, { Left, Right } from "../../../core/blocks/split"
import Meta from "../../../core/components/meta"

const Layout = ({ classes, childClasses, photo, markers, children, right }, context) => (

    <div>
      <Split nav={true} classes={["background--light-primary"]}>
        <Meta title="Group Finder" />
        <Right
          mobile={true}
          classes={classes}
          ratioClasses={childClasses}
          background={photo}
        >
          {right()}

        </Right>



      </Split>
      <Left scroll={true} classes={["background--light-primary"]}>
        {children}
      </Left>
    </div>

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
