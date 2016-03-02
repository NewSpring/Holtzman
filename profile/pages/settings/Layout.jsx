import { PropTypes } from "react"
import { Link } from "react-router"
import Meta from "react-helmet"
import { VelocityComponent } from "velocity-react"

import Split, { Left, Right } from "../../../core/blocks/split"

const Close = () => (
  <Link to="/profile" className="text-light-primary plain soft overlay__item locked-top locked-right">
    <i className="icon-close h4"></i>
  </Link>
)

const Layout = ({ photo, person, children }, context) => (
  <VelocityComponent
    animation={"transition.fadeIn"}
    duration={500}
    runOnMount={context.shouldAnimate}
  >
    <Split nav={true} classes={["background--light-primary"]}>

      <Meta
        title={`${person.nickName} ${person.lastName}`}
        titleTemplate="%s | NewSpring Church"
      />

      <Right
        mobile={true}
        classes={["floating", "overlay--solid-dark"]}
        ratioClasses={["floating__item", "overlay__item", "one-whole", "text-center"]}
        background={photo}
        blur={true}
      >
        <div className="soft one-whole">
          <div
            className="background--fill ratio--square round two-fifths display-inline-block"
            style={{ backgroundImage: `url(${photo})`}}
          ></div>
        <h4 className="text-light-primary soft-half-top flush-bottom">{person.nickName || person.firstName} {person.lastName}</h4>
          <p className="text-light-primary flush"><em>{person.home.city}</em></p>
        </div>

      </Right>

      <Left scroll={true} classes={["locked-ends@lap-and-up locked-sides@lap-and-up"]}>
        {children}
      </Left>

    </Split>
  </VelocityComponent>
)

Layout.propTypes = {
  photo: PropTypes.string,
  person: PropTypes.object
}

Layout.contextTypes = { shouldAnimate: PropTypes.bool };

export default Layout
