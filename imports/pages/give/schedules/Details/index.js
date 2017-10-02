import PropTypes from 'prop-types';
import { Component } from "react";
import { connect } from "react-redux";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

import Authorized from "../../../../components/people/authorized";

import {
  nav as navActions,
  modal as modalActions,
  give as giveActions,
  header as headerActions,
} from "../../../../data/store";

import Confirm from "./Confirm";
import Layout from "./Layout";

class DetailsWithoutData extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    data: PropTypes.shape({
      loading: PropTypes.bool,
      transaction: PropTypes.object,
    }),
    entries: PropTypes.object,
    cancel: PropTypes.func.isRequired,
  }

  state = {
    isActive: true,
    removed: null,
  }

  componentWillMount() {
    this.props.dispatch(navActions.setLevel("BASIC_CONTENT"));
  }

  componentDidMount() {
    if (process.env.NATIVE) {
      const item = { title: "Schedule Details" };
      this.props.dispatch(headerActions.set(item));
    }
  }

  componentWillUnmount() {
    this.props.dispatch(navActions.setLevel("TOP"));
    if (this.state.removed) {
      this.props.dispatch(giveActions.deleteSchedule(this.state.removed));
    }
  }

  stop = (e) => {
    e.preventDefault();

    this.props.dispatch(modalActions.render(Confirm, {
      onFinished: () => {
        const { id } = this.props.data.transaction;

        this.setState({ isActive: false, removed: id });
        // XXX error states
        this.props.cancel(id);
      },
    }));
  }

  render() {
    let complete = false;
    let { transaction } = this.props.data;
    if (!transaction) {
      transaction = false;
    }
    if (new Date(transaction.next) < new Date() && transaction.schedule.value === "One-Time") {
      complete = true;
    }

    const { entries, loading } = this.props.entries;

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
    );
  }
}

const ENTRIES_QUERY = gql`
  query GetTaggedContent($tagName: String!, $limit: Int, $includeChannels: [String]) {
    entries: taggedContent(
      tagName: $tagName,
      limit: $limit,
      includeChannels: $includeChannels
    ) {
      entryId: id
      title
      channelName
      status
      meta { summary, urlTitle }
      content { images(sizes: ["large"]) { fileName, fileType, fileLabel, url } }
    }
  }
`;

const withEntries = graphql(ENTRIES_QUERY, {
  name: "entries",
  options: {
    variables: {
      tagName: "giving",
      limit: 2,
      includeChannels: ["articles"],
    },
  },
});

const SCHEDULE_TRANSACTION_QUERY = gql`
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
`;

const withScheduleTransaction = graphql(SCHEDULE_TRANSACTION_QUERY, {
  options: (ownProps) => ({
    variables: { scheduleTransactionId: ownProps.params.id },
    forceFetch: true,
  }),
});

export const CANCEL_SCHEDULE_QUERY = gql`
  mutation CancelSchedule($id: Int!) {
    cancelSchedule(entityId: $id) {
      code
      success
      error
      schedule {
        entityId
      }
    }
  }
`;

const withCancelSchedule = graphql(CANCEL_SCHEDULE_QUERY, {
  props: ({ mutate }) => ({
    // XXX add in optimistic reponse and remove need for state management
    // XXX add in updateQueries to remove need for refetch on schedules pages
    cancel: (id) => mutate({ variables: { id } }),
  }),
});

const Details = connect()(
  withEntries(
    withScheduleTransaction(
      withCancelSchedule(
        DetailsWithoutData
      )
    )
  )
);

const Routes = [
  {
    path: "schedules/:id",
    component: Authorized,
    indexRoute: { component: Details },
  },
];

export default {
  Details,
  Routes,
};

export {
  DetailsWithoutData,
};
