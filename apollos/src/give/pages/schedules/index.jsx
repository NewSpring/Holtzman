import { Component, PropTypes} from "react"
import { connect } from "react-apollo"
import gql from "graphql-tag";

import Authorized from "../../../core/blocks/authorzied"
import {
  nav as navActions,
  modal as modalActions,
} from "../../../core/store"

import { give as giveActions } from "../../store"

import Details from "./Details"
import Layout from "./Layout"
import Confirm from "./Details/Confirm"
import Recover from "./Recover"

const mapQueriesToProps = () => ({
  schedules: {
    query: gql`
      query GetScheduleTransactions {
        schedules: scheduledTransactions {
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
    `,
    ssr: true,
  },
  accounts: {
    query: gql`
      query GetFinancialAccounts {
        accounts {
          description
          name
          id
          entityId
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
    `,
    ssr: true,
  }
});

const mapStateToProps = (store) => ({
  give: store.give,
});

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
        dispatch(giveActions.deleteSchedule(id))

        Meteor.call("give/schedule/cancel", { id }, (err, response) => {
          console.log(err, response)
        })
      }
    }))

  }


  render () {
    const { schedules, accounts, give } = this.props
    const { recoverableSchedules } = give

    return (
      <Layout
        accountsReady={!accounts.loading}
        schedules={schedules.schedules}
        schedulesReady={!schedules.ready}
        accounts={accounts.accounts}
        cancelSchedule={this.cancel}
        recoverableSchedules={recoverableSchedules}
        confirm={this.confirm}
      />
    )
  }
}


const Routes = [
  { path: "schedules", component: Template },
  {
    path: "schedules/transfer",
    component: Authorized,
    indexRoute: { component: Recover }
  },
  {
    path: "schedules/:id",
    component: Authorized,
    indexRoute: { component: Details }
  }
]

export default {
  Template,
  Routes
}
