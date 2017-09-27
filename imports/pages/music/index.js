import PropTypes from 'prop-types';
import { Component } from "react";
import ReactMixin from "react-mixin";
import { connect } from "react-redux";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import Meta from "../../components/shared/meta";

import ApollosPullToRefresh from "../../components/@enhancers/pull-to-refresh";
import { FeedItemSkeleton } from "../../components/@primitives/UI/loading";
import MusicFeedItem from "../../components/content/feed-item-card";

import Headerable from "../../deprecated/mixins/mixins.Header";
import infiniteScroll from "../../components/@enhancers/infinite-scroll";

import { nav as navActions } from "../../data/store";

import Album from "./Album";

class TemplateWithoutData extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    Loading: PropTypes.func,
  };

  componentWillMount() {
    this.props.dispatch(navActions.setLevel("TOP"));
    if (this.headerActions) {
      this.headerAction({ title: "All Music" });
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
    let loading = true;
    let items = [1, 2, 3, 4, 5];

    if (content) {
      loading = false;
      items = _.filter(content, item => _.any(item.content.tracks, track => !!track.file));
    }

    return items.map((item, i) => (
      <div
        className={
          "grid__item one-half@palm-wide one-third@portable one-quarter@anchored " +
          "flush-bottom@handheld push-bottom@portable push-bottom@anchored"
        }
        key={i}
      >
        {(() => {
          if (loading) return <FeedItemSkeleton />;
          return <MusicFeedItem item={item} />;
        })()}
      </div>
    ));
  };

  render() {
    const { Loading } = this.props;
    return (
      <ApollosPullToRefresh handleRefresh={this.handleRefresh}>
        <Meta title="Music" />
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

const ALBUMS_QUERY = gql`
  query getAlbums($limit: Int!, $skip: Int!) {
    content(channel: "newspring_albums", limit: $limit, skip: $skip) {
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
        tracks {
          file: s3
        }
      }
    }
  }
`;

const withAlbums = graphql(ALBUMS_QUERY, {
  options: { variables: { limit: 20, skip: 0 } },
  props: ({ data }) => ({
    data,
    loading: data.loading,
    done:
      data.content &&
      // XXX Pagination is currently broken
      data.loading &&
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
  withAlbums(
    infiniteScroll(x => x, { doneText: "End of Albums" })(
      ReactMixin.decorate(Headerable)(TemplateWithoutData),
    ),
  ),
);

const Routes = [{ path: "music", component: Template }, { path: "music/:id", component: Album }];

export default {
  Template,
  Routes,
};

export { TemplateWithoutData, ALBUMS_QUERY };
