import { Component, PropTypes } from "react";
import ReactMixin from "react-mixin";
import { connect } from "react-apollo";
import gql from "graphql-tag";

import Loading from "../../components/loading";
import {
  nav as navActions,
  audio as audioActions,
  header as headerActions,
} from "../../store";

import Headerable from "../../mixins/mixins.Header";
import Likeable from "../../mixins/mixins.Likeable";
import Shareable from "../../mixins/mixins.Shareable";

import time from "../../util/time";
import react from "../../util/react";
import contentHelpers from "../../util/content";
import collections from "../../util/collections";

import SingleVideoPlayer from "../../components/players/video/Player";
import SeriesVideoList from "./series.VideoList";

const mapQueriesToProps = ({ ownProps }) => ({
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
              audio {
                duration
                file: s3
              }
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
              images(sizes: ["large", "medium", "small"]) {
                fileName
                fileType
                fileLabel
                url
                size
              }
              ooyalaId
              colors {
                id
                value
                description
              }
              isLight
            }
          }
        }
      }
    `,
    variables: { id: ownProps.params.id },
    forceFetch: false,
    returnPartialData: false,
  },
});

const mapStateToProps = state => ({ live: state.live });

@connect({ mapQueriesToProps, mapStateToProps })
@ReactMixin.decorate(Likeable)
@ReactMixin.decorate(Shareable)
@ReactMixin.decorate(Headerable)
export default class SeriesSingleVideo extends Component {

  static propTypes = {
    dispatch: PropTypes.function.isRequired,
    live: {
      live: PropTypes.boolean.isRequired,
    },
    currentSermon: {
      content: PropTypes.object.isRequired,
    },
    series: {
      content: PropTypes.object.isRequired,
    },
    params: {
      id: PropTypes.string.isRequired,
    },
  }

  componentWillMount() {
    if (process.env.WEB) return;

    // needed for client cache
    this.handleHeader(this.props);

    this.props.dispatch(navActions.setLevel("CONTENT"));
    this.props.dispatch(navActions.setAction("CONTENT", {
      id: 2,
      action: this.likeableAction,
    }));
  }

  componentWillUpdate(nextProps) {
    this.handleHeader(nextProps);
  }

  handleHeader = (nextProps) => {
    const content = nextProps.series.content;
    if(!content) return;

    const { isLight } = nextProps.series.content.content;
    const color = collections.color(content);

    const { live } = this.props.live;

    const options = {
      title: "Series",
      color: color,
      light: !isLight,
    };

    if (!live) options.subTitle = content.title;

    this.props.dispatch(headerActions.set(options));
  }

  playAudio = (e) => {
    e.preventDefault();
    const currentSermon = this.props.currentSermon.content;
    const series = this.props.series.content;
    this.props.dispatch(audioActions.setPlaying({
      track: {
        ...currentSermon.content.audio[0],
        title: currentSermon.title,
        artist: contentHelpers.speakers(currentSermon),
      },
      album: series,
    }));
  }

  render() {
    const sermonContent = this.props.currentSermon.content;
    const seriesContent = this.props.series.content;

    if (!(sermonContent && seriesContent)) {
      // loading
      return (
        <div className="locked-ends locked-sides floating">
          <div className="floating__item">
            <Loading />
          </div>
        </div>
      );
    }

    const currentSermon = sermonContent;

    return (
      <div className="background--light-primary">
        <SingleVideoPlayer ooyalaId={currentSermon.content.ooyalaId} />
        <div
          className="soft-sides background--light-secondary text-dark-secondary"
          style={{ paddingTop: "15px", paddingBottom: "15px" }}
          onClick={this.playAudio}
        >
          <h7 style={{ verticalAlign: "middle" }}>Listen To Audio</h7>
          <i
            className="icon-category-audio float-right"
            style={{ marginTop: "-2px" }}
          />
        </div>
        <div className="soft soft-double@palm-wide-and-up push-top">
          <h2 className="push-half-bottom">{currentSermon.title}</h2>
          <h4>{contentHelpers.speakers(currentSermon)}</h4>
          <h6 className="text-dark-tertiary">{time.date(currentSermon)}</h6>
          <div dangerouslySetInnerHTML={react.markup(currentSermon, "description")} />
        </div>
        <SeriesVideoList id={this.props.params.id} />
      </div>
    );
  }
}
