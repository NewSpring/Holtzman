import { Component, PropTypes } from "react";
import { graphql } from "react-apollo";
import { connect } from "react-redux";
import gql from "graphql-tag";

import createContainer from "../../../blocks/meteor/react-meteor-data";
import { header as headerActions } from "../../../store";

import Layout from "./Layout";

const ACCOUNTS_QUERY = gql`
  query GetFinancialAccounts {
    accounts {
      description
      name
      id: entityId
      summary
      image
      order
      images { fileName, fileType, fileLabel, s3, cloudfront }
    }
  }
`;

const withAccounts = graphql(ACCOUNTS_QUERY, { name: "accounts" });

@connect()
@withAccounts
class Page extends Component {

  static propTypes = {
    dispatch: PropTypes.func,
  }

  componentDidMount() {
    if (process.env.NATIVE) {
      const item = { title: "Give Now" };
      this.props.dispatch(headerActions.set(item));
    }
  }

  render() {
    return <Layout {...this.props} />;
  }
}

// Bind reactive data to component
const TemplateWithData = createContainer(() => {
  let alive = true;
  try { alive = serverWatch.isAlive("ROCK"); } catch (e) { /* do nothing */ }
  return { alive };
},
  <Page />
);


const Routes = [
  { path: "now", component: TemplateWithData },
];

export default {
  TemplateWithData,
  Routes,
};
