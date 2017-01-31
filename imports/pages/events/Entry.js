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

import SingleVideoPlayer from "../../components/@primitives/players/video/Player";

// const IEntryWithoutData = {
//   event: Object,
// };

class EntryWithoutData extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    event: PropTypes.object.isRequired,
  }

  componentWillMount() {
    this.props.dispatch(navActions.setLevel("CONTENT"));
    if (this.headerAction) {
      this.headerAction({ title: "NewSpring Now" });
    }
  }

  render() {
    const { content, live } = this.props.event;

    if (this.props.event.loading) return <Loading />;

    const photo = backgrounds.image(content);

    return (
      <div>
        <Meta
          title={content.title}
          image={photo}
          id={content.id}
          meta={[
            { property: "og:type", content: "article" },
          ]}
        />
        <Split nav classes={["background--light-primary"]}>
          {(() => {
            if (content.content.ooyalaId.length === 0 && !live.live) {
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
            // set autoplay to false if we are live
            // #no videos in service
            let ooyalaId = content.content.ooyalaId;
            if (live.live) {
              ooyalaId = live.ooyalaId;
            }
            return <SingleVideoPlayer ooyalaId={ooyalaId} autoPlay="false" />;
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
              <h2 className="capitalize">{content.title}</h2>
              <div dangerouslySetInnerHTML={react.markup(content)} />
            </section>
          </div>
        </Left>
      </div>
    );
  }
}

const EVENT_QUERY = gql`
  query getContent($id: ID!) {
    content: node(id: $id) {
      id
      ... on Content {
        title
        status
        channelName
        meta {
          date
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

const withEvent = graphql(EVENT_QUERY, {
  name: "event",
  options: (ownProps) => ({
    variables: { id: ownProps.params.id },
  }),
});

export default connect()(
  withEvent(
    ReactMixin.decorate(Headerable)(
      EntryWithoutData
    )
  )
);

export {
  EntryWithoutData as Entry,
};
