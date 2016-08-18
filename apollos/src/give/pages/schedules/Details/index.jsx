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
  entries: {
    query: gql`
      query GetTaggedContent($tagName: String!, $limit: Int, $includeChannels: [String]) {
        entries: taggedContent(tagName: $tagName, limit: $limit, includeChannels: $includeChannels) {
          entryId: id
          title
          channelName
          status
          meta { summary, urlTitle }
          content { images(sizes: ["large"]) { fileName, fileType, fileLabel, url } }
        }
      }
    `,
    variables: {
      tagName: "giving",
      limit: 2,
      includeChannels: ["articles"],
    }
  },
  data: {
    query: gql`
      query GetScheduleTransaction($scheduleTransactionId: ID!) {
        transaction: node(id: $scheduleTransactionId) {
          ... on ScheduledTransaction {
            numberOfPayments
            next
            end
            id: entityId
            reminderDate
            gateway
            start
            date
            details { amount, account { name, description } }
            payment { paymentType, accountNumber, id }
            schedule { value, description }
            transactions {
              id
              date
              status
              summary
              person { firstName, lastName, photo }
              details { id, amount, account { id, name } }
            }
          }
        }
      }
    `,
    variables: { scheduleTransactionId: ownProps.params.id },
    forceFetch: true,
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
      this.props.dispatch(giveActions.deleteSchedule(this.state.removed))
    }
  }


  stop = (e) => {
    e.preventDefault()

    this.props.dispatch(modalActions.render(Confirm, {
      onFinished: () => {
        const { id, gateway } = this.props.data.transaction;

        this.setState({isActive: false, removed: id})
        Meteor.call("give/schedule/cancel", {id, gateway}, (err, response) => {
          console.log(err, response)
          console.log(id, gateway)
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

    const { entries, loading } = this.props.entries

    return (
      <Layout
        stop={this.stop}
        schedule={transaction}
        ready={!this.props.data.loading}
        state={this.state}
        active={this.state.isActive}
        complete={complete}
        entries={entries}
        loadingEntries={loading}
      />
    )
  }
}
