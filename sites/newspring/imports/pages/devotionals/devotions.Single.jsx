import { Component } from "react"
import ReactMixin from "react-mixin"
import { connect } from "react-apollo";
import { Likeable, Shareable } from "/imports/mixins"
import Hammer from "react-hammerjs";
import { VelocityComponent } from "velocity-react"
import gql from "graphql-tag";

import Helpers from "/imports/helpers"

import { Loading } from "apollos/dist/core/components"

import { nav as navActions } from "apollos/dist/core/store"
import headerActions from "apollos/dist/core/store/header"
import liveActions from "apollos/dist/core/store/live"

// can we use the core toggle here? Is it ready @jbaxleyiii?
import DevotionsSingleContent from "./devotions.SingleContent"
import DevotionsSingleScripture from "./devotions.SingleScripture"

// TODO: integrate this with ../apollos core toggle
import SwipeViews from "react-swipe-views"

const mapQueriesToProps = ({ ownProps, state }) => {
  const pathParts = state.routing.location.pathname.split("/");
  return {
    devotion: {
      query: gql`
        query getDevotional($id: ID!) {
          content: node(id: $id) {
            id
            ... on Content {
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
        }
      `,
      variables: { id: ownProps.params.id },
      forceFetch: false,
      returnPartialData: false,
    },
    live: {
      query: gql`query IsLive {
        live {
          live
          streamUrl
        }
      }`,
      forceFetch: false,
      returnPartialData: false,
      pollInterval: 60000,
    },
  };
};

const mapStateToProps = (state) => ({ modal: { visible: state.modal.visible }});

@connect({ mapQueriesToProps, mapStateToProps })
@ReactMixin.decorate(Likeable)
@ReactMixin.decorate(Shareable)
export default class SeriesSingle extends Component {

  state = { selectedIndex: 0 }

  onClickLink = (event) => {
    event.preventDefault();
    this.setState({
      selectedIndex: 1,
      livePush: false,
    });
  }

  componentWillMount() {
    if (process.env.WEB) return;

    this.handleLiveBar();

    this.props.dispatch(navActions.setLevel("CONTENT"));
    this.props.dispatch(navActions.setAction("CONTENT", {
      id: 2,
      action: this.likeableAction
    }));

    this.props.dispatch(headerActions.hide());
  }

  componentWillUnmount() {
    this.props.dispatch(liveActions.unfloat());
  }

  // hide the live bar and then bring it back
  // after the view has faded in. this prevents
  // an issue with the z-index and the arrow
  // from the header.
  //
  // also, apply float styles to the bar so it
  // will display below the fixed header
  handleLiveBar = () => {
    // XXX
    // handle case when there's no scripture
    // if (!this.props.live.live) return;
    if (!true) return;
    this.props.dispatch(liveActions.hide());
    this.props.dispatch(liveActions.float());
    setTimeout(() => {
      this.setState({
        livePush: true,
      });
      this.props.dispatch(liveActions.show());
    }, 1000);
  }

  getLiveClasses = () => {
    const classes = [];
    // XXX
    // if (this.props.live.live && this.state.livePush) {
    if (true && this.state.livePush) {
      classes.push("push-double-top");
    }

    return classes;
  }

  renderContent = (devotion) => {

    if (!devotion.content.scripture) {
      return (
        <div title="Devotional">
          <DevotionsSingleContent
            devotion={devotion}
            onClickLink={this.onClickLink}
            classes={this.getLiveClasses()}
          />
        </div>
      );
    }

    return (
      <SwipeViews
        selectedIndex={this.state.selectedIndex}
        disableSwipe={true}
      >

        <div title="Devotional">
          <DevotionsSingleContent
            devotion={devotion}
            onClickLink={this.onClickLink}
            classes={this.getLiveClasses()}
          />
        </div>

        <div title="Scripture">
          <DevotionsSingleScripture
            devotion={devotion}
            classes={this.getLiveClasses()}
          />
        </div>
      </SwipeViews>
    );
  }

  render() {

    const { content } = this.props.devotion;
    if (!content) {
      return (
        <div className="locked-ends locked-sides floating">
          <div className="floating__item">
            <Loading/>
          </div>
        </div>
      );
    }

    const devotion = content;

    return (
        <VelocityComponent
          animation={"transition.fadeIn"}
          duration={1000}
          runOnMount={true}
          display={"flex"}
        >
          {this.renderContent(devotion)}
        </VelocityComponent>
    )

  }

};
