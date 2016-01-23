import { Component, PropTypes} from "react"
import { connect } from "react-redux"

import { GraphQL } from "../../../core/graphql"
import { Loading } from "../../../core/components"
import { nav as navActions } from "../../../core/store"

import { give as giveActions } from "../../store"

import Layout from "./Layout"

const map = (state) => ({ accounts: state.give.accounts })


function getAccounts(name, dispatch){

  let query = `
    {
      account: financialAccount(name: "${name}") {
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


  static fetchData(getStore, dispatch, props){
    const name =  decodeURI(props.params.name)
    const store = getStore()

    if (!getAccount(name, store.give.accounts)) {
      return getAccounts(name, dispatch)
    }

    return
  }

  componentWillMount() {
    this.props.dispatch(navActions.setLevel("CONTENT"))
  }

  componentDidMount(){

    const { dispatch } = this.props
    const name =  decodeURI(this.props.params.name)

    return this.accounts(dispatch)

  }

  componentWillUnmount() {
    this.props.dispatch(navActions.setLevel("TOP"))
  }

  accounts = (dispatch) => {
    const name =  decodeURI(this.props.params.name)
    const account = getAccount(name, this.props.accounts)

    if (!account) {
      let query = `
        {
          account: financialAccount(name: "${name}") {
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

  }


  render () {

    const account = getAccount(decodeURI(this.props.params.name), this.props.accounts)

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
