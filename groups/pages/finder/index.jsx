import { Component, PropTypes, Children, cloneElement} from "react"
import { connect } from "react-redux"

import { Map } from "../../../core/components"

import Search from "./Search"
import List from "./List"

import Layout from "./Layout"

const map = (state) => ({ person: state.onBoard.person })
@connect(map)
class Template extends Component {

  render() {
    return <h3>Hello World</h3>
  }
}


const Routes = [
  {
    path: "finder",
    component: Template,
    indexRoute: {
      component: Search
    },
    // childRoutes: [
    //   { path: "list/:hash", component: List }
    // ]
  }
]

export default {
  Template,
  Routes
}
