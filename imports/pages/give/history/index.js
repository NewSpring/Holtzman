import { Component, PropTypes } from "react";
import { graphql } from "react-apollo";
import { connect } from "react-redux";
import gql from "graphql-tag";

import infiniteScroll from "../../../decorators/infiniteScroll";

import Authorized from "../../../blocks/authorzied";
import { header as headerActions } from "../../../store";

import Layout from "./Layout";

class TemplateWithoutData extends Component {

  static propTypes = {
    loading: PropTypes.bool,
    transactions: PropTypes.array,
    changeDates: PropTypes.func,
    changeFamily: PropTypes.func,
    Loading: PropTypes.func.isRequired,
    done: PropTypes.bool,
    filter: PropTypes.shape({
      family: PropTypes.array, // eslint-disable-line
    }),
    dispatch: PropTypes.func,
    setRightProps: PropTypes.func,
  }

  state = { refetching: false }

  componentWillMount() {
    this.props.setRightProps({
      background: "////dg0ddngxdz549.cloudfront.net/images/cached/images/remote/http_s3.amazonaws.com/ns.images/newspring/_fpo/NScollege-cip-0033_1700_1133_90_c1.jpg",
    });
  }

  componentDidMount() {
    if (process.env.NATIVE) this.props.dispatch(headerActions.set({ title: "Giving History" }));
  }

  wrapRefetch = (refetch) => (...args) => {
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
      changeDates,
      changeFamily,
      filter,
      done,
      Loading,
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
        changeFamily={this.wrapRefetch(changeFamily)}
        changeDates={this.wrapRefetch(changeDates)}
      />
    );
  }
}

const FILTER_QUERY = gql`
  query GetFilterContent {
    family: currentFamily {
      person { photo, nickName, firstName, lastName, id: entityId }
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
const withTransactions = graphql(TRANSACTIONS_QUERY, {
  options: {
    variables: { limit: 20, skip: 0, people: [], start: "", end: "" },
    forceFetch: true,
  },
  props: ({ data }) => ({
    transactions: data.transactions || [],
    loading: data.loading,
    done: (
      data.transactions &&
      !data.loading &&
      data.transactions.length < data.variables.limit + data.variables.skip
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
    changeFamily: (people) => data.fetchMore({
      variables: { ...data.varibles, people },
      updateQuery: (previousResult, { fetchMoreResult }) => (
        !fetchMoreResult.data ? previousResult : fetchMoreResult.data
      ),
    }),
    changeDates: (start, end) => data.fetchMore({
      variables: { ...data.varibles, start, end },
      updateQuery: (previousResult, { fetchMoreResult }) => (
        !fetchMoreResult.data ? previousResult : fetchMoreResult.data
      ),
    }),
  }),
});

const Template = connect()(
  withFilter(
    withTransactions(
      infiniteScroll()(
        TemplateWithoutData
      )
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
