import { Component, PropTypes } from "react";
import { graphql } from "react-apollo";
import { connect } from "react-redux";
import gql from "graphql-tag";
import { serverWatch } from "meteor/bjwiley2:server-watch";

import createContainer from "../../../blocks/meteor/react-meteor-data";
import { header as headerActions } from "../../../store";

import Layout from "./Layout";

class PageWithoutData extends Component {

  static propTypes = {
    dispatch: PropTypes.func,
    setRightProps: PropTypes.func,
  }

  componentWillMount() {
    this.props.setRightProps({
      background: "//s3.amazonaws.com/ns.assets/apollos/42835.marketing.cen.webad.scheduleyourgiving_1x2.jpg",
      link: "/give/schedules",
    });
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

const Page = connect()(
  withAccounts(
    PageWithoutData
  )
);

const IsAlive = () => {
  let alive = true;
  try { alive = serverWatch.isAlive("ROCK"); } catch (e) { /* do nothing */ }
  return { alive };
};

// Bind reactive data to component
const TemplateWithData = createContainer(IsAlive,
  ((props) => <Page {...props} />)
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
