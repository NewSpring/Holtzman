import { Component, PropTypes} from "react"
import { connect } from "react-redux"
import ReactMixin from "react-mixin"

import { Loading } from "../../../core/components"
import { nav as navActions } from "../../../core/store"

import { Accounts as Acc } from "../../collections"

import Layout from "./Layout"

@connect()
@ReactMixin.decorate(ReactMeteorData)
export default class Template extends Component {

  componentWillMount() {
    this.props.dispatch(navActions.setLevel("CONTENT"))
  }

  componentWillUnmount() {
    this.props.dispatch(navActions.setLevel("TOP"))
  }

  getMeteorData() {
    Meteor.subscribe("accounts")
    const Name = decodeURI(this.props.params.name);
    const account = Acc.findOne({ Name });

    return {
      account,
    };

  }

  render () {

    const { account } = this.data

    if (!account) {
      return <Loading/>
    }

    return <Layout account={account} />
  }
}


const Routes = [
  { path: "campaign/:name", component: Template }
]

export default {
  Template,
  Routes
}
