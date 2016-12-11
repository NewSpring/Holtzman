
// @flow

import React, { Component } from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import SavedPaymentCard from "../../../components/cards/cards.SavedPayment";
import SectionHeader from "../../../components/sectionHeader";
import SmallButton from "../../../components/buttons/small";

const SavedPaymentsButton = () =>
  <SmallButton
    text="Add Account"
    linkUrl="/give/history"
    className="btn--dark-tertiary flush"
  />;

const SCHEDULE_QUERY = gql`
  query scheduledTransactions {
    scheduledTransactions {
      id
      start
      details {
        account {
          name
        }
        amount
      }
      transactions {
        date
      }
      schedule {
        description
      }
    }
  }
`;
const withSchedules = graphql(SCHEDULE_QUERY, {
  name: "schedules",
});

type ISavedPaymentsList = {
  schedules: Object,
};

export class SavedPaymentsList extends Component {
  props: ISavedPaymentsList;

  render() {
    if (!this.props.schedules || !this.props.schedules.scheduledTransactions) return <div />;
    return (<div />);
  }
}

export default withSchedules(SavedPaymentsList);
