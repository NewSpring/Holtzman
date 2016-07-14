import { Component, PropTypes } from "react"
import ReactMixin from "react-mixin"
import { Pageable } from "/imports/mixins"
import { connect } from "react-apollo";
import { VelocityComponent } from "velocity-react"
import gql from "graphql-tag";

import { Loading } from "apollos/dist/core/components"
import { Headerable } from "apollos/dist/core/mixins"

import { FeedItemSkeleton } from "apollos/dist/core/components/loading"
import { nav as navActions } from "apollos/dist/core/store"
import ApollosPullToRefresh from "apollos/dist/core/components/pullToRefresh";

import Album from "./music.Album"

import { FeedItem } from "/imports/components/cards";

const mapQueriesToProps = ({ ownProps, state }) => ({
  data: {
    query: gql`
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
            images {
              fileName
              fileType
              fileLabel
              s3
              cloudfront
            }
            tracks {
              file: s3
            }
          }
        }
      }
    `,
    variables: {
      limit: state.paging.pageSize * state.paging.page,
      skip: state.paging.skip,
    },
    forceFetch: false,
    returnPartialData: false,
  },
});

const mapStateToProps = (state) => ({ paging: state.paging });

@connect({ mapQueriesToProps, mapStateToProps })
@ReactMixin.decorate(Pageable)
@ReactMixin.decorate(Headerable)
class Template extends Component {

  componentWillMount() {
    this.props.dispatch(navActions.setLevel("TOP"));
    this.headerAction({ title: "All Music" });
  }

  handleRefresh = (resolve, reject) => {
    this.props.data.refetch()
      .then(resolve)
      .catch(reject);
  }

  renderItems = () => {

    const { content } = this.props.data;
    let loading = true;
    let items = [1, 2, 3, 4, 5];

    if (content) {
      loading = false;
      items = _.filter(content, (item) => {
        return _.any(item.content.tracks, (track) => !!track.file);
      });
    }

    return items.map((item, i) => {
      return (
        <div className="grid__item one-half@palm-wide one-third@portable one-quarter@anchored flush-bottom@handheld push-bottom@portable push-bottom@anchored" key={i}>
          {(() => {
            if (loading) return <FeedItemSkeleton />;
            return <FeedItem item={item} />;
          })()}
        </div>
      );
    });
  }


  render() {

    return (
      <VelocityComponent
        animation={"transition.fadeIn"}
        duration={1000}
        runOnMount={true}
      >
        <ApollosPullToRefresh handleRefresh={this.handleRefresh}>
          <div className="background--light-primary">
            <section className="soft-half">
              <div className="grid">
                {this.renderItems()}
              </div>
            </section>
          </div>
        </ApollosPullToRefresh>
      </VelocityComponent>
    );
  }
}


const Routes = [
  { path: "music", component: Template },
  { path: "music/:id", component: Album }
]

export default {
  Template,
  Routes
}
