import { Component, PropTypes} from "react"
import { connect } from "react-redux"

import Layout from "./Layout"

const map = (state) => ({ person: state.onBoard.person })
@connect(map)
export default class Home extends Component {
  render () {

    const { person } = this.props
    const { PhotoUrl } = person

    let photo = PhotoUrl ? `//core-rock.newspring.cc/${PhotoUrl}` : null

    return <Layout photo={photo} person={person} />
  }
}
