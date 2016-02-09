import { Component, PropTypes} from "react"
import { connect } from "react-redux"

import { GraphQL } from "../../../../core/graphql"
import { nav as navActions } from "../../../../core/store"
import { transactions as transactionActions } from "../../../store"

import Layout from "./Layout"

function getTransaction(id, dispatch){
  let query = `
  {
    transaction: scheduledFinanicalTransaction(id: ${id}) {
      numberOfPayments
      next
      end
      id
      reminderDate
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
    .then(({transaction}) => {
      const obj = {
        [transaction.id]: transaction
      }
      dispatch(transactionActions.addSchedule(obj))
    })
}


const map = (state) => ({
  person: state.onBoard.person,
  transactions: state.transactions.scheduledTransactions

})

@connect(map)
export default class Details extends Component {

  state = {
    isActive: true
  }

  static fetchData(getStore, dispatch, props) {
    const { id } = props.params
    return getTransaction(id, dispatch)
  }

  componentWillMount() {
    this.props.dispatch(navActions.setLevel("CONTENT"))
  }

  componentDidMount(){
    const { id } = this.props.params
    const { dispatch } = this.props
    getTransaction(id, dispatch)
  }

  componentWillUnmount() {
    this.props.dispatch(navActions.setLevel("TOP"))
  }


  stop = (e) => {
    e.preventDefault()

    const { id, gateway } = this.props.transactions[Number(this.props.params.id)]

    this.setState({isActive: false})
    Meteor.call("give/schedule/cancel", {id, gateway}, (err, response) => {

    })
  }

  render () {
    const id = Number(this.props.params.id)
    let transaction = this.props.transactions[id]

    return (
      <Layout
        stop={this.stop}
        schedule={transaction}
        state={this.state}
        person={this.props.person}
      />
    )
  }
}
