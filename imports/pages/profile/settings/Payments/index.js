
import { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

import { nav } from "../../../../store";

import Layout from "./Layout";

export const PAYMENT_DETAILS_QUERY = gql`
  query PaymentDetails($cache: Boolean) {
    accounts: savedPayments(cache: $cache) {
      id: entityId
      name
      payment {
        id
        accountNumber
        paymentType
      }
    }
  }
`;

export const withPaymentDetails = graphql(PAYMENT_DETAILS_QUERY, {
  options: { forceFetch: true, variables: { cache: false } },
});

export const REMOVE_PAYMENT_MUTATION = gql`
  mutation RemoveSavedPayment($id: Int!) {
    cancelSavedPayment(entityId: $id) {
      error
      code
      success
    }
  }
`;

export const withPaymentRemove = graphql(REMOVE_PAYMENT_MUTATION, {
  props: ({ mutate }) => ({
    remove: (id) => mutate({
      variables: { id },
      // updateQueries
    }),
  }),
});

export class GiveNow extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    data: PropTypes.shape({
      loading: PropTypes.bool,
      refetch: PropTypes.func,
      accounts: PropTypes.array,
    }),
    remove: PropTypes.func.isRequired,
  }

  state = { accounts: null, loading: null, error: null };

  componentWillMount() {
    this.props.dispatch(nav.setLevel("BASIC_CONTENT"));
  }

  componentWillUnmount() {
    this.props.dispatch(nav.setLevel("TOP"));
  }

  remove = (id) => {
    this.setState({ loading: true, accounts: [], error: null });
    this.props.remove(id)
      .then(({ data }) => {
        if (data.error) {
          this.setState({ error: data.error, loading: null, accounts: null });
          setTimeout(() => {
            this.setState({ error: null, loading: null, accounts: null });
          }, 500);
          return;
        }
      })
      // XXX use updateQueries instead of refetch to remove the id
      .then(() => this.props.data.refetch())
      .then(() => {
        this.setState({ loading: null, accounts: null, error: null });
      });
  }

  render() {
    let { accounts, loading } = this.props.data;

    if (this.state.accounts !== null) accounts = this.state.accounts;
    if (this.state.loading !== null) loading = this.state.loading;

    return (
      <Layout
        loading={loading}
        details={accounts}
        remove={this.remove}
        error={this.state.error}
      />
    );
  }
}

export default withPaymentDetails(
  withPaymentRemove(
    connect()(GiveNow)
  )
);

