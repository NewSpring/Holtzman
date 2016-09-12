import { Component, PropTypes } from "react";
import ReactMixin from "react-mixin";
import { connect } from "react-apollo";
import gql from "graphql-tag";

import Loading, { FeedItemSkeleton } from "../../components/loading";
import ApollosPullToRefresh from "../../components/pullToRefresh";
import FeedItem from "../../components/cards/cards.FeedItem";

import Headerable from "../../mixins/mixins.Header";
import Pageable from "../../mixins/mixins.Pageable";

import { nav as navActions } from "../../store";

import Single from "./devotions.Single";

const mapQueriesToProps = ({ ownProps, state }) => ({
  data: {
    query: gql`
      query getDevotionals($limit: Int!, $skip: Int!) {
        content(channel: "devotionals", limit: $limit, skip: $skip) {
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
class Devotions extends Component {

  componentWillMount() {
    this.props.dispatch(navActions.setLevel("TOP"));
    this.headerAction({ title: "All Devotionals" });
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
              return <FeedItem item={item}  />;
            })()}
          </div>
        );
      })
    );
  }


  render() {
    return (
      <ApollosPullToRefresh handleRefresh={this.handleRefresh}>
        <div className="background--light-primary">
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
  { path: "devotions", component: Devotions },
  { path: "devotions/:id", component: Single }
];

export default {
  Devotions,
  Routes
};
