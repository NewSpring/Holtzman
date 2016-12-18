// @flow
import { Component, PropTypes } from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

import infiniteScroll from "../../../decorators/infiniteScroll";

import Authorized from "../../../blocks/authorzied";

import Layout from "./Layout";

class TemplateWithoutData extends Component {

  static propTypes = {
    loading: PropTypes.bool,
    transactions: PropTypes.array,
    filterTransactions: PropTypes.func,
    Loading: PropTypes.func.isRequired,
    done: PropTypes.bool,
    filter: PropTypes.shape({
      family: PropTypes.array, // eslint-disable-line
    }),
    setRightProps: PropTypes.func,
  }

  state = { refetching: false }

  componentWillMount() {
    this.props.setRightProps({
      background: "////dg0ddngxdz549.cloudfront.net/images/cached/images/remote/http_s3.amazonaws.com/ns.images/newspring/_fpo/NScollege-cip-0033_1700_1133_90_c1.jpg",
    });
  }

  wrapRefetch = (refetch: Function) => (...args: Object[]) => {
    this.setState({ refetching: true });
    return refetch(...args).then((x) => {
      this.setState({ refetching: false });
      return x;
    });
  }

  render() {
    const {
      transactions,
      loading,
      filter,
      done,
      Loading,
      filterTransactions,
    } = this.props;

    return (
      <Layout
        transactions={transactions}
        family={filter.family || []}
        alive
        ready={!loading}
        reloading={this.state.refetching}
        Loading={Loading}
        done={done}
        filterTransactions={this.wrapRefetch(filterTransactions)}
      />
    );
  }
}

const FILTER_QUERY = gql`
  query GetFilterContent {
    family: currentFamily {
      person { nickName, firstName, lastName, id: entityId }
    }
  }
`;
const withFilter = graphql(FILTER_QUERY, { name: "filter" });

const TRANSACTIONS_QUERY = gql`
  query GetTransactions($limit: Int, $skip: Int, $people: [Int], $start: String, $end: String) {
    transactions(
      limit: $limit,
      skip: $skip,
      people: $people,
      start: $start,
      end: $end,
      cache: false
    ) {
      id
      date
      status
      summary
      person { firstName, lastName, photo }
      details {
        id
        amount
        account { id, name }
      }
    }
  }
`;

const DEFAULT_LIMIT = 20;

const withTransactions = graphql(TRANSACTIONS_QUERY, {
  options: {
    variables: { limit: DEFAULT_LIMIT, skip: 0, people: [], start: "", end: "" },
    forceFetch: true,
    ssr: false,
  },
  props: ({ data }) => ({
    transactions: data.transactions || [],
    loading: data.loading,
    done: (
      data.variables.limit === 0 ||
      (
        data.transactions &&
        !data.loading &&
        data.transactions.length < data.variables.limit + data.variables.skip
      )
    ),
    fetchMore: () => data.fetchMore({
      variables: { ...data.variables, skip: data.transactions.length },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult.data) return previousResult;
        const transactions = [...previousResult.transactions, ...fetchMoreResult.data.transactions];
        return {
          transactions: transactions.filter((x) => !!x.id),
        };
      },
    }),
    filterTransactions: ({ people, start, end, limit = 0 }) =>
      data.refetch({ ...data.variables, people, start, end, limit }),
  }),
});

const Template = withFilter(
  withTransactions(
    infiniteScroll()(
      TemplateWithoutData
    )
  )
);

const Routes = [
  {
    path: "history",
    component: Authorized,
    indexRoute: { component: Template },
  },
];

export default {
  Template,
  Routes,
};

export {
  TemplateWithoutData,
};
