import PropTypes from "prop-types";
import { Component } from "react";
import ReactMixin from "react-mixin";
import { connect } from "react-redux";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import Meta from "../../components/shared/meta";

import { FeedItemSkeleton } from "../../components/@primitives/UI/loading";
import ApollosPullToRefresh from "../../components/@enhancers/pull-to-refresh";
import NewsFeedItem from "../../components/content/feed-item-card";

import Headerable from "../../deprecated/mixins/mixins.Header";
import Pageable from "../../deprecated/mixins/mixins.Pageable";

import { nav as navActions } from "../../data/store";

import Single from "./Single";

class TemplateWithoutData extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
  };

  componentWillMount() {
    this.props.dispatch(navActions.setLevel("TOP"));
    if (this.headerAction) {
      this.headerAction({ title: "All News" });
    }
  }

  handleRefresh = (resolve, reject) => {
    this.props.data
      .refetch()
      .then(resolve)
      .catch(reject);
  };

  renderItems = () => {
    const { content } = this.props.data;
    let items = [1, 2, 3, 4, 5];
    if (content) items = content;
    return items.map((item, i) => (
      <div
        className={
          "grid__item one-half@palm-wide one-third@portable one-quarter@anchored " +
          "flush-bottom@handheld push-bottom@portable push-bottom@anchored"
        }
        key={i}
      >
        {(() => {
          if (typeof item === "number") return <FeedItemSkeleton />;
          return <NewsFeedItem item={item} />;
        })()}
      </div>
    ));
  };

  render() {
    return (
      <ApollosPullToRefresh handleRefresh={this.handleRefresh}>
        <Meta title="News" />
        <div className="background--light-secondary">
          <section className="soft-half">
            <div className="grid">{this.renderItems()}</div>
          </section>
        </div>
      </ApollosPullToRefresh>
    );
  }
}

const STORIES_QUERY = gql`
  query GetNews($limit: Int!, $skip: Int!) {
    content(channel: "news", limit: $limit, skip: $skip) {
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

const withNews = graphql(STORIES_QUERY, {
  options: state => ({
    variables: {
      limit: state.paging.pageSize * state.paging.page,
      skip: state.paging.skip,
    },
  }),
});

const mapStateToProps = state => ({ paging: state.paging });

const Template = connect(mapStateToProps)(
  withNews(ReactMixin.decorate(Pageable)(ReactMixin.decorate(Headerable)(TemplateWithoutData))),
);

const Routes = [{ path: "news", component: Template }, { path: "news/:id", component: Single }];

export default {
  Template,
  Routes,
};

export { TemplateWithoutData, STORIES_QUERY };
