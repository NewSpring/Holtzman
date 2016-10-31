
import { Meteor } from "meteor/meteor";
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

export class GiveNow extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    data: PropTypes.shape({
      loading: PropTypes.bool,
      refetch: PropTypes.func,
      accounts: PropTypes.array,
    }),
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
    Meteor.call("PaymentAccounts.remove", id, (err) => {
      if (err) {
        this.setState({ error: err.message, loading: null, accounts: null });
        setTimeout(() => {
          this.setState({ error: null, loading: null, accounts: null });
        }, 500);
        return;
      }

      // XXX mutation
      this.props.data.refetch()
        .then(() => {
          this.setState({ loading: null, accounts: null, error: null });
        });
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

export default withPaymentDetails(connect()(GiveNow));

