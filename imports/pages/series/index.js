import { Component, PropTypes } from "react";
import ReactMixin from "react-mixin";
import { connect } from "react-apollo";
import gql from "graphql-tag";

import Headerable from "../../mixins/mixins.Header";
import Pageable from "../../mixins/mixins.Pageable";

import Loading, { FeedItemSkeleton } from "../../components/loading";
import ApollosPullToRefresh from "../../components/pullToRefresh";
import FeedItem from "../../components/cards/cards.FeedItem";

import { nav as navActions } from "../../store";

import Single from "./series.Single";
import SingleVideo from "./series.SingleVideo";

const mapQueriesToProps = ({ ownProps, state }) => ({
  data: {
    query: gql`
      query getSeries($limit: Int!, $skip: Int!){
        content(channel: "series_newspring", limit: $limit, skip: $skip) {
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
    this.headerAction({ title: "All Series" });
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
      items.map((item, i) => {
        return (
          <div className="grid__item one-half@palm-wide one-third@portable one-quarter@anchored flush-bottom@handheld push-bottom@portable push-bottom@anchored" key={i}>
            {(() => {
              if (typeof item === "number") return <FeedItemSkeleton />;
              return <FeedItem item={item} />;
            })()}
          </div>
        );
      })
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
};


const Routes = [
  { path: "/series", component: Template },
  { path: "/series/:id", component: Single },
  { path: "/series/:id/sermon/:sermonId", component: SingleVideo }
];

export default {
  Template,
  Routes: Routes
};
