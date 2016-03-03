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
class Template extends Component {

  static fetchData(getState, dispatch){
    return GraphQL.query(`
      {
       	accounts: allFinancialAccounts(limit: 100, ttl: 86400) {
          description
          name
          id
          summary
          image
          order
          images {
            fileName
            fileType
            fileLabel
            s3
            cloudfront
          }
        }
      }
    `).then(({accounts}) => {
      let accts = []
      for (let account of accounts) {
        account.formatedImage = {}
        if (account.images && account.images.length) {
          for (let image of account.images) {
            let img = image.cloudfront ? image.cloudfront : image.s3
            img || (img = account.image)
            account.formatedImage[image.fileLabel] = img
          }
        }
        accts.push(account)
      }

      const obj = mapArrayToObj(accts.filter((x) => (x.summary)))
      dispatch(giveActions.setAccounts(obj))
    })
  }

  componentDidMount(){

    const { dispatch } = this.props
    GraphQL.query(`
      {
       	accounts: allFinancialAccounts(limit: 100, ttl: 86400) {
          description
          name
          id
          summary
          image
          order
          images {
            fileName
            fileType
            fileLabel
            s3
            cloudfront
          }
        }
      }
    `).then(({accounts}) => {
      let accts = []
      for (let account of accounts) {
        account.formatedImage = {}
        if (account.images && account.images.length) {
          for (let image of account.images) {
            let img = image.cloudfront ? image.cloudfront : image.s3
            img || (img = account.image)
            account.formatedImage[image.fileLabel] = img
          }
        }
        accts.push(account)
      }

      const obj = mapArrayToObj(accts.filter((x) => (x.summary)))
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
    accounts = accounts.sort((a, b) => {
      a = a.order
      b = b.order
      return a < b ? -1 : a > b ? 1 : 0;
    })

    return <Layout accounts={accounts} alive={this.data.alive} />
  }
}

const Routes = [
  { path: "now", component: Template }
]

export default {
  Template,
  Routes
}
