/* eslint-disable react/no-danger */
import { Component, PropTypes } from "react";
import ReactMixin from "react-mixin";
import { connect } from "react-redux";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import Meta from "../../components/meta";

// loading state
import Loading from "../../components/loading";
import { nav as navActions } from "../../store";
import headerActions from "../../store/header";

import Headerable from "../../mixins/mixins.Header";
import Likeable from "../../mixins/mixins.Likeable";
import Shareable from "../../mixins/mixins.Shareable";


import RelatedContent from "../../blocks/content/RelatedContent";

import collections from "../../util/collections";
import styles from "../../util/styles";
import react from "../../util/react";

import SeriesHero from "./series.Hero";
import SeriesVideoList from "./series.VideoList";

const SERIES_SINGLE_QUERY = gql`
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
          tags
          isLight
          images(sizes: ["large"]) {
            fileName
            fileType
            fileLabel
            url
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
`;

const withSingleSeries = graphql(SERIES_SINGLE_QUERY, {
  name: "series",
  options: ownProps => ({
    variables: { id: ownProps.params.id },
  }),
});

@connect()
@withSingleSeries
@ReactMixin.decorate(Likeable)
@ReactMixin.decorate(Shareable)
@ReactMixin.decorate(Headerable)
export default class SeriesSingle extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    series: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
  }

  componentWillMount() {
    if (process.env.WEB) return;

    // needed for cached data
    this.handleHeaderStyle(this.props);

    this.props.dispatch(navActions.setLevel("CONTENT"));
    this.props.dispatch(navActions.setAction("CONTENT", {
      id: 2,
      action: this.likeableAction,
    }));
  }

  componentWillUpdate(nextProps) {
    this.handleHeaderStyle(nextProps);
  }

  handleHeaderStyle = (nextProps) => {
    const content = nextProps.series.content;
    if (!content) return;
    const { isLight } = nextProps.series.content.content;
    const color = collections.color(content);
    this.props.dispatch(headerActions.set({
      title: "Series",
      color,
      light: !isLight,
    }));
  }

  hackBackgroundStyles() {
    return {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      zIndex: -1,
    };
  }

  render() {
    const { content } = this.props.series;

    if (!content) {
      // loading
      return (
        <div className="locked-ends locked-sides floating">
          <div className="floating__item">
            <Loading />
          </div>
        </div>
      );
    }

    const series = content;
    return (
      <div>
        <Meta
          title={series.title}
          description={series.content.description}
          image={
            series.content.images && series.content.images.length > 0
              ? series.content.images[0].url
              : null
          }
          id={series.id}
        />
        <div className={`${collections.classes(series)} background--light-primary`}>
          <div className={collections.classes(series)} style={this.hackBackgroundStyles()} />
          <style>{styles.overlay(series)}</style>
          <style>{collections.backgroundStyles(series)}</style>
          <SeriesHero series={series} />
          <section className={`${series.content.isLight ? "text-dark-primary" : "text-light-primary"} hard-bottom soft-double-sides@palm-wide`}>
            <div dangerouslySetInnerHTML={react.markup(series, "description")} />
          </section>
          <SeriesVideoList id={this.props.params.id} />
        </div>
        <RelatedContent excludedIds={[series.id]} tags={series.content.tags} />
      </div>

    );
  }
}
