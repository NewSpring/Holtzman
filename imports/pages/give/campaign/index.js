/* eslint-disable import/no-named-as-default */
import { Component, PropTypes } from "react";
import { connect } from "react-apollo";
import gql from "graphql-tag";

import Spinner from "../../../components/loading";

import {
  nav as navActions,
  header as headerActions,
} from "../../../store";

import Layout from "./Layout";

const Loading = () => (
  <div className="floating" style={{ position: "fixed", top: 0, bottom: 0, width: "100%" }}>
    <div className="floating__item">
      <Spinner />;
    </div>
  </div>
);

const mapQueriesToProps = () => ({
  accounts: {
    query: gql`
      query GetFinancialAccounts {
        accounts {
          description
          name
          id
          summary
          image
          order
          images {
            fileName
            fileType
            fileLabel
            s3
            cloudfront
          }
        }
      }
    `,
  },
});

@connect({ mapQueriesToProps })
class Template extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    accounts: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
  }

  componentWillMount() {
    this.props.dispatch(navActions.setLevel("BASIC_CONTENT"));
  }

  componentDidMount() {
    if (process.env.NATIVE) {
      const item = { title: decodeURI(this.props.params.name) };
      this.props.dispatch(headerActions.set(item));
    }
  }

  componentWillUnmount() {
    this.props.dispatch(navActions.setLevel("TOP"));
  }

  getAccount() {
    const { accounts, params } = this.props;
    if (!accounts.accounts || !params.name) return false;
    for (const account of accounts.accounts) {
      if (account.name === decodeURI(params.name)) return account;
    }

    return false;
  }

  render() {
    const { accounts } = this.props;
    if (accounts.loading) return <Loading />;

    const account = this.getAccount();
    if (!account) return <Loading />;

    return <Layout account={account} />;
  }
}


const Routes = [
  { path: "campaign/:name", component: Template },
];

export default {
  Template,
  Routes,
};
