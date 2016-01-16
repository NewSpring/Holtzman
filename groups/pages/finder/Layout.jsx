import { PropTypes } from "react"

import Split, { Left, Right } from "../../../core/blocks/split"
import { Map } from "../../../core/components"

const Layout = ({ classes, childClasses, photo, hash, markers, children }) => (
  <Split nav={true}>

    <Right
      mobile={true}
      classes={classes}
      ratioClasses={childClasses}
      background={photo}
    >
      {() => {
        if (hash) {
          return (
            <Map
              markers={markers}
              onMarkerHover={this.onMarkerHover}
              onChildClick={this.onChildClick}
              active={this.state.active}
              hover={this.state.hover}
            />
          )
        }

        return (
          <div className="soft one-whole">
           <h4 className="text-light-primary soft-half-top flush-bottom">Group Finder</h4>
           <p className="text-light-primary flush"><em>Find a community</em></p>
         </div>
        )


      }()}

    </Right>

    <Left scroll={true} >
      {children}
    </Left>

  </Split>
)

Layout.propTypes = {
  classes: PropTypes,
  childClasses: PropTypes,
  photo: PropTypes,
  hash: PropTypes,
  markers: PropTypes,
  children: PropTypes,
}

export default Layout
