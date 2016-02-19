import { Component, PropTypes} from "react"
import { connect } from "react-redux"
import { Link } from "react-router"
import Moment from "moment"

import { Forms } from "../../../../core/components"

const map = (state) => ({ person: state.onBoard.person, campuses: state.campuses.campuses })

@connect(map)
export default class HomeAddress extends Component {

  state = {
    state: "default"
  }

  render() {
    return <div></div>
  }
}
