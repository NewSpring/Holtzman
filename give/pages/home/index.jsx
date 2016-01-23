import { Component, PropTypes} from "react"
import { connect } from "react-redux"
import ReactMixin from "react-mixin"

import { GraphQL } from "./../../../core"

import { give as giveActions } from "../../store"

import Layout from "./Layout"


function mapArrayToObj(array){
  let obj = {}
  for (let item of array) { obj[item.id] = item }
  return obj
}

const map = (state) => ({ accounts: state.give.accounts })

@connect(map)
@ReactMixin.decorate(ReactMeteorData)
export default class Home extends Component {


  static fetchData(getState, dispatch){
    return GraphQL.query(`
      {
       	accounts: allFinancialAccounts(limit: 100, ttl: 8640) {
          description
          name
          id
          summary
          image
        }
      }
    `).then(result => {
      const obj = mapArrayToObj(result.accounts.filter((x) => (x.summary)))
      dispatch(giveActions.setAccounts(obj))
    })
  }

  componentDidMount(){

    const { dispatch } = this.props
    GraphQL.query(`
      {
       	accounts: allFinancialAccounts(limit: 100, ttl: 8640) {
          description
          name
          id
          summary
          image
        }
      }
    `).then(result => {
      const obj = mapArrayToObj(result.accounts.filter((x) => (x.summary)))
      dispatch(giveActions.setAccounts(obj))
    })

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
