import { Component, PropTypes } from "react"
import ReactMixin from "react-mixin"
import { Pageable } from "/imports/mixins"
import { connect } from "react-apollo";
import { VelocityComponent } from "velocity-react"
import gql from "apollo-client/gql";

import ReactPullToRefresh from "react-pull-to-refresh";
import { Loading } from "apollos/dist/core/components"

import { FeedItemSkeleton } from "apollos/dist/core/components/loading"
import { Headerable } from "apollos/dist/core/mixins"
import { nav as navActions } from "apollos/dist/core/store"

import Single from "./articles.Single"

import { FeedItem } from "/imports/components/cards"

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
            images {
              fileName
              fileType
              fileLabel
              s3
              cloudfront
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
    this.headerAction({ title: "All Articles" });
  }

  handleRefresh = (resolve, reject) => {
    this.props.data.refetch()
      .then(resolve)
      .catch(reject);
  }

  renderItems = () => {
    const { content } = this.props.data;
    let articles = [1, 2, 3, 4, 5]
    if (content) articles = content;
    return (
      articles.map((article, i) => {
        return (
          <div className="grid__item one-half@palm-wide one-third@portable one-quarter@anchored flush-bottom@handheld push-bottom@portable push-bottom@anchored" key={i}>
            {(() => {
              if (typeof article === "number") return <FeedItemSkeleton />
              return <FeedItem item={article}  />
            })()}
          </div>
        )
      })
    )
  }

  render() {

    return (
      <VelocityComponent
        animation={"transition.fadeIn"}
        duration={1000}
        runOnMount={true}
      >
        <div>
          <div className="ptr-fake-background"></div>

          <ReactPullToRefresh
            onRefresh={this.handleRefresh}
            icon={<i className="icon-leaf-outline"></i>}
            loading={<i className="loading icon-leaf-outline"></i>}
          >

            <div className="soft@portable soft-double@lap-and-up background--light-primary">
              <section className="soft-half">
                <div className="grid">
                  {this.renderItems()}
                </div>
              </section>
            </div>

          </ReactPullToRefresh>
        </div>
      </VelocityComponent>
    );

  }

}

const Routes = [
  { path: "articles", component: Template },
  { path: "articles/:id", component: Single }
]

export default {
  Template,
  Routes
}
