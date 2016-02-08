import { PropTypes } from "react"
import { Link } from "react-router"

import Split, { Left, Right } from "../../../core/blocks/split"

const Close = () => (
  <Link to="/profile" className="text-light-primary plain soft overlay__item locked-top locked-right">
    <i className="icon-close h4"></i>
  </Link>
)

const Layout = ({ photo, person, children }) => (
  <Split nav={true}>

    <Right
      mobile={false}
      classes={["floating", "overlay--solid-dark"]}
      ratioClasses={["floating__item", "overlay__item", "one-whole", "text-center"]}
      background={photo}
      blur={true}
      outsideRatio={Close}
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

    <Left scroll={true} classes={["locked-ends locked-sides"]}>
      {children}
    </Left>

  </Split>
)

Layout.propTypes = {
  photo: PropTypes.string,
  person: PropTypes.object
}

export default Layout
