// @flow
import PropTypes from "prop-types";

import { Component } from "react";
// $FlowMeteor
import { Meteor } from "meteor/meteor";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import fileSaver from "file-saver";
import moment from "moment";

import infiniteScroll from "../../../components/@enhancers/infinite-scroll";
import createContainer from "../../../deprecated/meteor/react-meteor-data";

import Authorized from "../../../components/people/authorized";
import base64ToBlob from "../../../util/base64ToBlob";

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
    currentVariables: PropTypes.object,
    getPDF: PropTypes.func,
  };

  state = { refetching: false, printLoading: false };

  componentWillMount() {
    this.props.setRightProps({
      background: "////dg0ddngxdz549.cloudfront.net/images/cached/images/remote/http_s3.amazonaws.com/ns.images/newspring/_fpo/NScollege-cip-0033_1700_1133_90_c1.jpg",
    });
  }

  wrapRefetch = (refetch: Function) =>
    (...args: Object[]) => {
      this.setState({ refetching: true });
      return refetch(...args).then(x => {
        this.setState({ refetching: false });
        return x;
      });
    };

  onPrintClick = (e: Event) => {
    e.preventDefault();
    const { limit, start, end } = this.props.currentVariables;

    // XXX default shows all transactions, but we only want to print YTD
    const vars = limit && !start && !end
      ? { ...this.props.currentVariables, start: moment().startOf("year") }
      : this.props.currentVariables;

    this.setState({ printLoading: true });
    this.props
      .getPDF(vars)
      .then(({ data: { transactionStatement } }) => {
        const blob = base64ToBlob(transactionStatement.file);
        this.setState({ printLoading: false });
        fileSaver.saveAs(blob, "NewSpring Church Giving Summary.pdf");
      })
      .catch(() => {
        this.setState({ printLoading: false });
      });
  };

  render() {
    const {
      transactions,
      loading,
      filter,
      done,
      Loading,
      filterTransactions,
    } = this.props;

    const { printLoading } = this.state;

    return (
      <Authorized>
        <Layout
          transactions={transactions || []}
          family={filter.family || []}
          alive
          ready={!loading}
          reloading={this.state.refetching}
          Loading={Loading}
          done={done}
          filterTransactions={this.wrapRefetch(filterTransactions)}
          onPrintClick={this.onPrintClick}
          printLoading={printLoading}
        />
      </Authorized>
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

const GET_STATEMENT = gql`
  mutation GetGivingStatement($limit: Int, $skip: Int, $people: [Int], $start: String, $end: String) {
    transactionStatement(
      limit: $limit,
      skip: $skip,
      people: $people,
      start: $start,
      end: $end
    ){
      file
    }
  }
`;

const withStatement = graphql(GET_STATEMENT, {
  props: ({ mutate }) => ({ getPDF: variables => mutate({ variables }) }),
});

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
  options: ({ authorized }) => ({
    variables: {
      limit: DEFAULT_LIMIT,
      skip: 0,
      people: [],
      start: "",
      end: "",
    },
    fetchPolicy: "network-only",
    skip: !authorized,
    ssr: false,
  }),
  props: ({ data }) => ({
    currentVariables: data.variables,
    transactions: data.transactions || [],
    loading: data.loading,
    done: data.variables.limit === 0 ||
      (data.transactions &&
        !data.loading &&
        data.transactions.length < data.variables.limit + data.variables.skip),
    fetchMore: () =>
      data.fetchMore({
        variables: { ...data.variables, skip: data.transactions.length },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult.data) return previousResult;
          const transactions = [
            ...previousResult.transactions,
            ...fetchMoreResult.data.transactions,
          ];
          return {
            transactions: transactions.filter(x => !!x.id),
          };
        },
      }),
    filterTransactions: ({ people, start, end, limit = 0 }) =>
      data.refetch({ ...data.variables, people, start, end, limit }),
  }),
});

const authorized = () => ({ authorized: Meteor.userId() });

const Template = createContainer(
  authorized,
  withFilter(
    withStatement(withTransactions(infiniteScroll()(TemplateWithoutData))),
  ),
);

const Routes = [
  {
    path: "history",
    component: Template,
    indexRoute: { component: Template },
  },
];

export default {
  Template,
  Routes,
};

export { TemplateWithoutData };
