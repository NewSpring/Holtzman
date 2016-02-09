import { Component, PropTypes} from "react"
import { connect } from "react-redux"
import ReactMixin from "react-mixin"

import { Loading } from "../../../core/components"
import { nav as navActions } from "../../../core/store"

import { Accounts as Acc } from "../../collections"

import Layout from "./Layout"

const map = (state) => ({ accounts: state.give.accounts })


function getAccounts(name, dispatch){

  let query = `
    {
      account: financialAccount(name: "${name}", cache: false) {
        description
        name
        id
        summary
        image
      }
    }
  `

  return GraphQL.query(query)
    .then(result => {

      let obj = { [result.account.id]: result.account }

      dispatch(giveActions.setAccounts(obj))
    })
}

function getAccount(name, accounts){
  for (let account in accounts) {

    if (accounts[account].name === name) {
      return accounts[account]
    }
  }

  return false
}


@connect(map)
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
