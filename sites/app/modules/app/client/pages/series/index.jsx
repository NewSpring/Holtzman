import { Component, PropTypes } from "react"
import ReactMixin from "react-mixin"
import { Pageable } from "app/client/mixins"
import { connect, gql } from "../../../../../../../apollos/core/graphql/apollo";
import { VelocityComponent } from "velocity-react"

import ReactPullToRefresh from "react-pull-to-refresh";
import { Loading } from "../../../../../../../apollos/core/components"

import { FeedItemSkeleton } from "../../../../../../../apollos/core/components/loading"
import { nav as navActions } from "../../../../../../../apollos/core/store"

import Single from "./series.Single"
import SingleVideo from "./series.SingleVideo"

import { Collections } from "app/lib/collections"
import { FeedItem } from "app/client/components/cards"

import SeriesQuery from "./queries/feed"

const mapQueriesToProps = ({ ownProps, state }) => {
  return {
    data: {
      query: gql`${SeriesQuery}`,
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
class Template extends Component {

  componentWillMount() {
    this.props.dispatch(navActions.setLevel("TOP"))
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

    let items = [1, 2, 3, 4, 5]
    if (allContent) {
      items = allContent;
    }
    return (

      items.map((item, i) => {
        return (
          <div className="grid__item one-half@palm-wide one-third@portable one-quarter@anchored flush-bottom@handheld push-bottom@portable push-bottom@anchored" key={i}>
            {() => {
              if (typeof item === "number") {
                return <FeedItemSkeleton />
              }
              return <FeedItem item={item}  />
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

            <div className="background--light-primary">

              <section className="text-center soft-half-bottom">
                <h1 className="flush">Series</h1>
              </section>
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

};


const Routes = [
  { path: "/series", component: Template },
  { path: "/series/:entryId", component: Single },
  { path: "/series/:entryId/sermon/:sermonId", component: SingleVideo }
]

export default {
  Template,
  Routes: Routes
}
