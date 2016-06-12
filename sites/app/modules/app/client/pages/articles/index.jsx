import { Component, PropTypes } from "react"
import ReactMixin from "react-mixin"
import { Pageable } from "app/client/mixins"
import { connect, gql } from "apollos/core/graphql/apollo";
import { VelocityComponent } from "velocity-react"

import ReactPullToRefresh from "react-pull-to-refresh";
import { Loading } from "apollos/core/components"

import { FeedItemSkeleton } from "apollos/core/components/loading"
import { Headerable } from "apollos/core/mixins"
import { nav as navActions } from "apollos/core/store"

import Single from "./articles.Single"

import { Editorials } from "app/lib/collections";
import { FeedItem } from "app/client/components/cards"

import ArticlesQuery from "./queries/feed"

const mapQueriesToProps = ({ ownProps, state }) => {
  return {
    data: {
      query: gql`${ArticlesQuery}`,
      variables: {
        limit: state.paging.pageSize * state.paging.page,
        skip: state.paging.skip,
      },
      forceFetch: false,
      returnPartialData: false,
    },
  };
};

const mapStateToProps = (state) => {
  return {
    paging: state.paging,
  };
};

@connect({
  mapQueriesToProps,
  mapStateToProps,
})
@ReactMixin.decorate(Pageable)
@ReactMixin.decorate(Headerable)
class Template extends Component {

  componentWillMount() {
    this.props.dispatch(navActions.setLevel("TOP"));

    this.headerAction({
      title: "All Articles"
    });
  }

  handleRefresh = (resolve, reject) => {
    this.props.data.refetch()
      .then((result) => {
        resolve();
      }).catch((error) => {
        console.error(error);
        reject();
      });
  }

  renderItems = () => {

    const { allContent } = this.props.data;

    let articles = [1, 2, 3, 4, 5]
    if (allContent) {
      articles = allContent;
    }
    return (

      articles.map((article, i) => {
        return (
          <div className="grid__item one-half@palm-wide one-third@portable one-quarter@anchored flush-bottom@handheld push-bottom@portable push-bottom@anchored" key={i}>
            {() => {
              if (typeof article === "number") {
                return <FeedItemSkeleton />
              }
              return <FeedItem item={article}  />
            }()}
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
            icon={
              <i className="icon-leaf-outline"></i>
            }
            loading={
              <i className="loading icon-leaf-outline"></i>
            }
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
  { path: "articles/:entryId", component: Single }
]

export default {
  Template,
  Routes
}
