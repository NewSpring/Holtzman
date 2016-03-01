import { Component, PropTypes} from "react"
import { connect } from "react-redux"

import { GraphQL } from "../../../core/graphql"
import Authorized from "../../../core/blocks/authorzied"
import { nav as navActions, modal as modalActions } from "../../../core/store"

import {
  transactions as transactionActions,
  give as giveActions
} from "../../store"

import Details from "./Details"
import Layout from "./Layout"
import Confirm from "./Details/Confirm"


function mapArrayToObj(array){
  let obj = {}
  for (let item of array) { obj[item.id] = item }
  return obj
}

function getSchedules(dispatch) {
  let query = `
    query ScheduledTransactions($mongoId: String) {
      transactions: allScheduledFinanicalTransactions(mongoId: $mongoId, cache: false) {
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
          order
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
  give: store.give
})

@connect(map)
export default class Template extends Component {

  state = {
    loaded: true
  }

  static fetchData(getStore, dispatch) {
    let mongoId = Meteor.userId();

    return getAccounts(dispatch)
      .then((accounts) => {
        if (mongoId) {
          return getSchedules(dispatch)
            // .then(() => {
            //   this.setState({loaded: true})
            // })
        }
        // this.setState({loaded: true})
      })
  }



  componentDidMount(){
    const { dispatch } = this.props

    this.setState({
      loaded: false
    })

    let mongoId = Meteor.userId();

    return getAccounts(dispatch)
      .then((accounts) => {

        if (mongoId) {
          return getSchedules(dispatch)
            .then(() => {
              this.setState({loaded: true})
            })
        }
        this.setState({loaded: true})
      })

  }

  confirm = (e) => {
    const { dataset } = e.currentTarget
    const { id } = dataset
    this.props.dispatch(giveActions.setRecoverableSchedule(Number(id)))

    return true
  }

  cancel = (e) => {
    const { dataset } = e.currentTarget
    const { id } = dataset
    const { dispatch } = this.props

    this.props.dispatch(modalActions.render(Confirm, {
      onFinished: () => {
        dispatch(giveActions.deleteSchedule(id))

        Meteor.call("give/schedule/cancel", { id }, (err, response) => {
          console.log(err, response)
        })
      }
    }))

  }


  render () {
    const { schedules, give } = this.props
    const { accounts, recoverableSchedules } = give
    let transactions = []
    for (const transaction in schedules) {
      transactions.push(schedules[transaction])
    }

    let mappedAccounts = []
    for (const account in accounts) {
      mappedAccounts.push(accounts[account])
    }

    mappedAccounts = _.sortBy(mappedAccounts, "order")

    let recovers = []
    for (const recover in recoverableSchedules) {
      recovers.push(recoverableSchedules[recover])
    }

    return (
      <Layout
        ready={this.state.loaded}
        schedules={transactions}
        accounts={mappedAccounts}
        cancelSchedule={this.cancel}
        recoverableSchedules={recovers}
        confirm={this.confirm}
      />
    )
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
