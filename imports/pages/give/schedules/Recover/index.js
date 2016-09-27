import { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

import {
  modal as modalActions,
  give as giveActions,
  header as headerActions,
} from "../../../../store";

import Layout from "./Layout";
import Confirm from "./../Details/Confirm";

const SCHEDULED_TRANSACTIONS_QUERY = gql`
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
`;

const withScheduledTransactions = graphql(SCHEDULED_TRANSACTIONS_QUERY);

const FINANCIAL_ACCOUNTS_QUERY = gql`
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
`;

const withFinancialAccounts = graphql(FINANCIAL_ACCOUNTS_QUERY, { name: "accounts" });

const mapStateToProps = store => ({ give: store.give });
const defaultArray = [];

@withScheduledTransactions
@withFinancialAccounts
@connect(mapStateToProps)
export default class Template extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    accounts: PropTypes.object.isRequired,
  }

  componentDidMount() {
    if (process.env.NATIVE) {
      const item = { title: "Schedule Transfer" };
      this.props.dispatch(headerActions.set(item));
    }
  }

  confirm = (e) => {
    const { dataset } = e.currentTarget;
    const { id } = dataset;
    this.props.dispatch(giveActions.setRecoverableSchedule(Number(id)));

    return true;
  }

  cancel = (e) => {
    const { dataset } = e.currentTarget;
    const { id } = dataset;

    this.props.dispatch(modalActions.render(Confirm, {
      onFinished: () => {
        this.props.dispatch(giveActions.deleteSchedule(id));
        // WUT, need to clean up after launch
        this.props.dispatch(giveActions.deleteSchedule(Number(id)));
        // this.props.dispatch(transactionActions.removeSchedule(Number(id)))
        this.props.dispatch(giveActions.deleteRecoverableSchedules(Number(id)));
        Meteor.call("give/schedule/cancel", { id }, () => {
          // console.log(err, response)
        });
      },
    }));
  }


  render() {
    const { data, accounts } = this.props;

    return (
      <Layout
        ready={!this.props.data.loading}
        accounts={accounts.accounts || defaultArray}
        cancelSchedule={this.cancel}
        recoverableSchedules={data.transactions || defaultArray}
        confirm={this.confirm}
        person={this.props.data.person || {}}
      />
    );
  }
}
