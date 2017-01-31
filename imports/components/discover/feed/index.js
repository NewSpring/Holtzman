// @flow

import { graphql } from "react-apollo";
import { connect } from "react-redux";
import gql from "graphql-tag";

import { Loading } from "../../@primitives/UI/states";
import withPublicLikes from "../../@enhancers/likes";
import Layout from "./Layout";

const IDiscoverWithoutData = {
  discover: Object,
  publicLikes: Object,
};

const DiscoverWithoutData = ({
  discover,
  publicLikes,
}: IDiscoverWithoutData) => {
  if (discover.loading || publicLikes.loading) return <Loading />;

  const featured = discover.items.filter((x) => (x.status.toLowerCase() === "featured"));
  const open = discover.items.filter((x) => (x.status.toLowerCase() === "open"));

  const featuredItem = featured[0];
  const recommendedItems = [...featured.slice(1, featured.length)];

  return (
    <Layout
      featuredItem={featuredItem}
      recommendedItems={recommendedItems}
      textItems={open}
      publicLikes={publicLikes.recentlyLiked}
    />
  );
};

const DISCOVER_QUERY = gql`
  query GetPromotions($setName: String!) {
    items: lowReorderSets(setName: $setName) {
      title
      id
      status
      channelName
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

export default withRedux(withDiscover(withPublicLikes(DiscoverWithoutData)));

export {
  DiscoverWithoutData,
  DISCOVER_QUERY,
  withDiscover,
  withRedux,
};
