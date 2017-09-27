/* eslint-disable react/no-danger */
import PropTypes from 'prop-types';

import { Component } from "react";
import ReactMixin from "react-mixin";
import { graphql } from "react-apollo";
import { connect } from "react-redux";
import gql from "graphql-tag";

import Loading from "../../components/@primitives/UI/loading";
import {
  audio as audioActions,
  header as headerActions,
} from "../../data/store";

import Headerable from "../../deprecated/mixins/mixins.Header";
import canLike from "../../components/@enhancers/likes/toggle";
import Shareable from "../../deprecated/mixins/mixins.Shareable";

import time from "../../util/time";
import react from "../../util/react";
import contentHelpers from "../../util/content";
import collections from "../../util/collections";

import SingleVideoPlayer from "../../components/@primitives/players/video/Player";
import SeriesVideoList from "./VideoList";

class SeriesSingleVideoWithoutData extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    live: PropTypes.object.isRequired,
    currentSermon: PropTypes.object.isRequired,
    series: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
  }

  componentWillMount() {
    if (process.env.WEB) return;

    // needed for client cache
    this.handleHeader(this.props);
  }

  componentWillUpdate(nextProps) {
    this.handleHeader(nextProps);
  }

  handleHeader = nextProps => {
    const content = nextProps.series.content;
    if (!content) return;

    const { isLight } = nextProps.series.content.content;
    const color = collections.color(content);

    const { live } = this.props.live;

    const options = {
      title: "Series",
      color,
      light: !isLight,
    };

    if (!live) options.subTitle = content.title;

    this.props.dispatch(headerActions.set(options));
  }

  playAudio = e => {
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
        {currentSermon.content.audio.length > 0 && (
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
        )}
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

const CURRENT_SERMON_QUERY = gql`
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
`;
const withCurrentSermon = graphql(CURRENT_SERMON_QUERY, {
  name: "currentSermon",
  options: ownProps => ({
    variables: { sermonId: ownProps.params.sermonId },
  }),
});

const SERIES_QUERY = gql`
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
`;
const withSeries = graphql(SERIES_QUERY, {
  name: "series",
  options: ownProps => ({
    variables: { id: ownProps.params.id },
  }),
});

const mapStateToProps = state => ({ live: state.live });

export default connect(mapStateToProps)(
  withCurrentSermon(
    withSeries(
      ReactMixin.decorate(Shareable)(
        ReactMixin.decorate(Headerable)(
          canLike(
            props => (props.currentSermon.loading ? null : props.currentSermon.content.entryId),
          )(SeriesSingleVideoWithoutData),
        ),
      ),
    ),
  ),
);

export {
  SeriesSingleVideoWithoutData,
  CURRENT_SERMON_QUERY,
  SERIES_QUERY,
};
