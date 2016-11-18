import { Component, PropTypes } from "react";
import ReactMixin from "react-mixin";
import { connect } from "react-redux";
import { graphql } from "react-apollo";
import { createFragment } from "apollo-client";
import gql from "graphql-tag";

import Split, { Left, Right } from "../../blocks/split";

import ApollosPullToRefresh from "../../components/pullToRefresh";
import { FeedItemSkeleton } from "../../components/loading";
import FeedItem from "../../components/cards/cards.FeedItem";

import { nav as navActions } from "../../store";
import Headerable from "../../mixins/mixins.Header";

import infiniteScroll from "../../decorators/infiniteScroll";

import backgrounds from "../../util/backgrounds";
import content from "../../util/content";

import HomeHero from "./home.Hero";

class HomeWithoutData extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
  }

  componentWillMount() {
    this.props.dispatch(navActions.setLevel("TOP"));
    if (this.headerAction) {
      this.headerAction({ title: "default" });
    }
  }

  handleRefresh = (resolve, reject) => {
    this.props.data.refetch({ cache: false })
      .then(resolve)
      .catch(reject);
  }

  renderFeed = () => {
    const { feed } = this.props.data;

    let feedItems = [1, 2, 3, 4, 5];
    if (feed) {
      feedItems = feed.slice(1);
    }
    return (
      feedItems.map((item, i) => (
        <div
          className={
            "grid__item one-half@palm-wide-and-up flush-bottom@palm " +
            "push-half-bottom@palm-wide push-bottom@portable push-bottom@anchored"
          }
          key={i}
        >
          {(() => {
            if (typeof item === "number") return <FeedItemSkeleton />;
            return <FeedItem item={item} />;
          })()}
        </div>
      ))

    );
  }

  render() {
    const { data: { feed } } = this.props;

    let photo;
    let heroItem;
    let heroLink;
    if (feed) {
      heroItem = feed[0];
      heroLink = content.links(heroItem);
      if (heroItem.channelName === "sermons") {
        photo = backgrounds.image(heroItem.parent);
      } else {
        photo = backgrounds.image(heroItem);
      }
    }
    return (
      <ApollosPullToRefresh handleRefresh={this.handleRefresh}>
        <Split nav classes={["background--light-primary"]}>
          <Right
            mobile
            background={photo}
            classes={["floating--bottom", "text-left", "background--dark-primary"]}
            ratioClasses={[
              "floating__item",
              "overlay__item",
              "one-whole",
              "soft@lap-and-up",
              "floating--bottom",
              "text-left",
            ]}
            aspect="square"
            link={heroLink}
          >

            <HomeHero item={heroItem || {}} />

          </Right>
        </Split>
        <Left scroll>
          <section
            className={
              "background--light-secondary soft-half@palm " +
              "soft@palm-wide-and-up soft-double@anchored"
            }
          >
            <div className="grid">
              {this.renderFeed()}
            </div>
          </section>
        </Left>
      </ApollosPullToRefresh>
    );
  }

}

const CONTENT_FEED_QUERY = gql`
  query getFeed($excludeChannels: [String]!, $limit: Int!, $skip: Int!, $cache: Boolean!) {
    feed(excludeChannels: $excludeChannels, limit: $limit, skip: $skip, cache: $cache) {
      ...ContentForFeed
      parent {
        ...ContentForFeed
      }
    }
  }
`;

const contentFragment = createFragment(gql`
  fragment ContentForFeed on Content {
    entryId: id
    title
    channelName
    status
    meta {
      siteId
      date
      channelId
    }
    content {
      images(sizes: ["large"]) {
        fileName
        fileType
        fileLabel
        url
      }
      isLight
      colors {
        id
        value
        description
      }
    }
  }
`);

const withFeedContent = graphql(CONTENT_FEED_QUERY, {
  options: (ownProps) => ({
    fragments: [contentFragment],
    variables: {
      excludeChannels: ownProps.topics,
      limit: 20,
      skip: 0,
      cache: true,
    },
  }),
  props: ({ data }) => ({
    data,
    loading: data.loading,
    fetchMore: () => data.fetchMore({
      variables: { ...data.variables, skip: data.feed.length },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult.data) { return previousResult; }
        return { feed: [...previousResult.feed, ...fetchMoreResult.data.feed] };
      },
    }),
  }),
});

export default connect((state) => ({ topics: state.topics.topics }))(
  withFeedContent(
    infiniteScroll()(
      ReactMixin.decorate(Headerable)(
        HomeWithoutData
      )
    )
  )
);

export {
  HomeWithoutData,
};
