import { Component } from "react"
import ReactMixin from "react-mixin"
import { VelocityComponent } from "velocity-react"
import { connect } from "react-apollo";
import gql from "apollo-client/gql";
import { Link } from "react-router";
import ReactPullToRefresh from "react-pull-to-refresh";

import { Loading } from "apollos/dist/core/components"
import { FeedItemSkeleton } from "apollos/dist/core/components/loading"
import Split, { Left, Right } from "apollos/dist/core/blocks/split"
import { nav as navActions } from "apollos/dist/core/store"
// import { Headerable } from "apollos/dist/core/mixins"

import Helpers from "/imports/helpers";
// import { Pageable } from "/imports/mixins"
import { FeedItem } from "/imports/components/cards"

import HomeHero from "./home.Hero"

const mapQueriesToProps = ({ ownProps, state }) => {
  return {
    data: {
      query: gql`
        query getFeed($excludeChannels: [String]!, $limit: Int!, $skip: Int!){
          feed(excludeChannels: $excludeChannels, limit: $limit, skip: $skip, cache: false) {
            entryId: id
            title
            channelName
            collectionId
            status
            meta {
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
        // excludeChannels: state.topics.topics,
        excludeChannels: [],
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
    modal: {
      visible: state.modal.visible
    }
  };
};

@connect({ mapQueriesToProps, mapStateToProps })
// @ReactMixin.decorate(Pageable)
// @ReactMixin.decorate(Headerable)
export default class Home extends Component {

  componentWillMount() {
    this.props.dispatch(navActions.setLevel("TOP"));
    // this.headerAction({
    //   title: "NewSpring"
    // });
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
            {(() => {
              if (typeof item === "number") {
                return <FeedItemSkeleton />
              }
              return <FeedItem item={item}  />
            })()}
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
              background={photo}
              classes={["floating--bottom", "text-left", "background--dark-primary"]}
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
