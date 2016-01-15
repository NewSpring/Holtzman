import { Link } from "react-router"

import Split, { Left, Right } from "../../../core/blocks/split"

const Close = () => (
  <Link to="/profile" className="text-light-primary plain soft overlay__item locked-top locked-right">
    <i className="icon-close h4"></i>
  </Link>
)

const Layout = ({ photo, person }) => (
  <Split nav={true}>

    <Right
      mobile={false}
      classes={["floating", "overlay--solid-dark"]}
      ratioClasses={["floating__item", "overlay__item", "one-whole", "text-center"]}
      background={photo}
      blur={true}
      outsideRatio={this.close}
    >
      <div className="soft one-whole">
        <div
          className="background--fill ratio--square round two-fifths display-inline-block"
          style={{ backgroundImage: `url(${photo})`}}
        ></div>
      <h4 className="text-light-primary soft-half-top flush-bottom">{person.NickName || person.FirstName} {person.LastName}</h4>
        <p className="text-light-primary flush"><em>{person.Home.City}</em></p>
      </div>

    </Right>

    <Left scroll={true} classes={["locked-ends locked-sides"]}>
      {this.props.children}
    </Left>

  </Split>
)

Layout.propTypes = {
  photo: PropTypes.string,
  person: PropTypes.obj
}

export default Layout
