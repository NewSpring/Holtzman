import { Component } from "react"
import ReactMixin from "react-mixin"
import { Pageable } from "app/client/mixins"
import { VelocityComponent } from "velocity-react"

import ReactPullToRefresh from "react-pull-to-refresh";
import { Loading } from "apollos/core/components"

import Split, { Left, Right } from "apollos/core/blocks/split"
import { nav as navActions } from "apollos/core/store"
import { connect, gql } from "apollos/core/graphql/apollo";

import Helpers from "app/client/helpers";

import { FeedItemSkeleton } from "apollos/core/components/loading"
import HomeHero from "./home.Hero"
import { FeedItem } from "app/client/components/cards"

import { Link } from "react-router";

import FeedQuery from "./queries/feed"

const mapQueriesToProps = ({ ownProps, state }) => {
  return {
    data: {
      query: gql`${FeedQuery}`,
      variables: {
        excludeChannels: state.topics.topics,
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
export default class Home extends Component {

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

  renderFeed = () => {

    const { feed } = this.props.data;

    let feedItems = [1, 2, 3, 4, 5]
    if (feed) {
      feedItems = feed.slice(1);
    }
    return (

      feedItems.map((item, i) => {
        return (
          <div className="grid__item one-half@lap-wide-and-up flush-bottom@handheld push-bottom@portable push-bottom@anchored" key={i}>
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

    const { feed } = this.props.data;

    let photo, heroItem, heroLink;
    if (feed) {
      heroItem = feed[0];
      heroLink = Helpers.content.links(heroItem);
      photo = Helpers.backgrounds.image(heroItem)
    }

    return (
      <VelocityComponent
          animation={"transition.fadeIn"}
          duration={1000}
          runOnMount={true}
        >
        <Split nav={true} classes={["background--light-primary"]}>

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

            <Right
              mobile={true}
              background={photo ? photo : "//dg0ddngxdz549.cloudfront.net/images/cached/images/remote/http_s3.amazonaws.com/ns.images/newspring/fpo/fpo.Music2_1700_850_90_c1.jpg"}
              classes={["floating--bottom", "overlay--gradient", "text-left"]}
              ratioClasses={["floating__item", "overlay__item", "one-whole", "soft@lap-and-up", "floating--bottom", "text-left"]}
              aspect="square"
              link={heroLink}
            >

              <HomeHero item={heroItem ? heroItem : {}} />

            </Right>

            <Left scroll={true} ref="container">
              <section className="background--light-secondary soft-half@handheld soft@portable soft-double@anchored">
                <div className="grid">
                  {this.renderFeed()}
                </div>
              </section>
            </Left>

          </ReactPullToRefresh>

        </Split>
      </VelocityComponent>

    )
  }

}
