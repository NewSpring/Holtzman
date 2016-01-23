import { Component, PropTypes} from "react"
import { connect } from "react-redux"

import { GraphQL } from "../../../core/graphql"
import { Authorized } from "../../../core/blocks"
import { nav as navActions } from "../../../core/store"

import {
  transactions as transactionActions,
  give as giveActions
} from "../../store"

import Details from "./Details"
import Layout from "./Layout"

function mapArrayToObj(array){
  let obj = {}
  for (let item of array) { obj[item.id] = item }
  return obj
}

function getSchedules(dispatch) {
  let query = `
    query ScheduledTransactions($mongoId: String) {
      transactions: allScheduledFinanicalTransactions(mongoId: $mongoId) {
        numberOfPayments
        next
        end
        id
        reminderDate
        code
        gateway
        start
        date
        details {
          amount
          account {
            name
            description
          }
        }
        payment {
          paymentType
          accountNumber
          id
        }
        schedule {
          value
          description
        }
      }
    }
  `
  return GraphQL.query(query)
    .then(({ transactions }) => {
      let mappedObj = {}

      for (const transaction of transactions) {
        mappedObj[transaction.id] = transaction
      }

      dispatch(transactionActions.addSchedule(mappedObj))

      return transactions
    })
}

function getAccounts(dispatch) {
  return GraphQL.query(`
      {
        accounts: allFinancialAccounts(limit: 100, ttl: 86400) {
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
      return result
    })
}

const map = (store) => ({
  schedules: store.transactions.scheduledTransactions,
  accounts: store.give.accounts
})

@connect(map)
export default class Template extends Component {

  state = {
    loaded: false
  }

  static fetchData(getStore, dispatch) {
    let mongoId = Meteor.userId();

    return getAccounts(dispatch)
      .then((accounts) => {
        this.setState({loaded: true})
        if (mongoId) {
          return getSchedules(dispatch)
        }
      })
  }

  componentDidMount(){
    const { dispatch } = this.props

    let mongoId = Meteor.userId();

    return getAccounts(dispatch)
      .then((accounts) => {
        this.setState({loaded: true})
        if (mongoId) {
          return getSchedules(dispatch)
        }
      })

  }

  render () {
    const { schedules, accounts } = this.props

    let transactions = []
    for (const transaction in schedules) {
      transactions.push(schedules[transaction])
    }

    let mappedAccounts = []
    for (const account in accounts) {
      mappedAccounts.push(accounts[account])
    }

    console.log(transactions)
    return <Layout ready={this.state.loaded} schedules={transactions} accounts={mappedAccounts} />
  }
}


const Routes = [
  { path: "recurring", component: Template },
  {
    path: "recurring/:id",
    component: Authorized,
    indexRoute: { component: Details }
  }
]

export default {
  Template,
  Routes
}
