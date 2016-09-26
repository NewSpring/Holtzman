import { Component, PropTypes } from "react";
import ReactMixin from "react-mixin";
import { connect } from "react-apollo";
import gql from "graphql-tag";

import Loading, { FeedItemSkeleton } from "../../components/loading";

import Headerable from "../../mixins/mixins.Header";
import Pageable from "../../mixins/mixins.Pageable";


import { nav as navActions } from "../../store";
import ApollosPullToRefresh from "../../components/pullToRefresh";

import Single from "./articles.Single";

import FeedItem from "../../components/cards/cards.FeedItem";

const mapQueriesToProps = ({ ownProps, state }) => ({
  data: {
    query: gql`
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
    `,
    variables: {
      limit: state.paging.pageSize * state.paging.page,
      skip: state.paging.skip,
    },
    forceFetch: false,
    returnPartialData: false,
  },
});

const mapStateToProps = state => ({ paging: state.paging });

@connect({ mapQueriesToProps, mapStateToProps })
@ReactMixin.decorate(Pageable)
@ReactMixin.decorate(Headerable)
class Template extends Component {

  componentWillMount() {
    this.props.dispatch(navActions.setLevel("TOP"));
    this.headerAction({ title: "All Articles" });
  }

  handleRefresh = (resolve, reject) => {
    this.props.data.refetch()
      .then(resolve)
      .catch(reject);
  }

  renderItems = () => {
    const { content } = this.props.data;
    let articles = [1, 2, 3, 4, 5];
    if (content) articles = content;
    return (
      articles.map((article, i) => {
        return (
          <div className="grid__item one-half@palm-wide one-third@portable one-quarter@anchored flush-bottom@handheld push-bottom@portable push-bottom@anchored" key={i}>
            {(() => {
              if (typeof article === "number") return <FeedItemSkeleton />;
              return <FeedItem item={article} />;
            })()}
          </div>
        );
      })
    );
  }

  render() {
    return (
      <ApollosPullToRefresh handleRefresh={this.handleRefresh}>
        <div className="soft@portable soft-double@lap-and-up background--light-secondary">
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
  { path: "articles", component: Template },
  { path: "articles/:id", component: Single },
];

export default {
  Template,
  Routes,
};
