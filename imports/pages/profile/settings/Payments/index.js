import { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

import { nav } from "../../../../store";

import Layout from "./Layout";

const PAYMENT_DETAILS_QUERY = gql`
  query PaymentDetails {
    accounts: savedPayments(cache: false) {
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

const withPaymentDetails = graphql(PAYMENT_DETAILS_QUERY);

@withPaymentDetails
@connect()
export default class GiveNow extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    data: PropTypes.shape({
      loading: PropTypes.bool,
      refetch: PropTypes.func,
    }),
  }

  state = { accounts: [] }

  componentWillMount() {
    this.props.dispatch(nav.setLevel("BASIC_CONTENT"));
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.data.loading && !nextProps.data.loading) {
      this.setState({ accounts: nextProps.data.accounts });
    }
  }

  componentWillUnmount() {
    this.props.dispatch(nav.setLevel("TOP"));
  }

  remove = (e) => {
    e.preventDefault();
    const { id } = e.target;

    const accounts = this.state.accounts.filter((x) => x.id !== id);

    this.setState({ accounts });
    Meteor.call("PaymentAccounts.remove", id, () => {
      // XXX mutation
      this.props.data.refetch(); // clear out data store for newly missing account
    });
  }

  render() {
    const { accounts } = this.state;
    return <Layout loading={this.props.data.loading} details={accounts} remove={this.remove} />;
  }
}
