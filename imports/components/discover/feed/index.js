// @flow

import { graphql } from "react-apollo";
import { connect } from "react-redux";
import gql from "graphql-tag";

import withRecentLikes from "../../@enhancers/likes/recents";
import Layout from "./Layout";

type IDiscoverWithoutData = {
  discover: Object,
  recentLikes: Object,
};

const DiscoverWithoutData = ({
  discover,
  recentLikes,
}: IDiscoverWithoutData) => {
  const featured = discover.items && discover.items
    .filter(x => (x.status.toLowerCase() === "featured"));

  const open = discover.items && discover.items
    .filter(x => (x.status.toLowerCase() === "open"));

  return (
    <Layout
      featuredItems={featured}
      textItems={open}
      recentLikes={recentLikes.recentlyLiked}
      recentLikedLoading={recentLikes.loading}
    />
  );
};

const DISCOVER_QUERY = gql`
  query GetPromotions($setName: String!) {
    items: lowReorderSets(setName: $setName) {
      entryId: id
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

export default withRedux(withDiscover(withRecentLikes(DiscoverWithoutData)));

export {
  DiscoverWithoutData,
  DISCOVER_QUERY,
  withDiscover,
  withRedux,
};
