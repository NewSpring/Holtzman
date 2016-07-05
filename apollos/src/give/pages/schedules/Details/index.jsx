import { Component, PropTypes} from "react"
import { connect } from "react-apollo"
import gql from "graphql-tag";

import {
  nav as navActions,
  modal as modalActions,
} from "../../../../core/store";

import { give as giveActions } from "../../../store";

import Confirm from "./Confirm"
import Layout from "./Layout"

const mapQueriesToProps = ({ ownProps }) => ({
  data: {
    query: gql`
      query GetScheduleTransaction($scheduleTransactionId: ID!) {
        transaction: node(id: $scheduleTransactionId) {
          id
          ... on ScheduledTransaction {
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
      }
    `,
    variables: { scheduleTransactionId: ownProps.params.id },
    ssr: true,
  }
})

@connect({ mapQueriesToProps })
export default class Details extends Component {

  state = {
    isActive: true,
    removed: null
  }

  componentWillMount() {
    this.props.dispatch(navActions.setLevel("BASIC_CONTENT"))
  }

  componentWillUnmount() {
    this.props.dispatch(navActions.setLevel("TOP"))
    if (this.state.removed) {
      // XXX need to clean up after launch
      this.props.dispatch(giveActions.deleteSchedule(this.state.removed))
      this.props.dispatch(transactionActions.removeSchedule(this.state.removed))
    }
  }


  stop = (e) => {
    e.preventDefault()

    this.props.dispatch(modalActions.render(Confirm, {
      onFinished: () => {
        const { id, gateway } = this.props.transactions[Number(this.props.params.id)]

        this.setState({isActive: false, removed: id})
        Meteor.call("give/schedule/cancel", {id, gateway}, (err, response) => {
          // console.log(err, response)
        })
      }
    }))

  }

  render () {

    let complete = false;
    let { transaction } = this.props.data;
    transaction || (transaction = false);
    if (new Date(transaction.next) < new Date() && transaction.schedule.value === "One-Time") {
      complete = true
    }

    return (
      <Layout
        stop={this.stop}
        schedule={transaction}
        ready={!this.props.data.loading}
        state={this.state}
        active={this.state.isActive}
        complete={complete}
      />
    )
  }
}
