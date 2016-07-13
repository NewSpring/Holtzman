import { Component, PropTypes } from "react"
import ReactMixin from "react-mixin"
import { Likeable, Shareable } from "/imports/mixins"
import { connect } from "react-apollo";
import { VelocityComponent } from "velocity-react"
import gql from "graphql-tag";

import Loading from "apollos/dist/core/components/loading"
import { nav as navActions } from "apollos/dist/core/store"
import { Headerable } from "apollos/dist/core/mixins"
import headerActions from "apollos/dist/core/store/header"

import Helpers from "/imports/helpers"

import SingleVideoPlayer from "./series.SingleVideoPlayer"
import SeriesVideoList from "./series.VideoList"

const mapQueriesToProps = ({ ownProps, state }) => ({
  currentSermon: {
    query: gql`
      query getSermon($sermonId: ID!) {
        content: node(id: $sermonId) {
          ... on Content {
            entryId: id
            title
            status
            channelName
            meta {
              urlTitle
              siteId
              date
              actualDate
              channelId
            }
            content {
              description
              speaker
              ooyalaId
            }
          }
        }
      }
    `,
    variables: { sermonId: ownProps.params.sermonId },
    forceFetch: false,
    returnPartialData: false,
  },
  series: {
    query: gql`
      query getSeriesSingle($id: ID!) {
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
              description
              images {
                fileName
                fileType
                fileLabel
                s3
                cloudfront
              }
              ooyalaId
              colors {
                id
                value
                description
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
  // live: {
  //   query: gql`query IsLive {
  //     live {
  //       live
  //       embedCode
  //     }
  //   }`,
  //   forceFetch: false,
  //   returnPartialData: false,
  // },
});
@connect({ mapQueriesToProps })
@ReactMixin.decorate(Likeable)
@ReactMixin.decorate(Shareable)
@ReactMixin.decorate(Headerable)
export default class SeriesSingleVideo extends Component {

  componentWillMount() {
    if (process.env.WEB) return;
    this.props.dispatch(navActions.setLevel("CONTENT"))
    this.props.dispatch(navActions.setAction("CONTENT", {
      id: 2,
      action: this.likeableAction
    }));
  }

  componentWillUpdate(nextProps){
    const { content } = nextProps.series;
    if(!content) return;

    const color = Helpers.collections.color(content);

    // const { live } = this.props.live;
    const live = true;

    const options = {
      title: "Series",
      color: color,
    };

    if (!live) options.subTitle = content.title;

    this.props.dispatch(headerActions.set(options));

  }

  render() {

    const sermonContent = this.props.currentSermon.content;
    const seriesContent = this.props.series.content;

    if (!(sermonContent && seriesContent)) {
      // loading
      return (
        <div className="locked-ends locked-sides floating">
          <div className="floating__item">
            <Loading/>
          </div>
        </div>
      )
    }

    const currentSermon = sermonContent;
    const series = seriesContent;

    return (
      <VelocityComponent
        animation={"transition.fadeIn"}
        duration={1000}
        runOnMount={true}
      >
        <div className="background--light-primary">
          <SingleVideoPlayer sermon={currentSermon} series={series} />
          <div className="soft push-top">
            <h2 className="push-half-bottom">{currentSermon.title}</h2>
            <h4>{Helpers.content.speakers(currentSermon)}</h4>
            <h6 className="text-dark-tertiary">{Helpers.time.date(currentSermon)}</h6>
            <div dangerouslySetInnerHTML={Helpers.react.markup(currentSermon, "description")}></div>
          </div>
          <SeriesVideoList id={this.props.params.id} />
        </div>
      </VelocityComponent>
    );
  }
}
