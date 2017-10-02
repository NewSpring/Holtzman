/* eslint-disable react/no-danger */
import { Component, PropTypes } from "react";
import ReactMixin from "react-mixin";
import { connect } from "react-redux";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import Meta from "../../components/shared/meta";

// loading state
import Loading from "../../components/@primitives/UI/loading";
import { nav as navActions } from "../../data/store";

import Headerable from "../../deprecated/mixins/mixins.Header";

import Split, { Left, Right } from "../../components/@primitives/layout/split";

import backgrounds from "../../util/backgrounds";
import react from "../../util/react";

import RelatedContent from "../../components/content/related-content";
import SingleVideoPlayer from "../../components/@primitives/players/video";

const defaultArray = [];

class EventSingleWithoutData extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    event: PropTypes.object.isRequired,
  }

  componentWillMount() {
    this.props.dispatch(navActions.setLevel("BASIC_CONTENT"));
    if (this.headerAction) {
      this.headerAction({ title: "NewSpring Now" });
    }
  }

  render() {
    const { content, live } = this.props.event;

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

    const event = content;
    const photo = backgrounds.image(event);

    return (
      <div>
        <Meta
          title={event.title}
          image={photo}
          id={event.id}
          meta={[
            { property: "og:type", content: "article" },
          ]}
        />
        <Split nav classes={["background--light-primary"]}>
          {(() => {
            if (event.content.ooyalaId.length === 0 && !live.live) {
              return (
                <Right
                  mobile
                  background={photo}
                  classes={["floating--bottom", "overlay--gradient@lap-and-up"]}
                  ratioClasses={["floating__item", "overlay__item", "one-whole", "soft@lap-and-up"]}
                  aspect="square"
                />
              );
            }
            // set the correct ooyala id based on live
            let ooyalaId = event.content.ooyalaId;
            if (live.live) { ooyalaId = live.embedCode; }
            return <SingleVideoPlayer id={ooyalaId} autoplay="false" />;
          })()}
        </Split>
        <Left scroll>
          <div className="one-whole">
            <section
              className={
                "soft@palm soft-double-sides@palm-wide-and-up soft@lap " +
                "soft-double@lap-wide-and-up push-top push-double-top@lap-and-up"
              }
            >
              <h2 className="capitalize">{event.title}</h2>
              <div dangerouslySetInnerHTML={react.markup(event)} />
            </section>
            <RelatedContent
              excludedIds={[event.id]}
              tags={event.content.tags || defaultArray}
            />
          </div>
        </Left>
      </div>
    );
  }
}

const GET_EVENT_QUERY = gql`
  query getContent($id: ID!) {
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
          ooyalaId
          tags
          images(sizes: ["large"]) {
            fileName
            fileType
            fileLabel
            url
          }
        }
      }
    }
    live {
      live
      embedCode
    }
  }
`;

const withEvent = graphql(GET_EVENT_QUERY, {
  name: "event",
  options: ownProps => ({
    variables: { id: ownProps.params.id },
  }),
});

export default connect()(
  withEvent(
    ReactMixin.decorate(Headerable)(
      EventSingleWithoutData,
    ),
  ),
);

export {
  EventSingleWithoutData,
  GET_EVENT_QUERY,
};
