import PropTypes from 'prop-types';
import { Component } from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { serverWatch } from "meteor/bjwiley2:server-watch";

import createContainer from "../../../deprecated/meteor/react-meteor-data";

import Layout from "./Layout";

class PageWithoutData extends Component {

  static propTypes = {
    setRightProps: PropTypes.func,
  }

  componentWillMount() {
    this.props.setRightProps({
      background: "//s3.amazonaws.com/ns.assets/apollos/42835.marketing.cen.webad.scheduleyourgiving_1x2.jpg",
      link: "/give/schedules",
    });
  }

  componentWillUnmount() {
    this.props.setRightProps({
      background: "",
      link: null,
    });
  }

  render() {
    return <Layout {...this.props} />;
  }
}

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

const Page = withAccounts(PageWithoutData);

const IsAlive = () => {
  let alive = true;
  try { alive = serverWatch.isAlive("ROCK"); } catch (e) { /* do nothing */ }
  return { alive };
};

// Bind reactive data to component
const TemplateWithData = createContainer(IsAlive,
  (props => <Page {...props} />)
);

const Routes = [
  { path: "now", component: TemplateWithData },
];

export default {
  TemplateWithData,
  Routes,
};

export {
  PageWithoutData,
  IsAlive,
};
