import { Component, PropTypes} from "react"
import { connect } from "react-redux"

import { nav as navActions, modal, collections as collectionActions } from "../../../../../core/store"
import OnBoard from "../../../../../core/blocks/onBoard"
import { GraphQL } from "../../../../../core/graphql"
import { join } from "../../../../methods/join"

import { routeActions } from "../../../../../core/store/routing"

import Layout from "./Layout"
import Join from "./Join"

const map = (state) => ({
  person: state.onBoard.person,
  authorized: state.onBoard.authorized,
  previousLocations: state.routing.location.previous
})
@connect(map)
export default class Profile extends Component {

  state = {
    profile: null
  }

  componentDidMount() {
    this.props.dispatch(navActions.setLevel("BASIC_CONTENT"))
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

  sendRequest = (e, callback) => {
    e.preventDefault()

    const { currentTarget } = e
    let message = currentTarget.querySelectorAll("textarea")[0].value.replace(new RegExp("\\n", "gmi"), "<br/>")
    join(Number(this.props.params.groupId), message, callback)
  }

  join = () => {

    const join = () => {
      let profile = this.getProfile()
      this.props.dispatch(modal.render(Join, {
        group: profile,
        onExit: this.closeModal,
        onClick: this.sendRequest,
        person: this.props.person || {}
      }))
    }

    if (this.props.authorized) {
      join()
    } else {
      this.props.dispatch(modal.render(OnBoard, {
        onFinished: join
      }))
    }

  }

  // override view all results link if can go back
  // this preserves scroll state
  handleBack = (event) => {
    const lastLocation = this.props.previousLocations[this.props.previousLocations.length-1];

    if (lastLocation === `/groups/finder/list/${this.props.params.hash}`) {
      event.preventDefault();
      this.props.dispatch(routeActions.goBack());
    }
  }

  render () {
    let profile = this.getProfile()

    if (!profile) {
      return null
    }

    return <Layout group={profile} join={this.join} hash={this.props.params.hash} handleBack={this.handleBack} />
  }
}
