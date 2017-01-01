/* eslint-disable import/no-named-as-default */
// @flow
import { Component } from "react";
import { connect } from "react-redux";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

import Spinner from "../../../components/@primitives/UI/loading";

import {
  nav as navActions,
  header as headerActions,
} from "../../../data/store";

import Layout from "./Layout";

const Loading = () => (
  <div className="floating" style={{ position: "fixed", top: 0, bottom: 0, width: "100%" }}>
    <div className="floating__item">
      <Spinner />;
    </div>
  </div>
);

const FINANCIAL_ACCOUNTS_QUERY = gql`
  query GetFinancialAccounts {
    accounts {
      description
      name
      id: entityId
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
`;

const withFinancialAccounts = graphql(FINANCIAL_ACCOUNTS_QUERY, { name: "accounts" });

type ITemplate = {
  dispatch: Function,
  accounts: Object,
  params: Object,
};

class TemplateWithoutData extends Component {
  props: ITemplate;

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

const Template = withFinancialAccounts(connect()(TemplateWithoutData));

const Routes = [
  { path: "campaign/:name", component: Template },
];

export default {
  Template,
  Routes,
};

export {
  TemplateWithoutData,
};
