import { Component, PropTypes} from "react"
import { connect } from "react-redux"

import { nav as navActions, modal } from "../../../../../core/store"

import Layout from "./Layout"
import Join from "./Join"

const map = (state) => ({ person: state.onBoard.person })
@connect(map)
export default class Profile extends Component {

  componentWillMount() {
    this.props.dispatch(navActions.setLevel("CONTENT"))
  }

  getProfile = () => {
    const { groups } = this.props
    const { groupId } = this.props.params

    let profile = false
    for (let group of groups) {
      if (Number(group.id) === Number(groupId)) {
        profile = group
        break
      }
    }

    return profile
  }

  closeModal = (e) => {
    if (e && e.preventDefault) {
      e.preventDefault()
    }
    this.props.dispatch(modal.hide())
  }

  sendRequest = (e) => {
    e.preventDefault()

    const { currentTarget } = e
    console.log(currentTarget)

  }

  join = () => {

    let profile = this.getProfile()
    console.log(this.props)
    this.props.dispatch(modal.render(Join, {
      group: profile,
      onExit: this.closeModal,
      onClick: this.sendRequest,
      person: this.props.person || {}
    }))
  }

  render () {
    let profile = this.getProfile()
    console.log(this.props)
    if (!profile) {
      return null
    }

    return <Layout group={profile} join={this.join} />
  }
}
