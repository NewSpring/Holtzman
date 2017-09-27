import PropTypes from 'prop-types';
import { Component } from "react";
import ReactMixin from "react-mixin";
import { connect } from "react-redux";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import Meta from "../../components/shared/meta";

import Headerable from "../../deprecated/mixins/mixins.Header";
import infiniteScroll from "../../components/@enhancers/infinite-scroll";

import { FeedItemSkeleton } from "../../components/@primitives/UI/loading";
import ApollosPullToRefresh from "../../components/@enhancers/pull-to-refresh";
import StudiesFeedItem from "../../components/content/feed-item-card";

import { nav as navActions } from "../../data/store";

import Single from "./Single";
import SingleStudyEntry from "./entry";

class TemplateWithoutData extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    Loading: PropTypes.func,
  };

  componentWillMount() {
    this.props.dispatch(navActions.setLevel("TOP"));
    if (this.headerAction) {
      this.headerAction({ title: "All Studies" });
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
          "grid__item one-half@palm-wide one-third@portable " +
          "one-quarter@anchored flush-bottom@handheld push-bottom@portable push-bottom@anchored"
        }
        key={i}
      >
        {(() => {
          if (typeof item === "number") return <FeedItemSkeleton />;
          return <StudiesFeedItem item={item} />;
        })()}
      </div>
    ));
  };

  render() {
    const { Loading } = this.props;
    return (
      <ApollosPullToRefresh handleRefresh={this.handleRefresh}>
        <Meta title="Studies" />
        <div className="background--light-secondary">
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

const SERIES_QUERY = gql`
  query getSeries($limit: Int!, $skip: Int!) {
    content(channel: "studies", limit: $limit, skip: $skip) {
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
  }
`;

const withSeries = graphql(SERIES_QUERY, {
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
          if (!fetchMoreResult.data) return previousResult;
          return { content: [...previousResult.content, ...fetchMoreResult.data.content] };
        },
      }),
  }),
});

const mapStateToProps = state => ({ paging: state.paging });

const Template = connect(mapStateToProps)(
  withSeries(
    infiniteScroll(x => x, { doneText: "End of Studies" })(
      ReactMixin.decorate(Headerable)(TemplateWithoutData),
    ),
  ),
);

const Routes = [
  { path: "/studies", component: Template },
  { path: "/devotions", component: Template },
  { path: "/devotionals", component: Template },
  { path: "/studies/:id", component: Single },
  { path: "/studies/:id/entry/:studyEntryId", component: SingleStudyEntry },
];

export default {
  Template,
  Routes,
};

export { TemplateWithoutData, SERIES_QUERY };
