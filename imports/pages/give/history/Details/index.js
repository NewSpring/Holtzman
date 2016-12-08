
import { Component, PropTypes } from "react";
import { graphql } from "react-apollo";
import { connect } from "react-redux";
import gql from "graphql-tag";

import {
  nav as navActions,
  header as headerActions,
} from "../../../../store";

import Layout from "./Layout";

class DetailsWithoutData extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    entries: PropTypes.object,
    setRightProps: PropTypes.func,
  }

  componentWillMount() {
    this.props.dispatch(navActions.setLevel("BASIC_CONTENT"));
    this.props.setRightProps({
      background: "//s3.amazonaws.com/ns.images/all/heroes/newspring/campuses/Florence.1.2x1_1700_850_90_c1.jpg",
    });
  }

  componentDidMount() {
    if (process.env.NATIVE) {
      const item = {
        title: "Contribution Details",
      };

      this.props.dispatch(headerActions.set(item));
    }
  }

  componentWillUnmount() {
    this.props.dispatch(navActions.setLevel("TOP"));
  }

  render() {
    const { transaction } = this.props.data;
    const { entries, loading } = this.props.entries;
    // if (loading) return <Loading /> // XXX

    return (<Layout
      transaction={transaction}
      entries={entries}
      loadingEntries={loading}
    />);
  }
}

const ENTRIES_QUERY = gql`
  query GetTaggedContent($tagName: String!, $limit: Int, $includeChannels: [String]) {
    entries: taggedContent(
      tagName: $tagName,
      limit: $limit,
      includeChannels: $includeChannels,
      cache: false
    ) {
      entryId: id
      title
      channelName
      status
      meta {
        summary
        urlTitle
      }
      content {
        images(sizes: ["large"]) {
          fileName
          fileType
          fileLabel
          url
        }
      }
    }
  }
`;

const withEntries = graphql(ENTRIES_QUERY, {
  name: "entries",
  options: {
    variables: { tagName: "giving", limit: 2, includeChannels: ["articles"] },
  },
});

const TRANSACTIONS_QUERY = gql`
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
`;

const withTransactions = graphql(TRANSACTIONS_QUERY, {
  options: (ownProps) => ({
    variables: {
      transactionId: ownProps.params.id,
    },
  }),
});

const Details = connect()(
  withEntries(
    withTransactions(
      DetailsWithoutData
    )
  )
);

export default Details;

export {
  DetailsWithoutData,
};
