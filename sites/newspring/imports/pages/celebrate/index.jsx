import { Component, PropTypes } from "react"

import Meta from "apollos/lib/core/components/meta"
import Intro from "./intro/index.jsx"

import Salvation from "./salvation/index.jsx"
import Baptism from "./baptism/index.jsx"
import CareRoom from "./care-room/index.jsx"
import Serving from "./serving/index.jsx"
import KidSpring from "./kidspring/index.jsx"
import Fuse from "./fuse/index.jsx"
import GauntletX from "./gauntlet-x/index.jsx"
import FloodSCWithLove from "./flood-sc-with-love/index.jsx"
import ClemsonForChristmas from "./clemson-for-christmas/index.jsx"
import Missions from "./missions/index.jsx"
import Web from "./web/index.jsx"
import SocialMedia from "./social-media/index.jsx"
import NewSpringNetwork from "./newspring-network/index.jsx"

import Closing from "./closing/index.jsx"

class Template extends Component {
  render () {
    return (
      <div>
        <Meta title="Annual Report" />

        <Intro />

        <Salvation />
        <Baptism />
        <CareRoom />
        <Serving />

        <KidSpring />
        <Fuse />
        <GauntletX />

        <FloodSCWithLove />

        <ClemsonForChristmas />

        <Missions />

        <Web />
        <SocialMedia />
        <NewSpringNetwork />

        <Closing />
      </div>

    )
  }
}


const Routes = [
  {
    path: "/celebrate",
    component: Template,
  },
]

export default {
  Template,
  Routes
}
