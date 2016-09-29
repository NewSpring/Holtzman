import { Component, PropTypes } from "react";
import ReactMixin from "react-mixin";
import { connect } from "react-redux";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

import { FeedItemSkeleton } from "../../components/loading";

import Headerable from "../../mixins/mixins.Header";

import infiniteScroll from "../../decorators/infiniteScroll";

import { nav as navActions } from "../../store";
import ApollosPullToRefresh from "../../components/pullToRefresh";

import Single from "./articles.Single";

import FeedItem from "../../components/cards/cards.FeedItem";

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
    done: (
      data.content &&
      !data.loading &&
      data.content.length < data.variables.limit + data.variables.skip
    ),
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
@withArticles
@infiniteScroll()
@ReactMixin.decorate(Headerable)
class Template extends Component {

  static propTypes = {
    dispatch: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.func,
    ]).isRequired,
    data: PropTypes.object.isRequired,
    Loading: PropTypes.func,
  }

  componentWillMount() {
    this.props.dispatch(navActions.setLevel("TOP"));
    this.headerAction({ title: "All Articles" });
  }

  handleRefresh = (resolve, reject) => {
    this.props.data.refetch({ cache: false })
      .then(resolve)
      .catch(reject);
  }

  renderItems = () => {
    const { content } = this.props.data;
    let articles = [1, 2, 3, 4, 5];
    if (content) articles = content;
    return (
      articles.map((article, i) => (
        <div
          className={
            "grid__item one-half@palm-wide one-third@portable one-quarter@anchored " +
            "flush-bottom@handheld push-bottom@portable push-bottom@anchored"
          }
          key={i}
        >
          {(() => {
            if (typeof article === "number") return <FeedItemSkeleton />;
            return <FeedItem item={article} />;
          })()}
        </div>
      ))
    );
  }

  render() {
    const { Loading } = this.props;
    return (
      <ApollosPullToRefresh handleRefresh={this.handleRefresh}>
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

const Routes = [
  { path: "articles", component: Template },
  { path: "articles/:id", component: Single },
];

export default {
  Template,
  Routes,
};
