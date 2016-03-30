import { Component, PropTypes} from "react"
import { connect } from "react-redux"

import { GraphQL } from "../../../../core/graphql"
import { nav as navActions } from "../../../../core/store"
import { transactions as transactionActions } from "../../../store"

import Layout from "./Layout"


function getTransaction(id, account, dispatch){
  let mongoId = Meteor.userId()
  let query = `
    {
      transaction: finanicalTransaction(id: ${id}, mongoId: "${mongoId}") {
        id
        date
        summary
        details {
          id
          amount
          date
        }
        payment {
         id
         paymentType
         accountNumber
       }
      }
      account: financialAccount(id: ${account}) {
        id
        name
        description
        summary
        image
        end
        start
      }
    }
  `

  return GraphQL.query(query)
    .then(({transaction, account}) => {
      transaction.account = account
      const obj = {
        [transaction.id]: transaction
      }
      dispatch(transactionActions.add(obj))
    })
}


const map = (state) => ({
  person: state.accounts.person,
  transactions: state.transactions.transactions
})

@connect(map)
export default class Details extends Component {

  static fetchData(getStore, dispatch, props) {
    const { id, account } = props.params
    return getTransaction(id, account, dispatch)
  }

  componentWillMount() {
    this.props.dispatch(navActions.setLevel("BASIC_CONTENT"))
  }

  componentDidMount(){
    const { id, account } = this.props.params
    const { dispatch } = this.props
    getTransaction(id, account, dispatch)
  }

  componentWillUnmount() {
    this.props.dispatch(navActions.setLevel("TOP"))
  }


  render () {
    const id = Number(this.props.params.id)
    let transaction = this.props.transactions[id]
    transaction || (transaction = false)
    let account = transaction.account
    account || (account = {})

    return (
      <Layout
        transaction={transaction}
        person={this.props.person}
        account={account}
      />
    )
  }
}
