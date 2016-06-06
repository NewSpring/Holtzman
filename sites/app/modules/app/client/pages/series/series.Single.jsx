import { Component } from "react"
import ReactMixin from "react-mixin"
import { Likeable, Shareable, Headerable } from "app/client/mixins"
import { connect, gql } from "apollos/core/graphql/apollo";
import { VelocityComponent } from "velocity-react"

// loading state
import { Loading } from "apollos/core/components"
import { nav as navActions } from "apollos/core/store"
import headerActions from "app/client/reducers/header"

import Helpers from "app/client/helpers"

import SeriesHero from "./series.Hero";
import SeriesVideoList from "./series.VideoList";

import SeriesQuery from "./queries/single"

const mapQueriesToProps = ({ ownProps, state }) => {
  const pathParts = state.routing.location.pathname.split("/");
  return {
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
export default class SeriesSingle extends Component {

  componentWillMount() {
    this.props.dispatch(navActions.setLevel("CONTENT"))
    this.props.dispatch(navActions.setAction("CONTENT", {
      id: 2,
      action: this.likeableAction
    }));
  }

  hackBackgroundStyles() {
    return {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      zIndex: -1
    }
  }

  render() {
    const { content } = this.props.series;

    if (!content) {
      // loading
      return (
        <div className="locked-ends locked-sides floating">
          <div className="floating__item">
            <Loading/>
          </div>
        </div>
      )
    }

    const series = content;

    return (
      <VelocityComponent
        animation={"transition.fadeIn"}
        duration={1000}
        runOnMount={true}
      >
        <div className={`${Helpers.collections.classes(series)} background--light-primary`}>
          <div className={Helpers.collections.classes(series)} style={this.hackBackgroundStyles()}></div>
          <style>{Helpers.styles.overlay(series)}</style>
          <style>{Helpers.collections.backgroundStyles(series)}</style>
          <SeriesHero series={series} />
          <section className="text-light-primary hard-bottom">
            <div dangerouslySetInnerHTML={Helpers.react.markup(series, "description")}></div>
          </section>
          <SeriesVideoList params={this.props.params} />
        </div>
      </VelocityComponent>
    );

  }

};
