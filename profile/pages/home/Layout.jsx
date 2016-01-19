import { Component, PropTypes} from "react"
import { Link } from "react-router"

import Split, { Left, Right } from "../../../core/blocks/split"
import { Toggle } from "../../../core/components/controls"

const SettingsLink = () => (
  <Link to="/profile/settings" className="text-light-primary plain soft overlay__item locked-top locked-right">
    <i className="icon-settings h4"></i>
  </Link>
)

const Layout = ({ photo, person, onToggle, content }) => (
  <Split nav={true}>

    <Right
      mobile={true}
      classes={["floating", "overlay--solid-dark"]}
      ratioClasses={["floating__item", "overlay__item", "one-whole", "text-center"]}
      background={photo}
      blur={true}
      outsideRatio={SettingsLink}
    >
      <div className="soft one-whole">
        <div
          className="background--fill ratio--square round two-fifths display-inline-block"
          style={{ backgroundImage: `url(${photo})`}}
        ></div>
        <h4 className="text-light-primary soft-half-top flush-bottom">{person.FirstName} {person.LastName}</h4>
        <p className="text-light-primary flush"><em>{person.Home.City}</em></p>
      </div>

    </Right>

    <Left scroll={true}>
      <Toggle items={["Likes", "Following"]} toggle={onToggle} />

      <div className="soft soft-double@lap-and-up push-double@lap-wide-and-up">

        {content}

      </div>
    </Left>

  </Split>
)


export default Layout
