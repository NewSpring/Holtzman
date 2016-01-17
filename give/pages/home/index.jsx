import { Component, PropTypes} from "react"
import { connect } from "react-redux"
import ReactMixin from "react-mixin"

import { give as giveActions } from "../../store"
import { Accounts as Acc } from "../../collections"

import Layout from "./Layout"

const mapArrayToObj = (array) => {
  let obj = {}

  for (let item of array) {
    obj[item.Id] = item
  }

  return obj
}

const bindAccounts = (props) => {
  const { dispatch } = props

  let handle = {}
  Tracker.autorun((computation) => {
    // return computation for dismount
    handle = computation

    // subscribe to sections
    Meteor.subscribe("accounts")
    let accounts = Acc.find().fetch()

    // persist in the store
    dispatch(giveActions.setAccounts(mapArrayToObj(accounts)))

  })

  return { handle }

}

const map = (state) => ({ accounts: state.give.accounts })

@connect(map)
@ReactMixin.decorate(ReactMeteorData)
export default class Home extends Component {

  componentWillMount(){

    if (Meteor.isClient) {
      let { handle } = bindAccounts(this.props)
      this.handle = handle
    }

  }

  componentWillUnmount(){
    if (this.handle) {
      this.handle.stop()
    }

  }

  getMeteorData() {
    let alive = true;

    try {
      alive = serverWatch.isAlive("ROCK")
    } catch (e) {}

    return {
      alive
    }
  }

  render () {
    let accounts = []
    for (let account in this.props.accounts) {
      accounts.push(this.props.accounts[account])
    }

    return <Layout accounts={accounts} alive={this.data.alive} />
  }
}
