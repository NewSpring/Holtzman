import { Component, PropTypes } from "react";
import ReactMixin from "react-mixin";
import { connect } from "react-redux";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

import { FeedItemSkeleton } from "../../components/loading";
import ApollosPullToRefresh from "../../components/pullToRefresh";
import FeedItem from "../../components/cards/cards.FeedItem";

import Headerable from "../../mixins/mixins.Header";
import infiniteScroll from "../../decorators/infiniteScroll";

import { nav as navActions } from "../../store";

import Single from "./stories.Single";

const STORIES_QUERY = gql`
  query getStories($limit: Int!, $skip: Int!) {
    content(channel: "stories", limit: $limit, skip: $skip) {
      id
      entryId: id
      title
      status
      channelName
      meta {
        urlTitle
        siteId
        date
        channelId
      }
      content {
        body
        images(sizes: ["large"]) {
          fileName
          fileType
          fileLabel
          url
        }
        ooyalaId
      }
    }
  }
`;

const withStories = graphql(STORIES_QUERY, {
  options: {
    variables: { limit: 20, skip: 0 },
  },
  props: ({ data }) => ({
    data,
    loading: data.loading,
    fetchMore: () => data.fetchMore({
      variables: { ...data.variables, skip: data.content.length },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult.data) return previousResult;
        return { content: [...previousResult.content, ...fetchMoreResult.data.content] };
      },
    }),
  }),
});

const mapStateToProps = state => ({ paging: state.paging });

@connect(mapStateToProps)
@withStories
@infiniteScroll()
@ReactMixin.decorate(Headerable)
class Template extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
  }

  componentWillMount() {
    this.props.dispatch(navActions.setLevel("TOP"));
    this.headerAction({ title: "All Stories" });
  }

  handleRefresh = (resolve, reject) => {
    this.props.data.refetch()
      .then(resolve)
      .catch(reject);
  }

  renderItems = () => {
    const { content } = this.props.data;
    let items = [1, 2, 3, 4, 5];
    if (content) items = content;
    return (
      items.map((item, i) => (
        <div
          className={
            "grid__item one-half@palm-wide one-third@portable one-quarter@anchored " +
            "flush-bottom@handheld push-bottom@portable push-bottom@anchored"
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
    return (
      <ApollosPullToRefresh handleRefresh={this.handleRefresh}>
        <div className="background--light-secondary">
          <section className="soft-half">
            <div className="grid">
              {this.renderItems()}
            </div>
          </section>
        </div>
      </ApollosPullToRefresh>
    );
  }
}

const Routes = [
  { path: "stories", component: Template },
  { path: "stories/:id", component: Single },
];

export default {
  Template,
  Routes,
};
