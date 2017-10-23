import PropTypes from "prop-types";
import { Component } from "react";
import ReactMixin from "react-mixin";
import { connect } from "react-redux";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import Meta from "../../components/shared/meta";

import { FeedItemSkeleton } from "../../components/@primitives/UI/loading";

import Headerable from "../../deprecated/mixins/mixins.Header";

import infiniteScroll from "../../components/@enhancers/infinite-scroll";

import { nav as navActions } from "../../data/store";
import ApollosPullToRefresh from "../../components/@enhancers/pull-to-refresh";

import Single from "./Single";

import ArticleFeedItem from "../../components/content/feed-item-card";

class ArticlesWithoutData extends Component {
  static propTypes = {
    dispatch: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
    data: PropTypes.object.isRequired,
    Loading: PropTypes.func,
  };

  componentWillMount() {
    this.props.dispatch(navActions.setLevel("TOP"));
    if (this.headerAction) {
      this.headerAction({ title: "All Articles" });
    }
  }

  handleRefresh = (resolve, reject) => {
    this.props.data
      .refetch({ cache: false })
      .then(resolve)
      .catch(reject);
  };

  renderItems = () => {
    const { content } = this.props.data;
    let articles = [1, 2, 3, 4, 5];
    if (content) articles = content;
    return articles.map((article, i) => (
      <div
        className={
          "grid__item one-half@palm-wide one-third@portable one-quarter@anchored " +
          "flush-bottom@handheld push-bottom@portable push-bottom@anchored"
        }
        key={i}
      >
        {(() => {
          if (typeof article === "number") return <FeedItemSkeleton />;
          return <ArticleFeedItem item={article} />;
        })()}
      </div>
    ));
  };

  render() {
    const { Loading } = this.props;
    return (
      <ApollosPullToRefresh handleRefresh={this.handleRefresh}>
        <Meta title="Articles" />
        <div className="soft@portable soft-double@lap-and-up background--light-secondary">
          <section className="soft-half">
            <div className="grid">
              {this.renderItems()}
              <div className="grid__item one-whole">
                <Loading />
              </div>
            </div>
          </section>
        </div>
      </ApollosPullToRefresh>
    );
  }
}

const ARTICLES_QUERY = gql`
  query getArticles($limit: Int!, $skip: Int!) {
    content(channel: "articles", limit: $limit, skip: $skip) {
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
        scripture {
          book
          passage
        }
        images(sizes: ["large"]) {
          fileName
          fileType
          fileLabel
          url
        }
      }
    }
  }
`;

const withArticles = graphql(ARTICLES_QUERY, {
  options: {
    variables: { limit: 20, skip: 0 },
  },
  props: ({ data }) => ({
    data,
    loading: data.loading,
    done:
      data.content &&
      !data.loading &&
      data.content.length < data.variables.limit + data.variables.skip,
    fetchMore: () =>
      data.fetchMore({
        variables: { ...data.variables, skip: data.content.length },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult.content) return previousResult;
          return { content: [...previousResult.content, ...fetchMoreResult.content] };
        },
      }),
  }),
});

const mapStateToProps = state => ({ paging: state.paging });

const Template = connect(mapStateToProps)(
  withArticles(
    infiniteScroll(x => x, { doneText: "End of Articles" })(
      ReactMixin.decorate(Headerable)(ArticlesWithoutData),
    ),
  ),
);

const Routes = [
  { path: "articles", component: Template },
  { path: "articles/:id", component: Single },
];

export default {
  Template,
  Routes,
};

export { ArticlesWithoutData };
