
import { Component, PropTypes } from "react";
import { connect } from "react-apollo";
import gql from "graphql-tag";

import {
  nav as navActions,
  transactions as transactionActions,
  header as headerActions,
} from "../../../../store";

import Layout from "./Layout";

const mapQueriesToProps = ({ ownProps }) => ({
  entries: {
    query: gql`
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
    `,
    variables: {
      tagName: "giving",
      limit: 2,
      includeChannels: ["articles"],
    },
  },
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
      transactionId: ownProps.params.id,
    },
  },
});

@connect({ mapQueriesToProps })
export default class Details extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    entries: PropTypes.object.isRequired,
  }

  componentWillMount() {
    this.props.dispatch(navActions.setLevel("BASIC_CONTENT"));
  }

  componentDidMount(){
    if (process.env.NATIVE) {
      const item = {
        title: "Contribution Details",
      };

      this.props.dispatch(headerActions.set(item));
      this.setState({
        __headerSet: true,
      });
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
