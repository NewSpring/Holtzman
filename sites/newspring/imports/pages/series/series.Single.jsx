import { Component } from "react"
import ReactMixin from "react-mixin"
import { Likeable, Shareable } from "/imports/mixins"
import { connect } from "react-apollo";
import { VelocityComponent } from "velocity-react"
import gql from "graphql-tag";

// loading state
import { Loading } from "apollos/dist/core/components"
import { nav as navActions } from "apollos/dist/core/store"
import headerActions from "apollos/dist/core/store/header"
import { Headerable } from "apollos/dist/core/mixins"

import Helpers from "/imports/helpers"

import SeriesHero from "./series.Hero";
import SeriesVideoList from "./series.VideoList";

const mapQueriesToProps = ({ ownProps, state }) => {
  const pathParts = state.routing.location.pathname.split("/");
  return {
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
  };
};
@connect({ mapQueriesToProps })
@ReactMixin.decorate(Likeable)
@ReactMixin.decorate(Shareable)
@ReactMixin.decorate(Headerable)
export default class SeriesSingle extends Component {

  componentWillMount() {
    if (process.env.WEB) return;

    this.props.dispatch(navActions.setLevel("CONTENT"));
    this.props.dispatch(navActions.setAction("CONTENT", {
      id: 2,
      action: this.likeableAction
    }));
  }

  componentWillUpdate(nextProps) {
    const { content } = nextProps.series;
    if(!content) return;

    const color = Helpers.collections.color(content);
    this.props.dispatch(headerActions.set({
      title: "Series",
      color: color
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
          <SeriesVideoList id={this.props.params.id} />
        </div>
      </VelocityComponent>
    );
  }
};
