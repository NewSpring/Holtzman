import { Component, PropTypes } from "react";
import { connect } from "react-apollo";
import gql from "apollo-client/gql";

import Authorized from "../../../../core/blocks/authorzied";
import {
  nav as navActions,
  modal as modalActions,
} from "../../../../core/store";

import { give as giveActions } from "../../../store"

import Layout from "./Layout"
import Confirm from "./../Details/Confirm"

// XXX remove cache: false when heighliner caching is tested
const mapQueriesToProps = () => ({
  data: {
    query: gql`
      query GetScheduleTransactions {
        transactions: scheduledTransactions(isActive: false, cache: false) {
          numberOfPayments
          next
          end
          id: entityId
          reminderDate
          gateway
          start
          date
          details { amount, account { name, description, id: entityId } }
          payment { paymentType, accountNumber, id }
          schedule { value, description }
        }
        person: currentPerson { firstName, lastName }
      }
    `,
    forceFetch: true,
  },
  accounts: {
    query: gql`
      query GetFinancialAccounts {
        accounts {
          description
          name
          id: entityId
          summary
          image
          order
          images { fileName, fileType, fileLabel, s3, cloudfront }
        }
      }
    `,
  }
})

const mapStateToProps = (store) => ({ give: store.give })
let defaultArray = [];

@connect({ mapStateToProps, mapQueriesToProps })
export default class Template extends Component {

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
        this.props.dispatch(giveActions.deleteSchedule(id))
        // WUT, need to clean up after launch
        this.props.dispatch(giveActions.deleteSchedule(Number(id)))
        // this.props.dispatch(transactionActions.removeSchedule(Number(id)))
        this.props.dispatch(giveActions.deleteRecoverableSchedules(Number(id)))
        Meteor.call("give/schedule/cancel", { id }, (err, response) => {
          // console.log(err, response)
        })
      }
    }))

  }


  render () {
    const { schedules, give, data, accounts } = this.props
    const { recoverableSchedules } = give

    return (
      <Layout
        ready={!this.props.data.loading}
        accounts={accounts.accounts || defaultArray}
        cancelSchedule={this.cancel}
        recoverableSchedules={data.transactions || defaultArray}
        confirm={this.confirm}
        person={this.props.data.person || {}}
      />
    )
  }
}
