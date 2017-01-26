import { Component, PropTypes } from "react";
import { graphql } from "react-apollo";
import { connect } from "react-redux";
import gql from "graphql-tag";

import withPublicLikes from "../../@enhancers/likes";
import Layout from "./Layout";

class DiscoverWithoutData extends Component {

  static propTypes = {
    discover: PropTypes.object.isRequired,
    // publicLikes: PropTypes.object.isRequired,
  }

  render() {
    const { discover } = this.props;
    if (discover.loading) return null; // XXX <Loading />

    const featured = discover.items.filter((x) => (x.status.toLowerCase() === "featured"));
    const open = discover.items.filter((x) => (x.status.toLowerCase() === "open"));

    const featuredItem = featured[0];
    const recommendedItems = [...featured.slice(1, featured.length)];

    const publicLikes = [
      {
        "id": "7bccc3c6a493b6dfd957e47cd076ef81",
        "title": "I Am the Light of the World",
        "channelName": "sermons",
        "content": {
          "images": [],
          "__typename": "ContentData"
        },
        "__typename": "Content"
      }, {
        "id": "a5f55773964fa8500bdce05a3588517d",
        "title": "Who is the Holy Spirit and What Does He Do?",
        "channelName": "articles",
        "content": {
          "images": [{
            "id": "fc8cdf14c0d7656bd476d7e7dd073ff4",
            "url": "//drhztd8q3iayu.cloudfront.net/newspring/editorial/articles/newspring.blog.hero.girllookingatwater.medium.jpg",
            "__typename": "File"
          }],
          "__typename": "ContentData"
        },
        "__typename": "Content"
      }, {
        "id": "6c9a14f333227ae3f848ca3a6b88513f",
        "title": "I Am the Light of the World",
        "channelName": "articles",
        "content": {
          "images": [{
            "id": "5096385d82efa051ae2ee8b39c62970b",
            "url": "//drhztd8q3iayu.cloudfront.net/newspring/editorial/articles/Tweet_recap.medium.jpg",
            "__typename": "File"
          }],
          "__typename": "ContentData"
        },
        "__typename": "Content"
      }, {
        "id": "3b6db2566d467ac6924c45304449670e",
        "title": "A little hope for 'bad' Christians trying to be good examples",
        "channelName": "articles",
        "content": {
          "images": [{
            "id": "c806c79fe009631b1957e8e85251221e",
            "url": "//drhztd8q3iayu.cloudfront.net/newspring/editorial/newspring.blog.hero.dudeondock.medium.jpg",
            "__typename": "File"
          }],
          "__typename": "ContentData"
        },
        "__typename": "Content"
      }, {
        "id": "961cd2bc81285ef7057826c64868bde0",
        "title": "I was insecure about my \"manliness\"",
        "channelName": "stories",
        "content": {
          "images": [{
            "id": "ac4081742158cada040bdc515d0d3dc5",
            "url": "//drhztd8q3iayu.cloudfront.net/newspring/collection/stories/SamWalker_landscape_1_1.medium.jpg",
            "__typename": "File"
          }, {
            "id": "aa80bf6fee48030db24b9dd00854631d",
            "url": "//drhztd8q3iayu.cloudfront.net/newspring/collection/stories/SamWalker_landscape_2_1.medium.jpg",
            "__typename": "File"
          }],
          "__typename": "ContentData"
        },
        "__typename": "Content"
      }, {
        "id": "4dd601fc655eaf5bb9aa4a69f7ed0dda",
        "title": "Am I hooked? Four questions to ask about pain medicine",
        "channelName": "articles",
        "content": {
          "images": [{
            "id": "cf59436d5c8e2028cd4e011951a28aad",
            "url": "//drhztd8q3iayu.cloudfront.net/newspring/editorial/newspring.blog.hero.medications.medium.jpg",
            "__typename": "File"
          }],
          "__typename": "ContentData"
        },
        "__typename": "Content"
      }, {
        "id": "5529094729aaa74a0e686ae91169eb4e",
        "title": "Nothing Can Separate Us",
        "channelName": "devotionals",
        "content": {
          "images": [],
          "__typename": "ContentData"
        },
        "__typename": "Content"
      }
    ];

    return (
      <Layout
        featuredItem={featuredItem}
        recommendedItems={recommendedItems}
        textItems={open}
        publicLikes={publicLikes}
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

export default withRedux(withDiscover(DiscoverWithoutData));
// export default withRedux(withDiscover(withPublicLikes(DiscoverWithoutData)));

export {
  DiscoverWithoutData,
  DISCOVER_QUERY,
  withDiscover,
  withRedux,
};
