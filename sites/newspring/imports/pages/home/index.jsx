import { Component } from "react"
import ReactMixin from "react-mixin"
import { connect } from "react-apollo";
import gql from "graphql-tag";
import { Link } from "react-router";
import ApollosPullToRefresh from "apollos-core/dist/core/components/pullToRefresh";

import Loading from "apollos-core/dist/core/components/loading"
import { FeedItemSkeleton } from "apollos-core/dist/core/components/loading"
import Split, { Left, Right } from "apollos-core/dist/core/blocks/split"
import { nav as navActions } from "apollos-core/dist/core/store"
import { Headerable } from "apollos-core/dist/core/mixins"

import Helpers from "/imports/helpers";
import { Pageable } from "/imports/mixins"
import { FeedItem } from "/imports/components/cards"

import HomeHero from "./home.Hero"

const mapQueriesToProps = ({ ownProps, state }) => ({
  data: {
    query: gql`
      fragment ContentForFeed on Content {
        entryId: id
        title
        channelName
        status
        meta {
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
          colors {
            id
            value
            description
          }
        }
      }

      query getFeed($excludeChannels: [String]!, $limit: Int!, $skip: Int!, $cache: Boolean!) {
        feed(excludeChannels: $excludeChannels, limit: $limit, skip: $skip, cache: $cache) {
          ...ContentForFeed
          parent {
            ...ContentForFeed
          }
        }
      }
    `,
    variables: {
      excludeChannels: state.topics.topics,
      limit: state.paging.pageSize * state.paging.page,
      skip: state.paging.skip,
      cache: true,
    },
    forceFetch: false,
    returnPartialData: false,
  },
});

const mapStateToProps = (state) => ({
    paging: state.paging,
    topics: state.topics.topics,
    modal: { visible: state.modal.visible },
});

@connect({ mapQueriesToProps, mapStateToProps })
@ReactMixin.decorate(Pageable)
@ReactMixin.decorate(Headerable)
export default class Home extends Component {

  componentWillMount() {
    this.props.dispatch(navActions.setLevel("TOP"));
    this.headerAction({
      title: "default"
    });
  }

  handleRefresh = (resolve, reject) => {
    const { topics, paging } = this.props;
    let refetchVariables = {
      excludeChannels: topics,
      limit: paging.pageSize * paging.page,
      skip: paging.skip,
      cache: false,
    };

    this.props.data.refetch(refetchVariables)
      .then(resolve)
      .catch(reject);
  }

  renderFeed = () => {

    const { feed } = this.props.data;

    let feedItems = [1, 2, 3, 4, 5]
    if (feed) {
      feedItems = feed.slice(1);
    }
    return (
      feedItems.map((item, i) => (
        <div className="grid__item one-half@palm-wide-and-up flush-bottom@palm push-half-bottom@palm-wide push-bottom@portable push-bottom@anchored" key={i}>
          {(() => {
            if (typeof item === "number") return <FeedItemSkeleton />
            return <FeedItem item={item}  />
          })()}
        </div>
      ))

    )
  }

  render() {

    const { feed } = this.props.data;

    let photo, heroItem, heroLink;
    if (feed) {
      heroItem = feed[0];
      heroLink = Helpers.content.links(heroItem);
      if (heroItem.channelName === "sermons") {
        photo = Helpers.backgrounds.image(heroItem.parent)
      } else {
        photo = Helpers.backgrounds.image(heroItem)
      }

    }
    return (
        <ApollosPullToRefresh handleRefresh={this.handleRefresh}>
          <Split nav={true} classes={["background--light-primary"]}>
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
          </Split>
          <Left scroll={true} ref="container">
            <section className="background--light-secondary soft-half@palm soft@palm-wide-and-up soft-double@anchored">
              <div className="grid">
                {this.renderFeed()}
              </div>
            </section>
          </Left>
        </ApollosPullToRefresh>
    )
  }

}
