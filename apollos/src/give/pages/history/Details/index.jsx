import { Component, PropTypes} from "react"
import { connect } from "react-apollo"
import gql from "graphql-tag";

import { nav as navActions } from "../../../../core/store"
import { transactions as transactionActions } from "../../../store"

import Layout from "./Layout"


const mapQueriesToProps = ({ ownProps }) => ({
  data: {
    query: gql`
      query GetTransaction($transactionId: ID!) {
        transaction: node(id: $transactionId) {
          id
          ... on Transaction {
            id
            date
            summary
            status
            person {
              firstName
              nickName
              lastName
            }
            details {
              id
              amount
              account {
                name
                description
                summary
                end
                start
              }
            }
            payment {
              id
              paymentType
              accountNumber
            }
          }
        }
      }
    `,
    variables: {
      transactionId: ownProps.params.id
    },
  },
});

@connect({ mapQueriesToProps })
export default class Details extends Component {

  componentWillMount() {
    this.props.dispatch(navActions.setLevel("BASIC_CONTENT"))
  }

  componentWillUnmount() {
    this.props.dispatch(navActions.setLevel("TOP"))
  }

  render () {
    let { loading, transaction } = this.props.data
    // if (loading) return <Loading /> // XXX

    return <Layout transaction={transaction} />;
  }
}
