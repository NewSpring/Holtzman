import { Component, PropTypes } from "react"
import ReactMixin from "react-mixin"
import { Likeable, Shareable, Headerable } from "app/client/mixins"
import { connect, gql } from "apollos/core/graphql/apollo";
import { VelocityComponent } from "velocity-react"

import { Loading } from "apollos/core/components"
import { nav as navActions } from "apollos/core/store"

import Helpers from "app/client/helpers"

import SingleVideoPlayer from "./series.SingleVideoPlayer"
import SeriesVideoList from "./series.VideoList"

import SermonQuery from "./queries/sermon"
import SeriesQuery from "./queries/single"

const mapQueriesToProps = ({ ownProps, state }) => {
  const pathParts = state.routing.location.pathname.split("/");
  return {
    currentSermon: {
      query: gql`${SermonQuery}`,
      variables: {
        sermonId: Number(pathParts[4]),
      },
      forceFetch: false,
      returnPartialData: false,
    },
    series: {
      query: gql`${SeriesQuery}`,
      variables: {
        entryId: Number(pathParts[2]),
      },
      forceFetch: false,
      returnPartialData: false,
    },
  };
};
@connect({ mapQueriesToProps })
@ReactMixin.decorate(Likeable)
@ReactMixin.decorate(Shareable)
@ReactMixin.decorate(Headerable)
export default class SeriesSingleVideo extends Component {

  componentWillMount() {
    this.props.dispatch(navActions.setLevel("CONTENT"))
    this.props.dispatch(navActions.setAction("CONTENT", {
      id: 2,
      action: this.likeableAction
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
            <h1>{currentSermon.title}</h1>
            <h4>{Helpers.content.speakers(currentSermon)}</h4>
            <h6 className="text-dark-tertiary">{Helpers.time.date(currentSermon)}</h6>
            <div dangerouslySetInnerHTML={Helpers.react.markup(currentSermon, "description")}></div>
          </div>
          <SeriesVideoList params={this.props.params} />
        </div>
      </VelocityComponent>
    );

  }

}
