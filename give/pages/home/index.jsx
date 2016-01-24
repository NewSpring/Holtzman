import { Component, PropTypes} from "react"
import { connect } from "react-redux"
import ReactMixin from "react-mixin"

import { GraphQL } from "./../../../core"

import { give as giveActions } from "../../store"

import Layout from "./Layout"


const map = (state) => ({ accounts: state.give.accounts })

@connect(map)
@ReactMixin.decorate(ReactMeteorData)
export default class Home extends Component {

  componentWillMount(){

  static fetchData(getState, dispatch){
    return GraphQL.query(`
      {
       	accounts: allFinancialAccounts(limit: 100, ttl: 8640) {
          description
          name
          id
          summary
          image
          order
        }
      }
    `).then(result => {
      const obj = mapArrayToObj(result.accounts.filter((x) => (x.summary)))
      dispatch(giveActions.setAccounts(obj))
    })
  }

    let start = new Date()

    GraphQL.query(`
      {
       	accounts: allFinancialAccounts(limit: 100, ttl: 8640) {
          description
          name
          id
          summary
          image
          order
        }
      }
    `).then(result => {
      let finished = new Date()
      let time = finished - start

      const obj = mapArrayToObj(result.accounts.filter((x) => (x.summary)))
      // remove once we update react-router-ssr
      console.log(`got data in ${time} ms`)
      dispatch(giveActions.setAccounts(obj))

    })
    .done()


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
