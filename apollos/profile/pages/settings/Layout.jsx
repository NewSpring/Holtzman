import { PropTypes } from "react"
import { Link } from "react-router"
// import { VelocityComponent } from "velocity-react"

import Split, { Left, Right } from "../../../core/blocks/split"
import Meta from "../../../core/components/meta"

const Close = () => (
  <Link to="/profile" className="text-light-primary plain soft overlay__item locked-top locked-right">
    <i className="icon-close h4"></i>
  </Link>
)

const Layout = ({ photo, person, children, mobile, onUpload }, context) => (
  <div>
    <Meta
      title={person ? `${person.nickName} ${person.lastName}` : "Profile"}
      image={photo ? photo : null}
    />
  <Split nav={true} classes={mobile ? ["background--light-secondary"] : ["background--light-primary"]}>
      <Right
        mobile={mobile}
        classes={["floating", "overlay--solid-dark"]}
        ratioClasses={["floating__item", "overlay__item", "one-whole", "text-center"]}
        background={photo}
        blur={true}
      >
        <div className="soft one-whole">
          <label htmlFor="file"
            className="background--fill ratio--square round two-fifths display-inline-block"
            style={{ backgroundImage: `url(${photo})`, position: "relative"}}
          >
            <input onChange={onUpload} type="file" className="locked-ends locked-sides" style={{opacity: 0}} />
          </label>
        <h4 className="text-light-primary soft-half-top flush-bottom">{person.nickName || person.firstName} {person.lastName}</h4>
          <p className="text-light-primary flush"><em>{person.home.city}</em></p>
        </div>

      </Right>

    </Split>

    <Left scroll={true} classes={!mobile ? ["locked-ends@handheld", "locked-sides@handheld", "scrollable", "background--light-primary"] : ["background--light-primary"]}>
      {children}
    </Left>
  </div>

)

Layout.propTypes = {
  photo: PropTypes.string,
  person: PropTypes.object
}

Layout.contextTypes = { shouldAnimate: PropTypes.bool };

export default Layout
