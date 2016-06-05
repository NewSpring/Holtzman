import { Component, PropTypes } from "react"

import Meta from "apollos/core/components/meta"
import Intro from "./intro"

import Salvation from "./salvation"
import Baptism from "./baptism"
import CareRoom from "./care-room"
import Serving from "./serving"
import KidSpring from "./kidspring"
import Fuse from "./fuse"
import GauntletX from "./gauntlet-x"
import FloodSCWithLove from "./flood-sc-with-love"
import ClemsonForChristmas from "./clemson-for-christmas"
import Missions from "./missions"
import Web from "./web"
import SocialMedia from "./social-media"
import NewSpringNetwork from "./newspring-network"

import Closing from "./closing"

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
