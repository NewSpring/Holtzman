import { Component, PropTypes} from "react"
import { connect } from "react-redux"

import Layout from "./Layout"
import { Likes, Following } from "../../blocks"

const map = (state) => ({ person: state.onBoard.person })
@connect(map)
export default class Home extends Component {

  state = {
    content: 0
  }

  content = [<Likes />, <Following />]

  getContent = () => {
    return this.content[this.state.content]
  }

  onToggle = (toggle) => {
    this.setState({
      content: toggle
    })
  }

  render () {

    const { person } = this.props
    const { PhotoUrl } = person

    let photo = PhotoUrl ? `//core-rock.newspring.cc/${PhotoUrl}` : null

    return (
      <Layout
        photo={photo}
        person={person}
        onToggle={this.onToggle}
        content={this.getContent()}
      />
    )
  }
}
