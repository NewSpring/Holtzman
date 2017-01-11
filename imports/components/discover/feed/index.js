import { Component, PropTypes } from "react";
import { graphql } from "react-apollo";
import { connect } from "react-redux";
import gql from "graphql-tag";

import Layout from "./Layout";

class DiscoverWithoutData extends Component {

  static propTypes = {
    discover: PropTypes.object.isRequired,
  }

  render() {
    const { discover } = this.props;
    if (discover.loading) return null; // XXX <Loading />

    const featured = discover.items.filter((x) => (x.status.toLowerCase() === "featured"));
    const open = discover.items.filter((x) => (x.status.toLowerCase() === "open"));

    const featuredItem = featured[0];
    const recommendedItems = [...featured.slice(1, featured.length)];

    return (
      <Layout
        featuredItem={featuredItem}
        recommendedItems={recommendedItems}
        textItems={open}
      />
    );
  }

}

const DISCOVER_QUERY = gql`
  query GetPromotions($setName: String!) {
    items: lowReorderSets(setName: $setName) {
      title
      id
      status
      meta {
        urlTitle
        date
      }
      content {
        images(sizes: ["large"]) {
          fileName
          fileLabel
          url
        }
      }
    }
  }
`;

const withDiscover = graphql(DISCOVER_QUERY, {
  name: "discover",
  options: () => ({
    variables: {
      // XXX if we want app specfic promos
      // setName: proccess.env.WEB ? "promotions_newspring" : "promotions_newspring_app"
      setName: "promotions_newspring",
    },
  }),
});

const withRedux = connect();

export default withRedux(withDiscover(DiscoverWithoutData));

export {
  DiscoverWithoutData,
  DISCOVER_QUERY,
  withDiscover,
  withRedux,
};
